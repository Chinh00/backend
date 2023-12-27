
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {AppDispatch, RootState} from "@/redux/store.ts";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector