import { Dispatch } from 'redux';

import { Expense } from '../../../types/expense';
import {
  BudgetSetCurrentCategoryAction,
  BudgetActions,
  BudgetSetSuccessAction,
  BudgetSetExpenseAction,
  BudgetDeleteExpenseAction,
  BudgetSetErrorAction,
  BudgetSetIsSetAction,
  BudgetRefreshAction,
  BudgetClearExpensesAction,
  BudgetActionType,
  BudgetSetLoadingAction,
  BudgetClearErrorAction,
} from './types';

export const budgetSetLoadingAction: BudgetSetLoadingAction = {
  type: BudgetActionType.BUDGET_SET_LOADING,
};

export const budgetClearErrorAction: BudgetClearErrorAction = {
  type: BudgetActionType.BUDGET_CLEAR_ERROR,
};

export const budgetSetIsSetAction: BudgetSetIsSetAction = {
  type: BudgetActionType.BUDGET_SET_IS_SET,
};

export const budgetRefreshAction: BudgetRefreshAction = {
  type: BudgetActionType.BUDGET_REFRESH,
};

export const budgetClearExpensesAction: BudgetClearExpensesAction = {
  type: BudgetActionType.BUDGET_CLEAR_EXPENSES,
};

export const createBudgetSetSuccessAction = (response: boolean | string): BudgetSetSuccessAction => ({
  type: BudgetActionType.BUDGET_SET_SUCCESS,
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

export const createBudgetAppendExpenseAction = (
  expenseData: Omit<Expense, 'id'>,
) => async (dispatch: Dispatch<BudgetActions>): Promise<void> => {
  try {
    const budgetSetExpenseAction = createBudgetSetExpenseAcion({ id: '1', ...expenseData });
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
    const budgetDeleteExpenseAction = createDeleteExpenseAction(id);
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
