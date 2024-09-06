import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabar/HomeScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, TouchableOpacity} from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: {
                    fontSize: 12, // Cambia el tamaño del texto
                },
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" size={24} color={focused ? '#FF520D' : 'gray'} />
                    ),
                    tabBarLabel: 'Inicio',
                    tabBarLabelStyle: styles.customLabel,
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="search" size={24} color={focused ? '#FF520D' : 'gray'} />
                    ),
                    tabBarLabel: 'Buscar',
                    tabBarLabelStyle: styles.customLabel,
                }}
            />

            <Tab.Screen
                name="MoreOptions"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => null,
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            style={styles.customButton}
                        >
                            <Icon name="add" size={32} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Tab.Screen
                name="SalesScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="bar-chart" size={24} color={focused ? '#FF520D' : 'gray'} />
                    ),
                    tabBarLabel: 'Ventas',
                    tabBarLabelStyle: styles.customLabel,
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="person" size={24} color={focused ? '#FF520D' : 'gray'} />
                    ),
                    tabBarLabel: 'Perfil',
                    tabBarLabelStyle: styles.customLabel,
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        height: 80,
        paddingBottom: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    customButton: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF520D',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    customLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default Tabs;
