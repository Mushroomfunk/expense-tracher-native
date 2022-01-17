import { StyleSheet, TextInput, Button } from 'react-native';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Text, View } from '../../components/Themed';
import { Formik } from 'formik';
import { RootTabScreenProps } from '../../types';
import ColorPicker from 'react-native-wheel-color-picker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCategory } from '../../store/categories/categoriesSlice';

const schema = yup.object({
	name: yup.string().required('Name is required'),
});

const AddCategory = ({ toggleAddCategory }) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

	return (
		<Formik
			initialValues={{
				name: '',
				color: '#ffffff',
			}}
			onSubmit={(values, { resetForm }) => {
				dispatch(addCategory({ uid: user.uid, ...values }));
				toggleAddCategory();
				return resetForm();
			}}
			validationSchema={schema}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				errors,
				touched,
			}) => (
				<View>
					<Text style={styles.label}>Category name</Text>
					<TextInput
						placeholder="Enter category name"
						value={values.name}
						onBlur={handleBlur('name')}
						onChangeText={handleChange('name')}
						style={styles.input}
					/>
					<Text style={styles.label}>Choose category color</Text>
					<View style={styles.color}>
						<ColorPicker
							color={values.color}
							onColorChangeComplete={(color) => (values.color = color)}
						/>
					</View>
					<Button onPress={handleSubmit} title="Create" />
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	label: {
		fontSize: 16,
		marginTop: 20,
		marginBottom: 10,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	input: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#3b83f7',
		height: 30,
		padding: 10,
	},
	color: {
		marginBottom: 20,
	},
});

export default AddCategory;
