import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import CategoryScreen from "../screens/category/CategoryScreen";
import ProductScreen from "../screens/products/ProductScreen";
import AddCategoryScreen from "../screens/category/AddCategoryScreen";
import AddProductScreen from "../screens/products/AddProductScreen";

const Stack = createStackNavigator();

const AddStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AllCategory"
                component={CategoryScreen}
                options={{
                    headerTitle: 'Categorías', headerTitleAlign: "center"
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
                    headerTitle: 'Agregar Categoría', headerTitleAlign: "center"
                }}
            />
            <Stack.Screen
                name="AddProductForm"
                component={AddProductScreen}
                options={{
                    headerTitle: 'Agregar Producto', headerTitleAlign: "center"
                }}
            />
        </Stack.Navigator>
    )
};

export default AddStack;