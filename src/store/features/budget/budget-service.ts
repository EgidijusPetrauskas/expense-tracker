/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { ExpenseCategory, Expense, User } from '../../../types';
import { getLocalStorage } from '../../../helpers/local-storage-helper';
import { CalculatedExpense } from '../../../types/calculated-expense';

const API_SERVER = process.env.REACT_APP_API_SERVER;
const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

type GetCategoriesType = () => Promise<ExpenseCategory[]>;
type GetExpensesType = (categoryId: string) => Promise<Expense[]>;
type CreateExpenseType = (expenseData: Expense) => Promise<Expense>;
type RemoveExpenseType = (id: string) => Promise<string>;
type ClearAllExpensesType = () => Promise<void>;
type GetCalcExpenses = () => Promise<CalculatedExpense[]>;

namespace BudgetService {
  export const getCategories: GetCategoriesType = async () => {
    const { data } = await axios.get<ExpenseCategory[]>(
      `${API_SERVER}/expense_categories`,
    );

    return data;
  };

  export const getExpenses: GetExpensesType = async (categoryId) => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data: currentUser } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);
    const expenseIds = currentUser.user_expenses;
    const { data: allExpenses } = await axios.get<Expense[]>(`${API_SERVER}/expenses`);
    const userExpenses = allExpenses.filter(({ id }) => expenseIds.includes(id));

    if (categoryId === 'all') {
      return userExpenses;
    }
    const filteredExpenses = userExpenses.filter((expense) => expense.category === categoryId);
    return filteredExpenses;
  };

  export const createExpense: CreateExpenseType = async (expenseData) => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data: newExpense } = await axios.post<Expense>(`${API_SERVER}/expenses`, expenseData);
    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { user_expenses: [newExpense.id, ...data.user_expenses] },
    );
    return newExpense;
  };

  export const removeExpense: RemoveExpenseType = async (id) => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    await axios.delete(`${API_SERVER}/expenses/${id}`);
    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { user_expenses: data.user_expenses.filter((expense) => expense !== id) },
    );
    return id;
  };

  export const clearAllExpenses: ClearAllExpensesType = async () => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data: currentUser } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);
    const expenseIds = currentUser.user_expenses;

    expenseIds.forEach(async (id) => axios.delete(`${API_SERVER}/expenses/${id}`));

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { user_expenses: [] },
    );
  };

  export const getCalcExpenses: GetCalcExpenses = async () => {
    const user: User | null = getLocalStorage('user');
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data: currentUser } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);
    const expenseIds = currentUser.user_expenses;
    const { data: allExpenses } = await axios.get<Expense[]>(`${API_SERVER}/expenses`);
    const userExpenses = allExpenses.filter(({ id }) => expenseIds.includes(id));

    const calculatedExpenses: CalculatedExpense[] = [];

    userExpenses
      .map((expense) => [expense.category, expense.price] as [string, number])
      .forEach(([cat, price]) => {
        if (calculatedExpenses.find((exp) => exp.name === cat)) {
          const indexOfCalcExpense = calculatedExpenses.map((x) => x.name).indexOf(cat);
          calculatedExpenses[indexOfCalcExpense].value += price;
          return;
        }
        calculatedExpenses.push({ name: cat, value: price });
      });

    const categories = await getCategories();

    const filteredUserExpenses = calculatedExpenses.map((expense) => {
      const categoryName = categories.find((cat) => cat.id === expense.name)?.title;
      if (categoryName === undefined) throw new Error('Data is incorrect');
      return { name: categoryName, value: expense.value };
    });

    return filteredUserExpenses;
  };
}

export default BudgetService;
