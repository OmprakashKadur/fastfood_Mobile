import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignIn = () => {
  const router = useRouter();
  return (
    <View>
      <Text>SignIn</Text>
      <Button
        title="Sign Up"
        onPress={() => {
          router.push("/sign-up");
        }}
      />
    </View>
  );
};

export default SignIn;
