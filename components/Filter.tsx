import { Category } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";
import cn from "clsx";
const Filter = ({ categories }: { categories: Category[] }) => {
  const searchparams = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchparams.category || ""
  );
  const handlePress = (id: string) => {
    setActiveCategory(id);
    router.setParams({ category: id === "all" ? undefined : id });
  };

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];
  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={item.$id}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          className={cn(
            "filter",
            activeCategory === item.$id ? "bg-amber-500" : "bg-white"
          )}
          onPress={() => handlePress(item.$id)}
        >
          <Text
            className={cn(
              "body-medium",
              activeCategory === item.$id ? "text-white" : "text-gray-200"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
