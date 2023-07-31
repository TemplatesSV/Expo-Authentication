import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Screen, Navigator } = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Navigator>
      {/* 
        Screen Example
        
        <Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ color }}>Home </Text>
            ),
          }}
        /> 
      */}
    </Navigator>
  );
}
