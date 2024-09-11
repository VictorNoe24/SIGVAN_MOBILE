import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const SectionsComponent = ({title = 'Section name'}) => {
    return (
        <View>
            <View style={styles.line}></View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    line: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 0.2,
        marginVertical: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(255,82,13,0.48)',
        marginBottom: 5,
    }
});

export default SectionsComponent;