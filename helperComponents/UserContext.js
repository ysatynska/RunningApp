import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveUserAsync(user) {
	try {
		const jsonValue = JSON.stringify(user);
		await AsyncStorage.setItem(user.username, jsonValue);
	} catch (e) {
		console.log(e);
	}
}
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const updateUser = (userData) => {
		setUser(userData);
		saveUserAsync(userData);
	};

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};
