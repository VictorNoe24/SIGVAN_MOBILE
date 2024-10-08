import React from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {logger} from "react-native-logs";

const log = logger.createLogger();

const ButtonComponent = ({text = "Text Buttom", disable, func = ()=>{log.info('No me has puesto nombre culo')} }) => {
    return (
        <>
            <TouchableOpacity
                style={{width:'100%'}}
                disabled={disable}
                onPress={func}
            >
                <View style={styles.button}>
                    { !disable ? (
                        <Text style={styles.text}>{text}</Text>
                    ) : (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.text}>Cargando </Text>
                            <ActivityIndicator color="#fff"/>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#FF520D',
        padding: 10,
        height: 44,
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
})
export default ButtonComponent;