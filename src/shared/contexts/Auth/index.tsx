import { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserDataById } from "../../services/User/view.service";
import api from "../../services";

import { IAuth } from "../../interfaces/AuthData";
import { IUser } from "../../interfaces/UserData";

interface AuthContextProps {
  logout: () => Promise<void>;
  login: (data: IAuth) => Promise<AxiosResponse>;
  user?: IUser;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>();
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("Id");
      const token = await AsyncStorage.getItem("BearerToken");

      if (id && token) {
        getUserDataById(id)
          .then((res) => {
            setUser({
              name: res.data.retorno.nome,
              sobrenome: res.data.retorno.sobrenome,
              id: res.data.retorno.id,
            });

            setIsAuthenticated(true);

            navigation.navigate("Home");
          })
          .catch(() => {
            logout();
          });
      }
    })();
  }, []);

  const login = async ({ usuario, senha }: IAuth) => {
    const requestLogin = await api.post("autenticacao", {
      usuario,
      senha,
    });

    if (requestLogin.status === 200) {
      const token = requestLogin.data.token;
      const id = requestLogin.data.userData.id;

      await AsyncStorage.setItem("BearerToken", token);

      await AsyncStorage.setItem("Id", id);

      setUser({
        name: requestLogin.data.userData.nome,
        sobrenome: requestLogin.data.userData.sobrenome,
        id: requestLogin.data.userData.id,
      });

      setIsAuthenticated(true);
    }

    return requestLogin;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("BearerToken");
    await AsyncStorage.removeItem("Id");

    setIsAuthenticated(false);

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <AuthContext.Provider value={{ logout, user, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
