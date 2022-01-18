import { RootState } from '../store';
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

type Category = {
	uid: string;
	name: string;
	color: string;
};
interface CategoriesState {
	categories: Category[];
	isAddCategoryOpen: boolean;
}

const initialState: CategoriesState = {
	categories: [],
	isAddCategoryOpen: false,
};

export const addCategory = createAsyncThunk(
	'transactions/addCategory',
	async ({
		uid,
		name,
		color,
	}: {
		uid: string;
		name: string;
		color: string;
	}) => {
		try {
			await setDoc(doc(db, 'users', uid, 'categories', nanoid()), {
				name,
				color,
				timestamp: Timestamp.now(),
			});
		} catch (error: any) {
			console.log(error);
		}
	}
);

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories(state, action) {
			state.categories = action.payload;
		},
		toggleIsAddCategoryOpen(state) {
			state.isAddCategoryOpen = !state.isAddCategoryOpen;
		},
	},
	extraReducers: (builder) => {},
});

const { actions, reducer } = categoriesSlice;

export const { setCategories, toggleIsAddCategoryOpen } = actions;

export default reducer;
