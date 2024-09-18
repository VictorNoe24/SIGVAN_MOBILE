import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const TitleProductComponent = (
    {
        title = 'Nombre del producto',
        category = 'Categoria',
        sale_price = 1999.00,
        stock = 10,
        purchase_price = 0.0
    }
) => {
    return (
        <View>
            <View style={[styles.row, {marginBottom: 20}]}>
                <View>
                    <Text style={styles.subtitle}>{title}</Text>
                    <Text>{category}</Text>
                </View>
                <View>
                    <Text style={styles.title}>${sale_price.toLocaleString("en-IN")}</Text>
                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={styles.subtitle}>Descripción</Text>
                <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. Tincidunt nascetur id dolor convallis ac lacus cursus. Egestas cursus sit ipsum facilisi pretium eget urna dignissim viverra. Nec arcu vulputate neque justo cursus lectus vel sollicitudin. Auctor dapibus diam sit proin id.</Text>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={styles.subtitle}>Detalles</Text>
                <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-around', }}>
                    <View style={{alignItems: 'center',}}>
                        <MaterialIcons name="category" size={24} color="black" />
                        <Text style={styles.text}>{category}</Text>
                    </View>
                    <View style={{alignItems: 'center',}}>
                        <FontAwesome6 name="money-check-dollar" size={24} color="black" />
                        <Text style={styles.text}>Compras</Text>
                    </View>
                    <View style={{alignItems: 'center',}}>
                        <FontAwesome5 name="inbox" size={24} color="black" />
                        <Text style={styles.text}>{stock}</Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 100}}>
                <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-around', }}>
                    <View style={{alignItems: 'center',}}>
                        <Text style={styles.title}>{purchase_price}</Text>
                        <Text style={styles.subtitle}>Precio compra</Text>
                    </View>
                    <View style={{alignItems: 'center',}}>
                        <Text style={styles.title}>{sale_price}</Text>
                        <Text style={styles.subtitle}>Precio venta</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxIcon: {
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: '#ededed',
        elevation: 1,
        shadowColor: '#ededed',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
    }
})

export default TitleProductComponent;