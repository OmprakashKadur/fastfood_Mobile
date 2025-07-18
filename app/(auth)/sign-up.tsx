import { useRouter } from 'expo-router';
import React from 'react'
import { View,Text ,Button} from 'react-native'

const SignUp = () => {
    const router = useRouter();
  return (
    <View>
     <Text>Sign UP</Text>
         <Button
             title="Sign In"
             onPress={() => {
               router.push("/sign-up");
             }}
           />
    </View>
  )
}

export default SignUp
