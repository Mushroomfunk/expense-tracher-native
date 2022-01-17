import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';
import transactionsReducer from './transactions/transactionsSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		categories: categoriesReducer,
		transactions: transactionsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
