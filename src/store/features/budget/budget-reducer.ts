/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { BudgetState, BudgetActions, BudgetActionType } from './types';

const initialState: BudgetState = {
  expenses: [],
  categories: [],
  error: null,
  loading: true,
  formOpen: false,
  currentCategory: 'all',
  isSet: false,
};

const budgetReducer: Reducer<BudgetState, BudgetActions> = (state = initialState, action) => {
  switch (action.type) {
    case BudgetActionType.BUDGET_SET_EXPENSE: {
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            ...action.payload,
          },
        ],
      };
    }

    case BudgetActionType.BUDGET_DELETE_EXPENSE: {
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
      };
    }

    case BudgetActionType.BUDGET_SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case BudgetActionType.BUDGET_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }

    case BudgetActionType.BUDGET_SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case BudgetActionType.BUDGET_SET_IS_SET: {
      return {
        ...state,
        isSet: true,
      };
    }

    case BudgetActionType.BUDGET_CLEAR_EXPENSES: {
      return {
        ...state,
        expenses: [],
        isSet: false,
        loading: false,
      };
    }

    case BudgetActionType.BUDGET_SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload.category,
      };
    }

    case BudgetActionType.BUDGET_SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload.categories,
      };
    }

    case BudgetActionType.BUDGET_SET_FORM_OPEN: {
      return {
        ...state,
        currentCategory: 'all',
        formOpen: action.payload,
      };
    }

    default: return state;
  }
};

export default budgetReducer;
