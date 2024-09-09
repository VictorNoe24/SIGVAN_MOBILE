import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {LOGGER} from "../../../utils/env";

const CardOptionsComponent = (
    {
        icon = <MaterialIcons name="logo-dev" size={24} color="white" />,
        text = 'DevOps',
        functions = ()=> {LOGGER.info('Test DevOps')}
    }
) => {
    return (
        <TouchableOpacity
            onPress={functions}
        >
            <View style={styles.row}>
                <View style={styles.center}>
                    {icon}
                    <Text style={styles.title}>{text}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: 'rgba(255,82,13,0.48)',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 15,
        color: 'white',
    },
    center: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default CardOptionsComponent;