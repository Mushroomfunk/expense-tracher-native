import {
	StyleSheet,
	TextInput,
	Button,
	TouchableWithoutFeedback,
	Text,
	View,
} from 'react-native';
import * as yup from 'yup';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';

import { Formik, Field } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTransaction } from '../../store/transactions/transactionsSlice';
const schema = yup.object({
	amount: yup.string().required('Amount is required'),
});

const AddTransaction = ({ toggleAddTransaction }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);

	const dispatch = useAppDispatch();
	const { categories } = useAppSelector((state) => state.categories);
	const { user } = useAppSelector((state) => state.user);

	return (
		<View>
			<Formik
				initialValues={{
					amount: '',
					type: 'expense',
					categoryId: null,
				}}
				onSubmit={(values, { resetForm }) => {
					dispatch(addTransaction({ uid: user.uid, ...values }));
					toggleAddTransaction();
					return resetForm();
				}}
				validationSchema={schema}
			>
				{({
					handleSubmit,
					handleChange,
					setFieldValue,
					handleBlur,
					values,
					errors,
					touched,
				}) => (
					<View>
						<Text style={styles.label}>Add transaction</Text>
						<TextInput
							placeholder="Enter amount"
							value={values.amount}
							onBlur={handleBlur('amount')}
							onChangeText={handleChange('amount')}
							style={styles.input}
							keyboardType="number-pad"
						/>
						<Text style={styles.label}>Select transaction type</Text>
						<RadioForm
							radio_props={[
								{ label: 'Expense', value: 'expense' },
								{ label: 'Income', value: 'income' },
							]}
							initial={0}
							formHorizontal={false}
							labelHorizontal={true}
							buttonColor={'#3b83f7'}
							animation={true}
							onPress={(value) => {
								setFieldValue('type', value);
							}}
						/>
						<Text style={styles.label}>
							{/* {categories} */}
							Select category
						</Text>
						<DropDownPicker
							// items={items}
							items={categories.map((category) => {
								return {
									label: category.name,
									value: category.id,
									containerStyle: {
										backgroundColor: category.color,
										padding: 5,
										display: 'flex',
										justifyContent: 'space-between',
										flexDirection: 'row',
									},
									labelStyle: {},
								};
							})}
							value={value}
							open={open}
							setOpen={setOpen}
							setValue={setValue}
							onSelectItem={(item) => setFieldValue('categoryId', item.value)}
							style={styles.input}
							dropDownDirection="TOP"
						/>
						<TouchableWithoutFeedback onPress={() => handleSubmit()}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Add</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				)}
			</Formik>
		</View>
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
		flexDirection: 'row',
		padding: 10,
	},

	button: {
		borderRadius: 8,
		marginTop: 20,
		backgroundColor: '#3b83f7',
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 18,
		color: '#ffffff',
		fontWeight: '600',
	},
});

export default AddTransaction;
