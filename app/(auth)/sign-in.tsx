import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const submit = async () => {
      const { email, password } = form;

    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter valid email & password required");
      return;
    }
    setIsSubmitting(true);
    try {
       await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="default"
      />
      <CustomInput
        placeholder="Enter password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        keyboardType="default"
        secureTextEntry={true}
      />
      <CustomButton
        title={"Sign In"}
        isLoading={isSubmitting}
        onPress={submit}
      />
      <View className="flex  justify-center mt-5 flex-row gap-2">
        <Text>Don&apos;t have an account?</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
