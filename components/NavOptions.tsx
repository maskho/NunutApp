import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectOrigin} from '../slices/navSlice';

const data = [
  {
    id: '100',
    title: 'Cari tumpangan',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '101',
    title: 'Titipin barang',
    image: 'https://links.papareact.com/28w',
    screen: 'DeliveryScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation<any>();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            disabled={!origin}>
            <View style={tw`${!origin ? 'opacity-20' : ''}`}>
              <Image
                style={{width: 120, height: 120, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text style={tw`mt-2 text-base font-semibold`}>{item.title}</Text>
              <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                type="antdesign"
                name="arrowright"
                color="white"
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavOptions;
