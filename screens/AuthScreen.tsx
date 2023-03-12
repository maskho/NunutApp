import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from '../supabase';
import {Input} from '@rneui/themed';
import tw from 'twrnc';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View
        style={[tw`flex-1 items-center justify-center p-8 w-full max-w-sm`]}>
        <View style={tw`flex flex-col items-center`}>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain',
            }}
            source={require('./../assets/images/nunut-white.png')}
          />
        </View>
        <View style={tw`mb-4 w-full bg-white rounded-md h-12 px-6 text-black`}>
          <Input
            leftIcon={{type: 'materialdesign', name: 'mail'}}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email"
            autoCapitalize={'none'}
          />
        </View>
        <View style={tw`mb-8 w-full bg-white rounded-md h-12 px-6 text-black`}>
          <Input
            leftIcon={{type: 'materialdesign', name: 'lock'}}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TouchableOpacity
            onPress={() => signInWithEmail()}
            disabled={loading}
            style={tw`h-12 border-2 border-white rounded-md flex flex-row justify-center items-center px-6 ${
              loading ? 'bg-gray-300' : ''
            }`}>
            <Text style={tw`text-center text-white text-xl`}>Masuk</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verticallySpaced}>
          <TouchableOpacity
            disabled={loading}
            onPress={() => signUpWithEmail()}
            style={tw`h-12 border-2 border-white rounded-md flex flex-row justify-center items-center px-6 ${
              loading ? 'bg-gray-300' : ''
            }`}>
            <Text style={tw`text-center text-white text-xl`}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
