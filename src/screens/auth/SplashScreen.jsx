import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";

const SplashScreen = () => {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
              source={require('../../../assets/icon.png')}
              style={styles.image}
          />
          <Text style={styles.title}>VentasUX</Text>
          <ActivityIndicator
              size="large"
              color="#FF520D"
          />
      </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25,
    },
})

export default SplashScreen