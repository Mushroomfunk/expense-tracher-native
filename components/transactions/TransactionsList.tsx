import { FlatList, StyleSheet } from 'react-native';
import { View } from '../Themed';
import { TransactionsListItem } from './TransactionsListItem';

const TransactionsList = ({ transactions }) => {
	const renderItem = ({ item }) => (
		<TransactionsListItem
			amount={item.amount}
			type={item.type}
			date={item.timestamp}
		/>
	);
	return (
		<View style={{ flex: 1, width: '100%' }}>
			<FlatList
				data={transactions}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
			/>
		</View>
	);
};

export default TransactionsList;
