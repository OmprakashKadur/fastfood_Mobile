import { CustomInputProps } from "@/type";
import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import cn from "clsx";
const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocussed, setIsFocussed] = useState(false);
  return (
    <View>
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onFocus={() => {
          setIsFocussed(true);
        }}
        onBlur={() => {
          setIsFocussed(false);
        }}
        placeholderTextColor={"#888"}
        className={cn(
          "input",
          isFocussed ? "border-primary" : "border-gray-300"
        )}
      />
    </View>
  );
};

export default CustomInput;
