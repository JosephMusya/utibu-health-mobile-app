import { createContext, useContext, useEffect, useState } from "react";
import {
  CartCreationType,
  CartItems,
  Dose,
  GenericError,
  OrderType,
  Prescription,
  UserType,
} from "../types";
import { getToken, storeToken } from "../utils/token";
// import {API_URL} from 'react-native-dotenv';
interface DosageContextType {
  addToCart?: (id: string) => Promise<void>;
  getCarts?: () => Promise<void>;
  getOrders?: () => Promise<void>;
  getProfile?: (token: string) => Promise<void>;
  createOrder?: ({
    cartItem,
    deliveryMethod,
    payment,
    user,
    paid,
    status,
    navigation,
  }: CartCreationType) => Promise<void>;
  deleteCartItem?: ({ id }: { id: string }) => Promise<void>;
  updateCart?: ({ id, qty }: { id: string; qty: number }) => Promise<void>;
  loginUser?: (
    username: UserType["username"],
    password: string,
    navigation?: any
  ) => Promise<void>;
  cartItems?: CartItems[];
  loadingCart?: boolean;
  createErr?: boolean;
  loadingOrders?: boolean;
  updateCartLoading?: boolean;
  placingOrder?: boolean;
  orderErr?: boolean;
  orders?: OrderType[];
  loginLoading?: boolean;
  loginErr?: GenericError | null;
  userProfile?: UserType;
}

export const DoseContext = createContext<DosageContextType>({});

export const DoseProvider = ({ children }: any) => {
  const [adding, setAdding] = useState<boolean>(false);
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [updateCartLoading, setUpdatingCartLoading] = useState<boolean>(false);
  const [placingOrder, setPlacingOrder] = useState<boolean>(false);
  const [createErr, setCreateErr] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginErr, setLoginErr] = useState<GenericError | null>();
  const [userProfile, setUserProfile] = useState<UserType>();

  const API_URL: string = "http://192.168.0.102:8000";

  const updateCart = async ({ id, qty }: { id: string; qty: number }) => {
    console.log({ qty });
    try {
      setUpdatingCartLoading(true);
      const updateItem = await fetch(`${API_URL}/my-cart/${id}/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: qty,
        }),
      });
    } catch (error) {
    } finally {
      setUpdatingCartLoading(false);
      getCarts();
    }
  };

  const createOrder = async ({
    cartItem,
    user,
    deliveryMethod,
    payment,
    paid,
    status,
    navigation,
  }: CartCreationType) => {
    console.log({ deliveryMethod });
    try {
      setCreateErr(false);
      const placeOrder = await fetch(`${API_URL}/orders/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_item: cartItem,
          user: user,
          delivery_method: deliveryMethod,
          paid: paid,
          payment: payment,
          status: status,
        }),
      });
      if (placeOrder.ok) {
        console.log("Created...");
        setCreateErr(false);
        navigation.navigate("OrderScreen");
      } else {
        setCreateErr(true);
        console.log("Failed...NN");
      }
    } catch (error) {
      setCreateErr(true);
      console.log("Failed NET");
    } finally {
      getOrders();
      getCarts();
      setPlacingOrder(false);
    }
  };

  const deleteCartItem = async ({ id }: { id: string }) => {
    try {
      const removeItem: Response = await fetch(`${API_URL}/my-cart/${id}/`, {
        method: "delete",
      });

      if (removeItem.ok) {
        const updatedCartItems: CartItems[] | undefined = cartItems?.filter(
          (item) => item.id !== id
        );
        setCartItems([...updatedCartItems]);
      } else {
      }
    } catch (error) {}
  };

  const getCarts = async () => {
    try {
      const getDoseCart: Response = await fetch(`${API_URL}/my-cart`, {
        method: "get",
      });

      if (getDoseCart.ok) {
        const cart = await getDoseCart.json();
        setCartItems(cart);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart = async (id: string) => {
    try {
      setAdding(true);
      // console.log("Adding...");
      const addItemToCart = await fetch(`${API_URL}/my-cart/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "mucia",
          dosage: id,
        }),
      });
      if (addItemToCart.ok) {
        const res = await addItemToCart.json();
        console.log(res);
      }
    } catch (error) {
    } finally {
      setAdding(false);
      // RED FLAG
      getCarts();
    }
  };

  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [orderErr, setOrderErr] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderType[]>([]);

  const getOrders = async () => {
    try {
      setOrderErr(false);
      setLoadingOrders(true);
      const retrieveOrders: Response = await fetch(`${API_URL}/orders`);
      if (retrieveOrders.ok) {
        const orders: OrderType[] = await retrieveOrders.json();
        setOrders(orders);
      }
    } catch (error) {
      setOrderErr(true);
    } finally {
      setLoadingOrders(false);
    }
  };

  const getProfile = async (token: string | null) => {
    try {
      const userProfile = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userProfile.ok) {
        const profile: UserType[] = await userProfile.json();
        setUserProfile(profile[0]);
      }
    } catch (err) {
    } finally {
    }
  };

  const loginUser = async (
    username: UserType["username"],
    password: string,
    navigation: any
  ) => {
    setLoginLoading(true);
    try {
      const getToken = await fetch(`${API_URL}/token/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password,
        }),
      });

      if (getToken.ok) {
        const token = await getToken.json();
        const accessToken = token.access;
        getProfile(accessToken);
        storeToken(accessToken, "token").then(
          navigation.navigate("HomeScreen")
        );
        console.log(accessToken);
        setLoginErr(null);
        // save token
      } else {
        const error = await getToken.json();
        setLoginErr(error);
      }
    } catch (error) {
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
    getToken("token").then((token) => {
      getProfile(token);
    });
  }, []);

  return (
    <DoseContext.Provider
      value={{
        addToCart,
        getCarts,
        deleteCartItem,
        updateCart,
        getOrders,
        createOrder,
        loginUser,
        userProfile,
        loginErr,
        loginLoading,
        createErr,
        orderErr,
        orders,
        cartItems,
        loadingCart,
        loadingOrders,
        updateCartLoading,
        placingOrder,
      }}
    >
      {children}
    </DoseContext.Provider>
  );
};

export function useDosageContext() {
  const context = useContext(DoseContext);
  return context;
}
