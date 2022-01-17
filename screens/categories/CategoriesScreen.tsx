import { Button, StyleSheet } from 'react-native';
import { useState } from 'react';

import { View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import CategoriesList from '../../components/categories/CategoriesList';
import Dialog from '../../components/Dialog';
import AddCategory from '../../components/categories/AddCategory';
import { toggleIsAddCategoryOpen } from '../../store/categories/categoriesSlice';

export default function CategoriesScreen({
	navigation,
}: RootTabScreenProps<'Categories'>) {
	// const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const { isAddCategoryOpen, categories } = useAppSelector(
		(state) => state.categories
	);
	const dispatch = useAppDispatch();

	const toggleAddCategory = () => {
		dispatch(toggleIsAddCategoryOpen());
	};

	return (
		<View style={styles.container}>
			<Dialog
				header="Add Category"
				body={<AddCategory toggleAddCategory={toggleAddCategory} />}
				open={isAddCategoryOpen}
				toggleDialog={toggleAddCategory}
			/>
			<CategoriesList categories={categories} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
});
