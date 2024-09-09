import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const ButtonFloatComponent = (
    {
        icon = <Ionicons name="add-sharp" size={24} color="white" />
    }
) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
            >
                {icon}
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        bottom: 17,
        right: 17,
    },
    button: {
        height: 80,
        width: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'circular',
        backgroundColor: '#FF520D',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    }
});

export default ButtonFloatComponent;