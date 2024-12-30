import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import OrdersScreen from ".";

const Tab = createMaterialTopTabNavigator();

// const OrdersScreen = () => (
//   <View>
//     <Text>Orders Screen</Text>
//   </View>
// );

const CompletedOrdersScreen = () => (
  <View>
    <Text>Completed Orders Screen</Text>
  </View>
);

const Layout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="index"
          component={OrdersScreen}
          options={{ title: "Active" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
