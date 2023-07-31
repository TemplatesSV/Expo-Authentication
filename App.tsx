import { Routes } from "./src/routes";
import { AuthProvider } from "./src/shared/contexts/Auth";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
