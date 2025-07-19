import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Redirect, Slot, Tabs } from "expo-router";
import React from "react";
import { View, Image, Text } from "react-native";
import cn from "clsx";
import { Profile } from './../../node_modules/@sentry/core/build/types-ts3.8/types-hoist/profiling.d';
const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#ef8c00" : "#5D5F6D"}
    />
    <Text
      className={cn(
        "text-sm font-bold",
        focused ? "text-primary" : "text-gray-200"
      )}
    >
      {title}
    </Text>
  </View>
);
export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();
  console.log("Redirecting");
  if (!isAuthenticated) {
    console.log("Redirecting to /sign-in");
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          bottom: 40,
          position: "absolute",
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />
     
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.person} title="Profile" />
          ),
        }}
      />
      
      {/* <Slot />; */}
    </Tabs>
  );
}
