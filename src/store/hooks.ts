/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { MainState } from './types';

export const useRootSelector = <Selected = unknown>
  (selector: (state: MainState) => Selected) => useSelector<MainState, Selected>(selector);
