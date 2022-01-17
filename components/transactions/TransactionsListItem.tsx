import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

export const TransactionsListItem = ({ amount, type, date }) => {
	return (
		<View style={{ ...flattenStyle }}>
			<Text style={styles.text}>{amount}</Text>
			<Text style={styles.text}>{type}</Text>
			{/* <Text style={styles.text}>{new Date(date.seconds).toString()}</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		borderWidth: 1,
		padding: 10,
		margin: 5,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	text: {
		fontSize: 20,
		padding: 5,
	},
});
const flattenStyle = StyleSheet.flatten([styles.item]);
