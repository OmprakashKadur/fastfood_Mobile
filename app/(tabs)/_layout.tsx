import { Redirect, Slot } from "expo-router";
import React from "react";

export default function _Layout() {
  const isAuthenticated = true;
  console.log("Redirecting");
  if (!isAuthenticated) {
    console.log("Redirecting to /sign-in");
    return <Redirect href="/sign-in" />;
  }
  return <Slot />;
}
