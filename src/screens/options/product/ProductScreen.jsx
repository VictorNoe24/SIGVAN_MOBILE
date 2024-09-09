import React from "react";
import {StyleSheet, Text, View} from "react-native";
import ButtonFloatComponent from "../../../components/ButtonFloatComponent";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProductScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Products</Text>
            <ButtonFloatComponent
                icon={<Ionicons name="bag-add" size={24} color="white" />}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
});

export default ProductScreen;

