import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {LOGGER} from "../../../utils/env";

const CardProfileComponent = (
    {
        icon = <Ionicons name="person-circle" size={50} color="black" />,
        name = 'Cargando...',
        email = 'Cargando...',
        functions = ()=> {LOGGER.info('Test DevOps')}
    }
) => {
    return (
        <TouchableOpacity
            onPress={functions}
        >
            <View style={styles.row}>
                {icon}
                <View style={styles.center}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{email}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        borderColor: '#9CA1A4',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
    }
});

export default CardProfileComponent;