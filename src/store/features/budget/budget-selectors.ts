import { MainState } from '../../types';

export const selectExpenses = (state: MainState) => state.budget.expenses;

export const selectBudgetError = (state: MainState) => state.budget.error;

export const selectBudgetCurrentCategory = (state: MainState) => state.budget.currentCategory;

export const selectBudgetLoading = (state: MainState) => state.budget.loading;

export const selectBudgetSuccess = (state: MainState) => state.budget.appendSuccess;
