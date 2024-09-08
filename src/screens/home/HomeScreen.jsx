import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";

const HomeScreen = () => {
    return (
        <ScrollView>
            <StatusBar style={'light-content'} backgroundColor='#fff'/>
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 17,
        backgroundColor: '#fff',
    }
})

export default HomeScreen;