import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#9c217dff",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "MyOrders") {
            iconName = focused ? "bag" : "bag-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Animatable.View
              animation={focused ? "rubberBand" : "fadeInDown"}
              duration={500}
              easing="ease-in-out"
              style={{ alignItems: "center" }}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </Animatable.View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
