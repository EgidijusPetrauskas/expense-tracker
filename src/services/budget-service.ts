/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

import { ExpenseCategory, Expense, CalculatedExpense } from '../types';

import { getLocalStorage } from '../helpers/local-storage-helper';

type GetCategoriesType = () => Promise<ExpenseCategory[]>;
type GetExpensesType = (categoryId: string) => Promise<Expense[]>;
type CreateExpenseType = (expenseData: Omit<Expense, 'id'>) => Promise<Expense>;
type RemoveExpenseType = (id: string) => Promise<Expense>;
type ClearAllExpensesType = () => Promise<string>;
type GetCalcExpenses = () => Promise<CalculatedExpense[]>;

const API_SERVER = process.env.REACT_APP_API_SERVER;
const { REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE } = process.env;

namespace BudgetService {
  export const getCategories: GetCategoriesType = async () => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.get<{ categories: ExpenseCategory[] }>(
      `${API_SERVER}/api/categories`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const { categories } = data;

    return categories;
  };

  export const getExpenses: GetExpensesType = async (categoryId) => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.get<{ user_expenses: Expense[] }>(
      `${API_SERVER}/api/expenses`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const { user_expenses: userExpenses } = data;

    if (categoryId === 'all') {
      return userExpenses;
    }
    const fillteredExpenses = userExpenses.filter((expense) => expense.category[0] === categoryId);
    return fillteredExpenses;
  };

  export const createExpense: CreateExpenseType = async (expenseData) => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.post<{ expense: Expense }>(
      `${API_SERVER}/api/expenses`,
      expenseData,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const { expense } = data;

    return expense;
  };

  export const removeExpense: RemoveExpenseType = async (id) => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.delete<{ deleted_expense: Expense }>(
      `${API_SERVER}/api/expenses/${id}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const deletedExpense = data.deleted_expense;

    return deletedExpense;
  };

  export const clearAllExpenses: ClearAllExpensesType = async () => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.patch<{ message: string }>(
      `${API_SERVER}/api/expenses/clear-all`,
      null,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const { message } = data;

    return message;
  };

  export const getCalcExpenses: GetCalcExpenses = async () => {
    const token = getLocalStorage<string>(REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE);
    if (token === null) {
      throw new Error('You have to log in!');
    }

    const { data } = await axios.get<{ user_expenses: Expense[] }>(
      `${API_SERVER}/api/expenses`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { user_expenses: userExpenses } = data;
    const calculatedExpenses: CalculatedExpense[] = [];

    userExpenses
      .map((expense) => [expense.category[0], expense.price] as [string, number])
      .forEach(([cat, price]) => {
        if (calculatedExpenses.find((exp) => exp.name === cat)) {
          const indexOfCalcExpense = calculatedExpenses.map((x) => x.name).indexOf(cat);
          calculatedExpenses[indexOfCalcExpense].value += price;
          return;
        }
        calculatedExpenses.push({ name: cat, value: price });
      });

    const categories = await getCategories();
    const filteredUserExpenses = calculatedExpenses
      .map((expense) => {
        const categoryName = categories.find((cat) => cat.id === expense.name)?.title;
        if (categoryName === undefined) throw new Error('Data is incorrect');
        return { name: categoryName, value: expense.value };
      });

    return filteredUserExpenses;
  };
}

export default BudgetService;
