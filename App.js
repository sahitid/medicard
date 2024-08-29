import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import NavigationContainer from "./node_modules/@react-navigation/native/lib/module/NavigationContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    /*<View className="flex-1 justify-center items-center bg-gray-300">
      <Text className="text-5xl">MEDICARD</Text>
      <Pressable onPress={() => alert("YOU PRESSED BUTTON")}>
        <Text>COOL button</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
    */
  );
}
