import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import CardAddComponent from "./components/CardAddComponent";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={{marginBottom: '20%',}}
                showsVerticalScrollIndicator={false}
            >
                <CardAddComponent
                    title={'Categorias'}
                    icon={<MaterialIcons name="category" size={48} color="#FF520D" />}
                    screen={'AllCategory'}
                />
                <CardAddComponent
                    title={'Productos'}
                    icon={<Ionicons name="logo-dropbox" size={48} color="#FF520D" />}
                    screen={'AllProduct'}
                />
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 17,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    }
});

export default AddScreen;