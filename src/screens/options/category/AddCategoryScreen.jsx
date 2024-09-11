import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import InputComponent from "../../../components/InputComponent";
import {validateName} from "../../../utils/validate";
import ButtonComponent from "../../../components/ButtonComponent";
import {insertCategory} from "../../../db/apis/API_CATEGORY";
import {LOGGER} from "../../../utils/env";
import {useNavigation} from "@react-navigation/native";
import {ToastModal} from "../../../utils/Alerts";

const AddCategoryScreen = () => {

    const navigation = useNavigation();
    const [nameCategory, setNameCategory] = useState(null)
    const [stateButton, setStateButton] = useState(false)

    const initialInput = (typeVar, functions) => {
        if ( typeVar !== null ) {
            return functions(typeVar)
        }
        return true;
    }

    const registerCategori = async () => {
        try {
            if (!validateName(nameCategory)) {
                return ToastModal('ERROR', 'Llena todos los campos','DANGER');
            }
            setStateButton(true)
            const response = await insertCategory(nameCategory);
            LOGGER.info(response.lastInsertRowId)
            if (response.lastInsertRowId !== undefined) {
                ToastModal('Agregado','Categoria agregada correctamente');
                navigation.navigate("AddStack", {
                    screen: 'AllCategory',

                })
            }
        } catch (e) {
            LOGGER.error(e);
            ToastModal('ERROR', 'No se pudo agregar la categoria','DANGER');
        } finally {
            setStateButton(false)
        }
    }

    return(
        <ScrollView
            style={{width:'100%', height:'100%', backgroundColor: '#fff', padding: 17}}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <InputComponent
                    titleLeft={'Nombre de la categoria'}
                    type={'text'}
                    placeholder={'Ingresa el nombre de la categoria'}
                    name={nameCategory}
                    isName={setNameCategory}
                    validate={() => initialInput(nameCategory, validateName)}
                    errorMessage={'El o los nombres solo deben contener letras.'}
                />
                <ButtonComponent
                    text={'Registrar'}
                    disable={stateButton}
                    func={()=> registerCategori()}
                />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
});

export default AddCategoryScreen;