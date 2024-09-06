import React, {useEffect, useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";
import SplashScreen from "../screens/auth/SplashScreen";

const Stack = createStackNavigator();

const AuthStacks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const getUserToken = async () => {
        // testing purposes
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        try {
            // custom logic
            await sleep(2000);
            const token = null;
            setUserToken(token);
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
            <Stack.Screen
                name="AuthStacks"
                component={AuthScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStacks;