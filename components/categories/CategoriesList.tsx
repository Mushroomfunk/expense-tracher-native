import { FlatList, StyleSheet } from 'react-native';
import { View } from '../Themed';
import { CategoriesListItem } from './CategoriesListItem';

const CategoriesList = ({ categories }) => {
	const renderItem = ({ item }) => (
		<CategoriesListItem name={item.name} color={item.color} />
	);
	return (
		<View style={{ flex: 1, width: '100%' }}>
			<FlatList
				data={categories}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
			/>
		</View>
	);
};

export default CategoriesList;
