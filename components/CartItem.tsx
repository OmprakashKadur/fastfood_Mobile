import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {images} from "@/constants";

const CartItem = ({ item }: { item: CartItemType }) => {

    return (
        <View className="cart-item">
           
        </View>
    );
};

export default CartItem;
