import { Expense } from '../../../types';

export type BudgetState = {
  expenses: Expense,
  error: string | null,
  loading: boolean,
  appendSuccess: boolean | string,
  currentCategory: string // aprašyti categorijų tipą
};

export enum BudgetActionType {
  BUDGET_SET_EXPENSE = 'BUDGET_SET_EXPENSE',
  BUDGET_DELETE_EXPENSE = 'BUDGET_DELETE_EXPENSE',
  BUDGET_CLEAR_EXPENSES = 'BUDGET_CLEAR_EXPENSES',
  BUDGET_SET_ERROR = 'BUDGET_SET_ERROR',
  BUDGET_CLEAR_ERROR = 'BUDGET_CLEAR_ERROR',
  BUDGET_SET_LOADING = 'BUDGET_SET_LOADING',
  BUDGET_SET_SUCCESS = 'BUDGET_SET_SUCCESS',
  BUDGET_SET_IS_SET = 'BUDGET_SET_IS_SET',
  BUDGET_REFRESH = 'BUDGET_REFRESH',
}

export type BudgetSetExpenseAction = {
  type: BudgetActionType.BUDGET_SET_EXPENSE,
  payload: Expense
};

export type BudgetDeleteExpenseAction = {
  type: BudgetActionType.BUDGET_DELETE_EXPENSE,
  payload: {
    id: string
  }
};

export type BudgetClearExpensesAction = {
  type: BudgetActionType.BUDGET_CLEAR_EXPENSES
};

export type BudgetSetErrorAction = {
  type: BudgetActionType.BUDGET_SET_ERROR,
  payload: {
    error: string
  }
};

export type BudgetSetLoadingAction = {
  type: BudgetActionType.BUDGET_SET_LOADING
};

export type BudgetSetSuccessAction = {
  type: BudgetActionType.BUDGET_SET_SUCCESS,
  payload: boolean | string,
};

export type BudgetSetIsSetAction = {
  type: BudgetActionType.BUDGET_SET_IS_SET
};

export type BudgetRefreshAction = {
  type: BudgetActionType.BUDGET_REFRESH
};

export type BudgetActions = BudgetSetExpenseAction | BudgetDeleteExpenseAction | BudgetClearExpensesAction | BudgetSetErrorAction | BudgetSetLoadingAction | BudgetSetSuccessAction | BudgetSetIsSetAction | BudgetRefreshAction;
