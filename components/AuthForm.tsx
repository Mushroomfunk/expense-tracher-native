import { Button, TextInput, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { Formik } from 'formik';
import { View } from './Themed';

type FormRow = {
	name: string;
	type: string;
};
type InitialValues = {
	[key: string]: string;
};
interface FormDefaultProps {
	formRows: FormRow[];
	schema: any;
	action: any;
	buttonLabel: string;
}

const styles = StyleSheet.create({
	form: {
		padding: 20,
	},
	FormRow: {
		position: 'relative',
	},
	input: {
		marginBottom: 20,
		borderWidth: 1,
		height: 40,
		width: 250,
		padding: 10,
	},
	errorText: {
		color: 'red',
		position: 'absolute',
		top: -20,
	},
});

const Form = ({ formRows, schema, action, buttonLabel }: FormDefaultProps) => {
	const dispatch = useAppDispatch();

	return (
		<Formik
			initialValues={formRows.reduce(
				(acc: InitialValues, row: FormRow) =>
					(acc = { ...acc, [row.name]: '' }),
				{}
			)}
			onSubmit={(values) => dispatch(action(values))}
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
				<View style={styles.form}>
					{formRows.map((row: InitialValues) => (
						<View key={row.name}>
							<TextInput
								value={values[row.name]}
								onBlur={handleBlur(row.name)}
								onChangeText={handleChange(row.name)}
								textContentType={row.type}
								placeholder={row.placeholder}
								secureTextEntry={row.name === 'password'}
								style={styles.input}
							/>
							{!!errors[row.name] && (
								<Text style={styles.errorText}>
									{touched[row.name] && errors[row.name]}
								</Text>
							)}
						</View>
					))}

					<Button onPress={handleSubmit} title={buttonLabel} />
				</View>
			)}
			{}
		</Formik>
	);
};

export default Form;
