// monthly.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/shared/models/interface/category';
import { ITransaction } from 'src/app/shared/models/interface/transaction';

import { MonthlyTransaction } from '../../models/monthly-transaction';
import { loadMonthlyDetailsSuccess } from './monthly-details.actions';

export interface MonthlyDetailsState {
  categories: ICategory[];
  transactions: ITransaction[];
  monthlyCategories: MonthlyTransaction;
  monthlyIncome: number;
}

const initialState: MonthlyDetailsState = {
  categories: [],
  transactions: [],
  monthlyCategories: {},
  monthlyIncome: 0
};

export const monthlyDetailsReducer = createReducer(
  initialState,
  on(loadMonthlyDetailsSuccess, (state, { categories, transactions }) => {
    const monthlyCategories = {};
    let monthlyIncome = 0;

    categories.forEach(category => {
      if (category.transactionsCount > 0) {
        monthlyCategories[category._id] = {
          name: category.name,
          exp: 0,
          inc: 0,
          items: []
        };
      }

      transactions.forEach(transaction => {
        if (transaction._categoryId === category._id) {
          monthlyCategories[transaction._categoryId].items.push(transaction);

          if (transaction.type === 'exp') {
            monthlyCategories[transaction._categoryId].exp += transaction.value;
          }
          if (transaction.type === 'inc') {
            monthlyCategories[transaction._categoryId].inc += transaction.value;
            monthlyIncome += transaction.value;
          }
        }
      });
    });

    return {
      ...state,
      categories,
      transactions,
      monthlyCategories,
      monthlyIncome
    };
  })
);
