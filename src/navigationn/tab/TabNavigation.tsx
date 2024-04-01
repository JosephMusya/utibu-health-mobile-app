import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import React from "react";
import DashboardScreen from "../../screens/DashboardScreen";
import OrdersScreen from "../../screens/OrdersScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { color, fontSize } from "../../constants/theme/theme";
import { FontAwesome } from "@expo/vector-icons";
import ProfileCard from "../../components/ui/ProfileCard";
import { useDosageContext } from "../../providers/DosageProvider";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { userProfile } = useDosageContext();
  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        tabBarActiveTintColor: color.primaryColor,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: color.primaryColor,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.Heading3.fontSize,
        },
      }}
    >
      <Tab.Screen
        initialParams={{}}
        name="DashboardScreen"
        component={DashboardScreen}
        options={({ navigation }) => ({
          title: "Stock",
          tabBarIcon: ({ color }) => (
            <AntDesign name="medicinebox" size={24} color={color} />
          ),
          headerRight: ({}) => (
            <FontAwesome
              name="cart-plus"
              size={24}
              color="#fff"
              style={{ paddingRight: 20 }}
              onPress={() => {
                navigation.navigate("CartScreen");
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        initialParams={{}}
        name="OrderScreen"
        component={OrdersScreen}
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-bag" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        initialParams={{}}
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          headerTitle: ({}) => <ProfileCard user={userProfile?.username} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
