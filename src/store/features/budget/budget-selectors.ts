import { MainState } from '../../types';

export const selectBudgetExpenses = (state: MainState) => state.budget.expenses;

export const selectBudgetError = (state: MainState) => state.budget.error;

export const selectBudgetCategories = (state: MainState) => state.budget.categories;

export const selectBudgetCurrentCategory = (state: MainState) => state.budget.currentCategory;

export const selectBudgetIsSet = (state: MainState) => state.budget.isSet;

export const selectBudgetLoading = (state: MainState) => state.budget.loading;

export const selectBudgetFormOpen = (state: MainState) => state.budget.formOpen;

export const selectBudgetCalculatedExpenses = (state: MainState) => state.budget.calculatedExpenses;

export const selectBudgetChartDataLoaded = (state: MainState) => state.budget.chartDataLoaded;
