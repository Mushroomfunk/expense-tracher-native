import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

export const CategoriesListItem = ({ name, color }) => {
	return (
		<View style={{ ...flattenStyle, backgroundColor: color }}>
			<Text style={styles.text}>{name}</Text>
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
	},
});
const flattenStyle = StyleSheet.flatten([styles.item]);
