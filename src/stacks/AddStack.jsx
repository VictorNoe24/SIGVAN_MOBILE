import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import CategoryScreen from "../screens/options/category/CategoryScreen";
import ProductScreen from "../screens/options/product/ProductScreen";
import AddCategoryScreen from "../screens/options/category/AddCategoryScreen";

const Stack = createStackNavigator();

const AddStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AllCategory"
                component={CategoryScreen}
                options={{
                    headerTitle: 'Categorias', headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name="AllProduct"
                component={ProductScreen}
                options={{
                    headerTitle: 'Productos',
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name="AddCategoryForm"
                component={AddCategoryScreen}
                options={{
                    headerTitle: 'Agregar Categoria', headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name="AddProductForm"
                component={AddCategoryScreen}
                options={{
                    headerTitle: 'Agregar Producto', headerTitleAlign: "center"
                }}
            />
        </Stack.Navigator>
    )
};

export default AddStack;