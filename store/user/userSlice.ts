import { RootState } from '../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { app, db } from '../../api/firebase-config';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export type User = {
	uid: string;
	name: string;
	email: string;
};

export type LoginData = {
	email: string;
	password: string;
	displayName: string;
};

export interface UserState {
	user: User;
	isAuth: boolean;
	status: boolean;
}

const initialState: UserState = {
	user: {
		uid: 'MREwgFilPPXngM1FvL4SnC8jXnu2',
		name: 'test',
		email: 'test@example.com',
	},
	isAuth: true,
	status: false,
};

export const registerUser = createAsyncThunk(
	'user/register',
	async ({ email, password, displayName }: LoginData, { rejectWithValue }) => {
		try {
			const auth = getAuth(app);
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await updateProfile(response.user, { displayName });

			await setDoc(doc(db, 'users', response.user.uid), {
				name: response.user.displayName,
				email: response.user.email,
			});

			return {
				uid: response.user.uid,
				name: response.user.displayName,
				email: response.user.email,
			};
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/login',
	async ({ email, password }: LoginData, { rejectWithValue }) => {
		try {
			const auth = getAuth(app);
			const response = await signInWithEmailAndPassword(auth, email, password);

			return {
				uid: response.user.uid,
				name: response.user.displayName,
				email: response.user.email,
			};
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = false;
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.status = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = false;
				state.isAuth = true;
				state.user = action.payload;
			});
	},
});

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
