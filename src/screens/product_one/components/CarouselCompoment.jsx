import React from "react";
import {Image, ScrollView, StyleSheet, View} from "react-native";

const CarouselCompoment = ({product = []}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={{width:'80%'}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {product[0]?.images.map((image, index) => (
                    <View key={index} style={styles.card}>
                        <Image borderRadius={16} style={styles.img} source={{uri: image}}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center",
    },
    card: {
        height: 65,
        width: 65,
        margin: 7,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: '#ededed',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        height: 55,
        width: 55,
    },
})

export default CarouselCompoment;