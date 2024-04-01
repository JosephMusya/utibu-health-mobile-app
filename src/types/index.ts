import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import { StyleProp, TextStyle } from "react-native";

export type RegisterForm = {
  username: string;
  address: string;
  password1: any;
  password2: any;
};

export type RegisterFormik = FormikProps<RegisterForm>;

export interface InputType {
  placeholder?: string;
  borderColor?: string;
  hidden?: boolean;
  borderWidth?: number;
  padding?: number;
  label?: string;
  errors?: any;
  value?: any;
  onChange?: any;
}

export interface FontType {
  [key: string]: {
    fontSize: number;
    fontWeight?: StyleProp<TextStyle>;
  };
}

export type Screen = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  DashboardScreen: undefined;
  HomeScreen: undefined;
  DosageViewScreen: { prescription: Dose };
  OrdersScreen: undefined;
  ProfileScreen: undefined;
  OrderViewScreen: undefined;
  CartScreen: undefined;
};

export interface Dose {
  image: string;
  name: string;
  price: number;
  qty: number;
  instock: boolean;
  id: string;
  onPress?: () => void;
}

export interface Prescription extends Dose {
  description?: string;
}

export type NavigationProps = NativeStackScreenProps<Screen>;

export interface ColorType {
  [key: string]: string;
}
// export interface ColorType {
//   [key: string]: string;
// }

export type CartType = {
  dosage: any;
  id: string;
  name: string;
  image: string;
  qty: number;
  price: number;
};

export interface CardCard extends CartType {
  onPress?: () => void;
  onDelete?: () => void;
}

export type Order = {
  id: string;
  date?: string;
  status: "Completed" | "In Progress" | "Cancelled";
  total: number;
  payment: "On Delivery" | "On Order";
  collection: "In Pharmacy" | "In Address";
  dose: Prescription[];
  onPress?: () => void;
};

export interface CartItems {
  id: any;
  user: string;
  dosage: Prescription;
  qty: number;
}

export interface OrderType {
  id?: string;
  cart_item: CartItems[];
  user: string;
  delivery_method: "Deliver to my address" | "Pick from pharmacy";
  status: "Completed" | "In Progress" | "Cancelled";
  paid?: boolean;
  created_at?: Date;
  total?: number;
  payment?: "On Order" | "On Delivery";
}

export interface CartCreationType {
  cartItem: string[];
  user: string;
  deliveryMethod: OrderType["delivery_method"] | undefined;
  payment: OrderType["payment"];
  status?: OrderType["status"];
  paid?: boolean;
  navigation?: any;
}

export interface UserType {
  username: string;
  first_name?: string;
  last_name?: string;
  address?: string;
}

export interface UserRegistrationType extends UserType {
  password1: string;
  password2: string;
}

export interface GenericError {
  username?: string[] | null;
  password?: string[] | null;
  detail?: string;
}
