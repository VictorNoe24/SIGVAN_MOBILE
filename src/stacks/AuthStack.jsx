import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

const AuthStacks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const getUserToken = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('AUTH_USER_TOKEN');
            return setUserToken(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch(e) {
            logger.error(e);
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
                <Stack.Screen
                    name="SinIn"
                    component={AuthScreen}
                    options={{
                        headerShown: false
                    }}
                />
            ) : (
                <Stack.Screen
                    name='Home'
                    component={Tabs}
                />
            )}

        </Stack.Navigator>
    );
}

export default AuthStacks;