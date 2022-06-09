import { Dispatch } from 'redux';

import { Expense } from '../../../types/expense';
import {
  BudgetSetCategoriesAction,
  BudgetSetCurrentCategoryAction,
  BudgetActions,
  BudgetSetFormOpenAction,
  BudgetSetExpenseAction,
  BudgetDeleteExpenseAction,
  BudgetSetErrorAction,
  BudgetSetIsSetAction,
  BudgetClearExpensesAction,
  BudgetActionType,
  BudgetSetLoadingAction,
  BudgetClearErrorAction,
} from './types';
import { ExpenseCategory } from '../../../types/expense-category';
import BudgetService from './budget-service';

export const budgetClearErrorAction: BudgetClearErrorAction = {
  type: BudgetActionType.BUDGET_CLEAR_ERROR,
};

export const budgetSetIsSetAction: BudgetSetIsSetAction = {
  type: BudgetActionType.BUDGET_SET_IS_SET,
};

export const budgetClearExpensesAction: BudgetClearExpensesAction = {
  type: BudgetActionType.BUDGET_CLEAR_EXPENSES,
};

export const createBudgetSetLoadingAction = (response: boolean): BudgetSetLoadingAction => ({
  type: BudgetActionType.BUDGET_SET_LOADING,
  payload: response,
});

export const createBudgetSetFormOpenAction = (response: boolean): BudgetSetFormOpenAction => ({
  type: BudgetActionType.BUDGET_SET_FORM_OPEN,
  payload: response,
});

export const createBudgetSetExpenseAcion = (expenseData: Expense): BudgetSetExpenseAction => ({
  type: BudgetActionType.BUDGET_SET_EXPENSE,
  payload: expenseData,
});

export const createBudgetSetCategoryAcion = (category: string): BudgetSetCurrentCategoryAction => ({
  type: BudgetActionType.BUDGET_SET_CURRENT_CATEGORY,
  payload: {
    category,
  },
});

export const createDeleteExpenseAction = (id: Expense['id']): BudgetDeleteExpenseAction => ({
  type: BudgetActionType.BUDGET_DELETE_EXPENSE,
  payload: {
    id,
  },
});

export const createBudgetSetErrorAction = (error: string): BudgetSetErrorAction => ({
  type: BudgetActionType.BUDGET_SET_ERROR,
  payload: { error },
});

export const createBudgetSetCategoriesAction = (categories: ExpenseCategory[]): BudgetSetCategoriesAction => ({
  type: BudgetActionType.BUDGET_SET_CATEGORIES,
  payload: {
    categories,
  },
});

export const createClearAllExpensesAction = () => async (dispatch: Dispatch<BudgetActions>) => {
  dispatch(createBudgetSetLoadingAction(true));
  try {
    await BudgetService.clearAllExpenses();
    dispatch(budgetClearExpensesAction);
    dispatch(budgetSetIsSetAction);
    dispatch(createBudgetSetLoadingAction(false));
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const budgetSetErrorAction = createBudgetSetErrorAction(errMsg);
    dispatch(budgetSetErrorAction);
    setTimeout(() => {
      dispatch(budgetClearErrorAction);
    }, 1700);
  }
};

export const createSetBudgetExpenses = (categoryId: string) => async (dispatch: Dispatch<BudgetActions>) => {
  try {
    dispatch(budgetClearExpensesAction);
    const expenses = await BudgetService.getExpenses(categoryId);
    expenses.forEach((expense) => {
      const budgetSetExpenseAction = createBudgetSetExpenseAcion(expense);
      dispatch(budgetSetExpenseAction);
    });
    dispatch(createBudgetSetLoadingAction(false));
    dispatch(budgetSetIsSetAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const budgetSetErrorAction = createBudgetSetErrorAction(errMsg);
    dispatch(budgetSetErrorAction);
    setTimeout(() => {
      dispatch(budgetClearErrorAction);
    }, 1700);
  }
};

export const createBudgetAppendExpenseAction = (
  expenseData: Expense,
) => async (dispatch: Dispatch<BudgetActions>): Promise<void> => {
  try {
    const newExpense = await BudgetService.createExpense(expenseData);
    const budgetSetExpenseAction = createBudgetSetExpenseAcion(newExpense);
    dispatch(budgetSetExpenseAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const budgetSetErrorAction = createBudgetSetErrorAction(errMsg);
    dispatch(budgetSetErrorAction);
    setTimeout(() => {
      dispatch(budgetClearErrorAction);
    }, 1700);
  }
};

export const createBudgetRemoveExpenseAction = (
  id: Expense['id'],
) => async (dispatch: Dispatch<BudgetActions>): Promise<void> => {
  try {
    const removedExpenseId = await BudgetService.removeExpense(id);
    const budgetDeleteExpenseAction = createDeleteExpenseAction(removedExpenseId);
    dispatch(budgetDeleteExpenseAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const budgetSetErrorAction = createBudgetSetErrorAction(errMsg);
    dispatch(budgetSetErrorAction);
    setTimeout(() => {
      dispatch(budgetClearErrorAction);
    }, 1700);
  }
};

export const createSetCategoriesAction = () => async (dispatch: Dispatch<BudgetActions>): Promise<void> => {
  try {
    const categories = await BudgetService.getCategories();
    const budgetSetCategoriesAction = createBudgetSetCategoriesAction(categories);
    dispatch(budgetSetCategoriesAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const budgetSetErrorAction = createBudgetSetErrorAction(errMsg);
    dispatch(budgetSetErrorAction);
    setTimeout(() => {
      dispatch(budgetClearErrorAction);
    }, 1700);
  }
};
