import React, {useEffect, useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import Tabs from "./Tabs";
import {useAuth} from "../context/AuthContext";
import RegisterScreen from "../screens/auth/RegisterScreen";
import {CreateTables, CreateTriggers} from "../db/database";
import {LOGGER} from "../utils/env";
import AddStack from "./AddStack";
import SearchStack from "./SearchStack";
import RegisterCompanyScreen from "../screens/auth/RegisterCompanyScreen";

const Stack = createStackNavigator();

const AuthStacks = () => {
    const {userToken, SignIn, isLoading, setIsLoading} = useAuth();

    const getUserToken = async () => {
        try {
            await CreateTables();
            await CreateTriggers();
            await SignIn();
        } catch(e) {
            LOGGER.error(e);
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
        <Stack.Navigator>
            {userToken === null ? (
                <>
                    <Stack.Screen
                        name='SinUpCompany'
                        component={RegisterCompanyScreen}
                        options={{
                            headerTitle: 'Registrar tu Empresa',
                            headerTitleAlign: 'center',
                        }}
                    />
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
                        }}
                    />

                    <Stack.Screen
                        name="Recovery"
                        component={AuthScreen}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name='Home'
                        component={Tabs}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='AddStack'
                        component={AddStack}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name={'SearchStack'}
                        component={SearchStack}
                        options={{
                            headerShown: false
                        }}
                    />
                </>

            )}
        </Stack.Navigator>
    );
}

export default AuthStacks;