import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	setDoc,
	addDoc,
	serverTimestamp,
	Timestamp,
	onSnapshot,
} from 'firebase/firestore';
import { nanoid } from 'nanoid/non-secure';
import { db } from '../../api/firebase-config';

type Transaction = {
	uid: string;
	amount: string;
	categoryId: string;
};
interface TransactionsState {
	transactions: Transaction[];
	isAddTransactionOpen: boolean;
}

const initialState: TransactionsState = {
	transactions: [],
	isAddTransactionOpen: false,
};

export const addTransaction = createAsyncThunk(
	'transactions/addTransaction',
	async ({
		uid,
		amount,
		type,
		categoryId,
	}: {
		uid: string;
		amount: string;
		type: string;
		categoryId: string;
	}) => {
		try {
			await setDoc(doc(db, 'users', uid, 'transactions', nanoid()), {
				amount,
				type,
				categoryId,
				timestamp: Timestamp.now(),
			});
		} catch (error: any) {
			console.log(error);
		}
	}
);

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransactions(state, action) {
			console.log(action.payload);
			state.transactions = action.payload;
		},
		toggleIsAddTransactionOpen(state) {
			state.isAddTransactionOpen = !state.isAddTransactionOpen;
		},
	},
	extraReducers: (builder) => {},
});

const { actions, reducer } = transactionsSlice;

export const { setTransactions, toggleIsAddTransactionOpen } = actions;

export default reducer;
