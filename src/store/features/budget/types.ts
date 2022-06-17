import { Expense, CalculatedExpense } from '../../../types';
import { ExpenseCategory } from '../../../types/expense-category';

export type BudgetState = {
  expenses: Expense[],
  categories: ExpenseCategory[],
  calculatedExpenses: CalculatedExpense[],
  error: string | null,
  loading: boolean,
  formOpen: boolean,
  currentCategory: string,
  isSet: boolean,
  chartIsSet: boolean,
  chartDataLoaded: boolean,
};

export enum BudgetActionType {
  BUDGET_SET_EXPENSE = 'BUDGET_SET_EXPENSE',
  BUDGET_SET_CALCULATED_EXPENSES = 'BUDGET_SET_CALCULATED_EXPENSES',
  BUDGET_SET_ERROR = 'BUDGET_SET_ERROR',
  BUDGET_SET_IS_SET = 'BUDGET_SET_IS_SET',
  BUDGET_SET_LOADING = 'BUDGET_SET_LOADING',
  BUDGET_SET_FORM_OPEN = 'BUDGET_SET_FORM_OPEN',
  BUDGET_SET_CATEGORIES = 'BUDGET_SET_CATEGORIES',
  BUDGET_SET_CURRENT_CATEGORY = 'BUDGET_SET_CURRENT_CATEGORY',
  BUDGET_SET_CHART_IS_SET = 'BUDGET_SET_CHART_IS_SET',
  BUDGET_SET_CHART_DATA_LOADED = 'BUDGET_SET_CHART_DATA_LOADED',
  BUDGET_CLEAR_EXPENSES = 'BUDGET_CLEAR_EXPENSES',
  BUDGET_CLEAR_ERROR = 'BUDGET_CLEAR_ERROR',
  BUDGET_DELETE_EXPENSE = 'BUDGET_DELETE_EXPENSE',
}

export type BudgetSetExpenseAction = {
  type: BudgetActionType.BUDGET_SET_EXPENSE,
  payload: Expense
};

export type BudgetSetCalculatedExpensesAction = {
  type: BudgetActionType.BUDGET_SET_CALCULATED_EXPENSES,
  payload: CalculatedExpense[]
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

export type BudgetSetChartIsSetAction = {
  type: BudgetActionType.BUDGET_SET_CHART_IS_SET
};

export type BudgetSetErrorAction = {
  type: BudgetActionType.BUDGET_SET_ERROR,
  payload: {
    error: string
  }
};

export type BudgetClearErrorAction = {
  type: BudgetActionType.BUDGET_CLEAR_ERROR
};

export type BudgetSetLoadingAction = {
  type: BudgetActionType.BUDGET_SET_LOADING,
  payload: boolean,
};

export type BudgetSetFormOpenAction = {
  type: BudgetActionType.BUDGET_SET_FORM_OPEN,
  payload: boolean,
};

export type BudgetSetIsSetAction = {
  type: BudgetActionType.BUDGET_SET_IS_SET
};

export type BudgetSetCurrentCategoryAction = {
  type: BudgetActionType.BUDGET_SET_CURRENT_CATEGORY,
  payload: {
    category: string
  }
};

export type BudgetSetChartDataLoadedAction = {
  type: BudgetActionType.BUDGET_SET_CHART_DATA_LOADED
};

export type BudgetSetCategoriesAction = {
  type: BudgetActionType.BUDGET_SET_CATEGORIES
  payload: {
    categories: ExpenseCategory[]
  }
};

export type BudgetActions = BudgetSetExpenseAction | BudgetDeleteExpenseAction | BudgetClearExpensesAction | BudgetSetErrorAction | BudgetSetLoadingAction | BudgetSetFormOpenAction | BudgetSetIsSetAction | BudgetClearErrorAction | BudgetSetCurrentCategoryAction | BudgetSetCategoriesAction | BudgetSetCalculatedExpensesAction | BudgetSetChartIsSetAction | BudgetSetChartDataLoadedAction;
