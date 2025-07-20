import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import Searchbar from "@/components/Searchbar";

import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query }: any = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const {
    data: menuItems,
    refetch,
    loading,
  } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 10,
    },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    if (category || query) {
      refetch({
        category,
        query,
        limit: 10,
      });
    }
  }, [category, query]);
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => item.$id || index.toString()}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="base-bold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <Searchbar />
            <Filter categories={categories as Category} />
          </View>
        )}
        ListEmptyComponent={() => (!loading ? <Text>No Results</Text> : null)}
      />
    </SafeAreaView>
  );
};

export default Search;
