import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import CategoryScreen from "../screens/options/category/CategoryScreen";
import ProductScreen from "../screens/options/product/ProductScreen";

const Stack = createStackNavigator();

const AddStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllCategory" component={CategoryScreen} options={{headerTitle: 'Categorias'}}/>
            <Stack.Screen name="AllProduct" component={ProductScreen} options={{headerTitle: 'Productos'}}/>
        </Stack.Navigator>
    )
};

export default AddStack;