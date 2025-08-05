import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import IntroScreen from "./screens/IntroScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SearchScreen from "./screens/SearchScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import AddProductScreen from "./screens/AddProductScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ShopNow from "./screens/ShopNow";

import Terms from "./Profile/Terms";
import Privacy from "./Profile/Privacy";
import ChatSupport from "./Profile/ChatSupport";
import AboutUs from "./Profile/AboutUs";

import TabNavigator from "./navigation/TabNavigator";

import { ProductProvider } from "./context/ProductContext";
import CheckoutScreen from "./screens/CheckOutScreen";
import CardPaymentScreen from "./screens/CardPaymentScreen";
import CODPaymentScreen from "./screens/CODPaymentScreen";

const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    Helvetica: require("./assets/fonts/Helvetica.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ProductProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="ShopNow" component={ShopNow} />
          <Stack.Screen name="CheckOut" component={CheckoutScreen} />
          <Stack.Screen
            name="CardPayment"
            component={CardPaymentScreen}
            screenOptions={{ headerShown: true }}
          />
          <Stack.Screen
            name="CODPayment"
            component={CODPaymentScreen}
            screenOptions={{ headerShown: true }}
          />

          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="ChatSupport" component={ChatSupport} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
