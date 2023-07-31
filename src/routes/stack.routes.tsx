import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerTitle: "" }}>
      {/* 
        Screen Example
        <Screen name="Login" component={Login} options={{ headerShown: false }} /> 
      */}
    </Navigator>
  );
}
