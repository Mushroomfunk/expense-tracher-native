import { Button, StyleSheet } from 'react-native';
import { useState } from 'react';

import { View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import CategoriesList from '../../components/categories/CategoriesList';
import Dialog from '../../components/Dialog';
import AddTransaction from '../../components/transactions/AddTransaction';
import { toggleIsAddTransactionOpen } from '../../store/transactions/transactionsSlice';
import TransactionsList from '../../components/transactions/TransactionsList';

export default function CategoriesScreen({
	navigation,
}: RootTabScreenProps<'Categories'>) {
	const { isAddTransactionOpen, transactions } = useAppSelector(
		(state) => state.transactions
	);
	const dispatch = useAppDispatch();

	const toggleAddTransaction = () => {
		dispatch(toggleIsAddTransactionOpen());
	};

	return (
		<View style={styles.container}>
			<Dialog
				header="Add Transaction"
				body={<AddTransaction toggleAddTransaction={toggleAddTransaction} />}
				open={isAddTransactionOpen}
				toggleDialog={toggleAddTransaction}
			/>
			<TransactionsList transactions={transactions} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
});
