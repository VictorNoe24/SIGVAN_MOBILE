import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';  // Importa ImagePicker
import { LOGGER } from "../../../utils/env";
import InputComponent from "../../../components/InputComponent";
import { validateInteger, validateName, validatePrice } from "../../../utils/validate";
import ButtonComponent from "../../../components/ButtonComponent";
import { SelectList } from "react-native-dropdown-select-list";
import { getAllCategoriesModel } from "../../../db/apis/API_CATEGORY";
import { ToastModal } from "../../../utils/Alerts";
import {insertPhotos, insertProducts} from "../../../db/apis/API_PRODUCTS";
import { useNavigation } from "@react-navigation/native";

const AddProductScreen = () => {
    const navigation = useNavigation();
    const [nameProduct, setNameProduct] = useState(null);
    const [description, setDescription] = useState(null);
    const [purchasePrice, setPurchasePrice] = useState(null);
    const [salePrice, setSalePrice] = useState(null);
    const [stock, setStock] = useState(null);
    const [idCategory, setIdCategory] = useState(null);
    const [imagesProducts, setImagesProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stateButton, setStateButton] = useState(false);

    const initialInput = (typeVar, functions) => {
        if ( typeVar !== null ) {
            return functions(typeVar)
        }
        return true;
    }

    const generateBarCode = (name) => {
        let code = name ? name.split('').map(char => char.charCodeAt(0)).join('') : '';
        return code.substring(0, 12);
    };

    const getCategories = async () => {
        try {
            const data = await getAllCategoriesModel();
            setCategories(data);
        } catch (e) {
            LOGGER.error("Error getCategories: ", e);
        }
    };

    const registerProduct = async () => {
        setStateButton(true);
        const barCodeGenerated = generateBarCode(nameProduct);
        const data = {
            nameProduct,
            description,
            purchasePrice,
            salePrice,
            stock,
            barCode: barCodeGenerated,
            idCategory
        }

        try {
            LOGGER.info(data)
            for (const key in data) {
                if (data[key] === null || data[key] === undefined || data[key] === '') {
                    LOGGER.error(`Error: ${key} está vacío o es nulo`);
                    return ToastModal('Campos incompletos', 'Llena todo el formulario', 'DANGER');
                }
            }

            const response = await insertProducts(data);
            if (response.lastInsertRowId !== undefined) {
                const result = await insertPhotos(response.lastInsertRowId, imagesProducts);
                if (result) {
                    ToastModal('Agregado', 'Producto agregado correctamente', 'SUCCESS');
                    navigation.navigate("AddStack", {
                        screen: 'AllProduct',
                    });
                }
            }
        } catch (e) {
            LOGGER.error("Error creando producto", e);
        } finally {
            setStateButton(false);
        }
    };

    const pickImage = async () => {
        if (imagesProducts.length >= 6) {
            ToastModal('Límite alcanzado', 'No puedes agregar más de 6 imágenes', 'WARNING');
            return;
        }

        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            return ToastModal('Permiso denegado', 'Se necesita acceso a la biblioteca de imágenes', 'DANGER');
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setImagesProducts([...imagesProducts, pickerResult.assets[0].uri]);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <ScrollView style={{ width: '100%', height: '100%', backgroundColor: '#fff', padding: 17 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <InputComponent
                    titleLeft={'Nombre del producto'}
                    type={'text'}
                    placeholder={'Ingresa el nombre del producto'}
                    name={nameProduct}
                    isName={setNameProduct}
                    validate={() => initialInput(nameProduct, validateName)}
                    errorMessage={'El o los nombres solo deben contener letras.'}
                />
                <InputComponent
                    titleLeft={'Descripción'}
                    type={'text'}
                    placeholder={'Ingresa una decripción del producto'}
                    name={description}
                    isName={setDescription}
                    validate={() => initialInput(description, validateName)}
                    errorMessage={'El o los nombres solo deben contener letras.'}
                />
                <InputComponent
                    titleLeft={'Precio de compra'}
                    type={'text'}
                    keyboardType={'numeric'}
                    placeholder={'Ingresa el precio de compra'}
                    name={purchasePrice}
                    isName={setPurchasePrice}
                    validate={() => initialInput(purchasePrice, validatePrice)}
                    errorMessage={'El o los nombres solo deben contener letras.'}
                />
                <InputComponent
                    titleLeft={'Precio de venta'}
                    type={'text'}
                    keyboardType={'numeric'}
                    placeholder={'Ingresa el precio de venta'}
                    name={salePrice}
                    isName={setSalePrice}
                    validate={() => initialInput(salePrice, validatePrice)}
                    errorMessage={'El o los nombres solo deben contener letras.'}
                />
                <InputComponent
                    titleLeft={'Stock'}
                    type={'text'}
                    keyboardType={'numeric'}
                    placeholder={'Ingresa el número de stock del producto'}
                    name={stock}
                    isName={setStock}
                    validate={() => initialInput(stock, validateInteger)}
                    errorMessage={'El stock debe ser un número entero válido.'}
                />

                <Text style={styles.text_1}>Categorías</Text>
                <SelectList
                    setSelected={(val) => setIdCategory(val)}
                    data={categories}
                    save="key"
                    boxStyles={styles.box}
                    dropdownStyles={{ marginBottom: 26, marginTop: -26 }}
                    placeholder={"Seleccionar categoría"}
                />

                <Text style={styles.text_1}>Imagenes</Text>
                <ScrollView
                    horizontal={true} s
                    style={styles.imageContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {imagesProducts.map((image, index) => (
                        <Image borderRadius={16} key={index} source={{ uri: image }} style={styles.image} />
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                        <Text style={styles.addButtonText}>Agregar Imagen</Text>
                    </TouchableOpacity>
                </ScrollView>


                <ButtonComponent
                    text={'Registrar'}
                    disable={stateButton}
                    func={registerProduct}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    box: {
        width: '100%',
        marginBottom: 26,
        marginTop: 12,
        borderColor: '#9CA1A4',
    },
    text_1: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'stretch',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 12,
        marginBottom: 26,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    addButton: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
    },
    addButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default AddProductScreen;
