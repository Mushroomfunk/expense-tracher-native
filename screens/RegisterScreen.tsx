import { StyleSheet } from 'react-native';
import * as yup from 'yup';
import { registerUser } from '../store/user/userSlice';
import AuthForm from '../components/AuthForm';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

const schema = yup.object({
	displayName: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Please enter correct email')
		.required('Email is required'),
	password: yup.string().min(6).required('Password is required'),
});

const formRows = [
	{
		name: 'displayName',
		placeholder: 'Enter name',
		type: 'name',
	},
	{
		name: 'email',
		placeholder: 'Enter email',
		type: 'emailAddress',
	},
	{
		name: 'password',
		placeholder: 'Enter password',
		type: 'password',
	},
];

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
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});

const RegisterScreen = ({ navigation }: RootStackScreenProps<'Register'>) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>
			<AuthForm
				formRows={formRows}
				schema={schema}
				action={registerUser}
				buttonLabel="Register"
			/>
			<Text onPress={() => navigation.navigate('Login')}>Need to sign in?</Text>
		</View>
	);
};

export default RegisterScreen;
