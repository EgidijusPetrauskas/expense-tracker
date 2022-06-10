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

    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);

    if (categoryId === 'all') {
      return data.expenses;
    }
    const filteredExpenses = data.expenses.filter((expense) => expense.category === categoryId);
    return filteredExpenses;
  };

  export const createExpense: CreateExpenseType = async (expenseData) => {
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);

    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { expenses: [expenseData, ...data.expenses] },
    );

    return expenseData;
  };

  export const removeExpense: RemoveExpenseType = async (id) => {
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);

    if (!user) {
      throw new Error('You have to Sign in!');
    }

    const { data } = await axios.get<User>(`${API_SERVER}/users/${user.id}`);

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { expenses: data.expenses.filter((expense) => expense.id !== id) },
    );

    return id;
  };

  export const clearAllExpenses: ClearAllExpensesType = async () => {
    const user: User | null = getLocalStorage(USER_KEY_IN_LOCAL_STORAGE);

    if (!user) {
      throw new Error('You have to Sign in!');
    }

    await axios.patch(
      `${API_SERVER}/users/${user.id}`,
      { expenses: [] },
    );
  };
}

export default BudgetService;
