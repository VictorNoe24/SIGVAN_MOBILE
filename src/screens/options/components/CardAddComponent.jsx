import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";

const CardAddComponent = (
    {
        id = 0,
        icon = <MaterialIcons name="logo-dev" size={48} color="#FF520D" />,
        title = 'Undefined',
        add = 0,
        actives = 0,
        inactives = 0,
        screen = 'undefined'
    }) => {

    const navigation = useNavigation();

    const categoryScreen = (screen) => {
        navigation.navigate("AddStack", {
            screen: screen,
        })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={()=>categoryScreen(screen)}
            >
                <View style={styles.row}>
                    {icon}
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View>
                    <Text style={styles.info}>Añadidos: <Text>{add}</Text></Text>
                    <Text style={styles.info}>Activos: <Text>{actives}</Text></Text>
                    <Text style={styles.info}>Inactivos: <Text>{inactives}</Text></Text>
                </View>

            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        marginBottom: 20,
    },
    card:{
        width:'100%',
        height:'auto',
        backgroundColor:'#fff',
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF520D',
    },
    info: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    }
});

export default CardAddComponent