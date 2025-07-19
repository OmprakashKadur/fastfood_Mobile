import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { email, password, name } = form;

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }
    const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
    if (!isEmailValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createUser({ email, password, name });
      router.replace("/");
    } catch (error: any) {
      const errorMessage = error?.message || "Something went wrong";
      Alert.alert("Sign In Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5 flex-1 ">
      <CustomInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
        keyboardType="default"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
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
        title={"Sign Up"}
        isLoading={isSubmitting}
        onPress={submit}
      />
      <View className="flex  justify-center mt-5 flex-row gap-2">
        <Text>Already have an account?</Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
