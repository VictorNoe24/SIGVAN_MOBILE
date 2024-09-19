import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import InputImageComponent from "../../components/InputImageComponent";
import {validateAddress, validateCountry, validateName} from "../../utils/validate";
import {LOGGER} from "../../utils/env";
import {ToastModal} from "../../utils/Alerts";
import Checkbox from "expo-checkbox";
import {registerAPI} from "../../db/apis/API_AUTH";
import {useNavigation} from "@react-navigation/native";

const RegisterCompanyScreen = ({id}) => {

    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [country, setCountry] = useState(null)
    const [address, setAddress] = useState(null)
    const [check, setCheck] = useState(false)
    const [state, setState] = useState(false)

    const navigation= useNavigation();

    const insertCompany = async () => {
        try {
            setState(true)
            if(!check || name === null || country === null || address === null || image === null) {
                return ToastModal('Alerta', 'No se a podido registrar la empresa','WARNING');
            }
            const response  = await registerAPI();
            if ( response !== undefined && response != null ) {
                ToastModal('Registrado', 'Se a registrado tus datos','SUCCESS')
                return navigation.navigate({screen: 'SignIn'});
            }

        } catch (e) {
            LOGGER.error(e);
        } finally {
            setState(false)
        }
    }
    
    const initialInput = (typeVar, functions) => {
        if ( typeVar !== null ) {
            return functions(typeVar)
        }
        return true;
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Ahora difundamos tu marca</Text>
                    <Text style={styles.subtitle}>Aquí capturaremos los datos de tu marca o empresa para poder identificarla</Text>
                    <InputImageComponent
                        image={image}
                        setImage={setImage}
                    />
                    <InputComponent
                        titleLeft={'Nombre de la marca o empresa'}
                        placeholder={'example@example.com'}
                        name={name}
                        isName={setName}
                        validate={()=>initialInput(name, validateName)}
                        errorMessage={'Ingresa el nombre de la marca o empresa'}
                    />
                    <InputComponent
                        titleLeft={'Pais'}
                        placeholder={'Ingresa tu país'}
                        name={country}
                        isName={setCountry}
                        validate={()=>initialInput(country, validateCountry)}
                        errorMessage={'Ingresa tu pais'}
                    />
                    <InputComponent
                        titleLeft={'Dirección'}
                        placeholder={'Calle 123, Edificio A, Departamento 4B'}
                        name={address}
                        isName={setAddress}
                        validate={()=>initialInput(address, validateAddress)}
                        errorMessage={'Ingresa tu dirección de la empresa o marca'}
                    />
                    <View style={styles.section}>
                        <Checkbox
                            style={styles.checkbox}
                            value={check}
                            onValueChange={setCheck}
                            color={check ? '#FF520D' : undefined}
                        />
                        <Text style={styles.paragraph} onPress={()=>LOGGER.info('Hola')}>Acepto términos y condiciones</Text>
                    </View>
                    <ButtonComponent
                        text={'Registrar'}
                        disable={state}
                        func={()=>insertCompany()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 20,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 26,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF520D',
        textDecorationLine: 'underline',
        textDecorationColor: '#FF520D',
    },
    checkbox: {
        margin: 8,
    },
})

export default RegisterCompanyScreen;