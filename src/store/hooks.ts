/* eslint-disable import/prefer-default-export */
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';

import { MainState, AppDispatch } from './types';

export const useRootSelector: TypedUseSelectorHook<MainState> = useSelector;

export const useRootDispatch = () => useDispatch<AppDispatch>();
