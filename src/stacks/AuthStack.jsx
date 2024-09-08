import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import Tabs from "./Tabs";
import {AuthProvider} from "../context/AuthContext";
import RegisterScreen from "../screens/auth/RegisterScreen";
import {StyleSheet} from "react-native";
import { logger } from "react-native-logs";
import {CreateTables, CreateTriggers} from "../db/database";

const log = logger.createLogger();

const Stack = createStackNavigator();

const AuthStacks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const getUserToken = async () => {
        try {
            await CreateTables();
            await CreateTriggers();
            const jsonValue = await AsyncStorage.getItem('AUTH_USER_TOKEN');
            return setUserToken(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch(e) {
            log.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserToken();
    }, []);

    if ( isLoading ) {
        return <SplashScreen/>
    }

    return (
        <AuthProvider>
            <Stack.Navigator>
                {userToken === null ? (
                    <>
                        <Stack.Screen
                            name="SignIn"
                            component={AuthScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={RegisterScreen}
                            options={{
                                headerTitle: 'Registrar Usuario',
                                headerTitleAlign: 'center',
                                headerTitleStyle: styles.customLabel,
                            }}

                        />
                        <Stack.Screen
                            name="Recovery"
                            component={AuthScreen}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name='Home'
                        component={Tabs}
                    />
                )}

            </Stack.Navigator>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    customLabel: {

    }
})

export default AuthStacks;