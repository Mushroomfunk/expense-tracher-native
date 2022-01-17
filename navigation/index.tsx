/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TransactionsScreen from '../screens/transactions/TransactionsScreen';
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import { useState } from 'react';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}
import { useEffect } from 'react';
import {
	addCategory,
	setCategories,
} from '../store/categories/categoriesSlice';
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../api/firebase-config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleIsAddCategoryOpen } from '../store/categories/categoriesSlice';
import {
	setTransactions,
	toggleIsAddTransactionOpen,
} from '../store/transactions/transactionsSlice';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const { isAuth } = useAppSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(true);
	return (
		<Stack.Navigator>
			{isAuth ? (
				<>
					<Stack.Screen
						name="Root"
						component={BottomTabNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="NotFound"
						component={NotFoundScreen}
						options={{ title: 'Oops!' }}
					/>
					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name="Modal" component={ModalScreen} />
					</Stack.Group>
				</>
			) : (
				<>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	useEffect(() => {
		try {
			const queryCategories = query(
				collection(db, 'users', user.uid, 'categories')
			);
			onSnapshot(queryCategories, (querySnapshot) => {
				dispatch(
					setCategories(
						querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
				);
			});
			const queryTransactions = query(
				collection(db, 'users', user.uid, 'transactions')
			);
			onSnapshot(queryTransactions, (querySnapshot) => {
				dispatch(
					setTransactions(
						querySnapshot.docs.map((doc) => ({
							id: doc.id,
							date: doc.data().timestamp.toDate(),
							...doc.data(),
						}))
					)
				);
			});
		} catch (error: any) {
			console.log(error);
		}
	}, []);

	return (
		<BottomTab.Navigator
			initialRouteName="Transactions"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="Transactions"
				component={TransactionsScreen}
				options={({ navigation }: RootTabScreenProps<'Transactions'>) => ({
					title: 'Transactions',
					tabBarIcon: ({ color }) => <TabBarIcon name="rouble" color={color} />,
					headerShown: true,
					headerRight: () => (
						<Pressable
							onPress={() => dispatch(toggleIsAddTransactionOpen())}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome
								name="plus-circle"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name="Categories"
				component={CategoriesScreen}
				options={({ navigation }: RootTabScreenProps<'Categories'>) => ({
					title: 'Categories',
					tabBarIcon: ({ color }) => <TabBarIcon name="file" color={color} />,
					headerShown: true,
					headerRight: () => (
						<Pressable
							onPress={() => dispatch(toggleIsAddCategoryOpen())}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome
								name="plus-circle"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.cateexpo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
