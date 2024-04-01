import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token: string, key: string): Promise<null> => {
  AsyncStorage.setItem(token, key);
  return null;
};

export const getToken = async (key: string) => {
  const token = await AsyncStorage.getItem(key);
  //   if (token) {
  //     return token;
  //   } else {
  //     return null;
  //   }
  return token;
};

export const removeToken = async (key: string): Promise<null> => {
  AsyncStorage.removeItem(key);
  return null;
};
