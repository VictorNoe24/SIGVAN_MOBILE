import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import ButtonFloatComponent from "../../../components/ButtonFloatComponent";

const CategoryScreen = ({ navigation }) => {

    useEffect(() => {
    }, []);
    return(
        <View style={styles.container}>
            <Text>Hola</Text>
            <ButtonFloatComponent/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 17,
    }
});

export default CategoryScreen