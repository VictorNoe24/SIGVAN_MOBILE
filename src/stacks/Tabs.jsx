import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet} from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import SearchScreen from "../screens/search/SearchScreen";
import SalesScreen from "../screens/sales/SalesScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CustomTabBar from "./CustomTabBar";
import { TransitionPresets } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                animationEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} />
            <Tab.Screen name="AddScreen" component={SalesScreen}/>
            <Tab.Screen name="SalesScreen" component={SalesScreen}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        position: 'absolute',
        marginHorizontal: 17,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginBottom: 20,
    }
});

export default Tabs;
