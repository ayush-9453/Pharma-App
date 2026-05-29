import { Feather, Foundation,AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8e8e93",
        }}
      >
        <Tabs.Screen
          name="doctor"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="product"
          options={{
            title: "Products",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="product" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="request"
          options={{
            title: "Requests",
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
