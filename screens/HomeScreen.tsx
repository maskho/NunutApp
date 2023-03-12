import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsScreen')}
          style={tw`bg-gray-100 absolute z-50 p-3 rounded-full shadow-lg top-16 right-8`}>
          <Icon name="menu" />
        </TouchableOpacity>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{uri: 'https://madras.id/logo-title.png'}}
        />
        <GooglePlacesAutocomplete
          placeholder="Dari mana?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'id',
          }}
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry?.location,
                description: data.description,
              }),
            );

            dispatch(setDestination(null));
          }}
          enablePoweredByContainer={false}
          minLength={3}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
