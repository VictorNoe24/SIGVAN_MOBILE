import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar = (props) => {

    const getIconName = (routeName, isFocused) => {
        switch (routeName) {
            case 'HomeScreen':
                return isFocused ? 'home' : 'home-outline';
            case 'SearchScreen':
                return isFocused ? 'search' : 'search-outline';
            case 'SalesScreen':
                return isFocused ? 'bar-chart' : 'bar-chart-outline';
            case 'ProfileScreen':
                return isFocused ? 'person' : 'person-outline';
            default:
                return 'ellipse-outline';
        }
    };

    const getLabel = (routeName) => {
        switch (routeName) {
            case 'HomeScreen':
                return 'Inicio';
            case 'SearchScreen':
                return 'Buscar';
            case 'SalesScreen':
                return 'Ventas';
            case 'ProfileScreen':
                return 'Perfil';
            default:
                return 'Agregar';
        }
    };

    return (
        <View style={styles.tabsContainer}>
            {props.state.routes.map((route, index) => {
                const label = getLabel(route.name); // Obtener el label personalizado
                const isFocused = props.state.index === index;

                const scaleAnim = useRef(new Animated.Value(isFocused ? 1.2 : 1)).current;
                const opacityAnim = useRef(new Animated.Value(isFocused ? 1 : 0.5)).current;

                useEffect(() => {
                    Animated.timing(scaleAnim, {
                        toValue: isFocused ? 1.2 : 1,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();

                    Animated.timing(opacityAnim, {
                        toValue: isFocused ? 1 : 0.5,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }, [isFocused]);

                const onPress = () => {
                    const event = props.navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        props.navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const iconName = getIconName(route.name, isFocused);

                return (
                    <TouchableOpacity
                        key={route.name}
                        onPress={onPress}
                        style={styles.tabContainer}>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
                            <Icon
                                name={iconName}
                                size={24}
                                color={isFocused ? '#FF520D' : 'gray'}
                            />
                        </Animated.View>
                        <Animated.Text style={[styles.tabText, { color: isFocused ? '#FF520D' : '#222', opacity: opacityAnim }]}>
                            {label} {/* Mostrar el label personalizado */}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    tabText: {
        fontSize: 8,
    },
});

export default CustomTabBar;
