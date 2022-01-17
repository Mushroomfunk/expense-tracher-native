import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA9Do2UIdJSD_-P389uV_7Q-UkbSEP5V6c',
	authDomain: 'expense-tracker-d1548.firebaseapp.com',
	projectId: 'expense-tracker-d1548',
	storageBucket: 'expense-tracker-d1548.appspot.com',
	messagingSenderId: '41567325603',
	appId: '1:41567325603:web:11621805ce499c69f71e16',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

console.log(db);
