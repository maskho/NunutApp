import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination} from '../slices/navSlice';
import {useNavigation} from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import {Icon} from '@rneui/themed';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning fellas!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={3}
            placeholder="Mau kemana?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'id',
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data.description,
                }),
              );
              navigation.navigate('RideOptionsCard');
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tw`flex flex-row justify-between bg-black w-30 px-4 rounded-full py-3 `}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Nebeng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 rounded-full py-3`}>
          <Icon name="briefcase" type="ionicon" color="black" size={16} />
          <Text style={tw` text-center`}>Titip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {paddingHorizontal: 20, paddingBottom: 0},
});
