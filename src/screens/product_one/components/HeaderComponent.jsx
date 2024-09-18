import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useNavigation} from "@react-navigation/native";
import Animated from 'react-native-reanimated';

const HeaderComponent = () => {

    const navigation = useNavigation();

    return (
        <Animated.View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.goBack()}}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#FF520D" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <MaterialIcons name="mode-edit" size={24} color="#FF520D" />
            </TouchableOpacity>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 17
    },
    button: {
        borderRadius: 16,
        padding: 5,
    }
});

export default HeaderComponent;