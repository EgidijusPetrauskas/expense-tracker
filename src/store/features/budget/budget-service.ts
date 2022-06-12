/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { ExpenseCategory, Expense, User } from '../../../types';
import { getLocalStorage } from '../../../helpers/local-storage-helper';

const API_SERVER = process.env.REACT_APP_API_SERVER;
const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

type GetCategoriesType = () => Promise<ExpenseCategory[]>;
type GetExpensesType = (categoryId: string) => Promise<Expense[]>;
type CreateExpenseType = (expenseData: Expense) => Promise<Expense>;
type RemoveExpenseType = (id: string) => Promise<string>;
type ClearAllExpensesType = () => Promise<void>;

namespace BudgetService {
  export const getCategories: GetCategoriesType = async () => {
    const { data } = await axios.get<ExpenseCategory[]>(
      `${API_SERVER}/expense_categories`,
    );

    return data;
  };

  export const getExpenses: GetExpensesType = async (categoryId) => {
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);
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
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);
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
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);
    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data: deletedExpense } = await axios.delete(`${API_SERVER}/expenses/${id}`);
    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { expenses: data.user_expenses.filter((expense) => expense !== deletedExpense.id) },
    );
    return deletedExpense.id;
  };

  export const clearAllExpenses: ClearAllExpensesType = async () => {
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);
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
}

export default BudgetService;
