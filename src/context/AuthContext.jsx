import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOGGER} from "../utils/env";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    const SignIn = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('AUTH_USER_TOKEN');
            setUserToken(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch(e) {
            LOGGER.error(e);
        }
    };

    const Storage = async (response) => {
        try {
            await AsyncStorage.setItem('AUTH_USER_TOKEN', JSON.stringify(response));
        } catch(e) {
            LOGGER.error(e);
        }
    };

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem('AUTH_USER_TOKEN')
            await SignIn();
        } catch(e) {
            LOGGER.error(e);
        }
    };

    return (
        <AuthContext.Provider value={
            {
                userToken,
                setUserToken,
                isLoading,
                setIsLoading,
                userInfo,
                setUserInfo,
                SignIn,
                SignOut,
                Storage
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);