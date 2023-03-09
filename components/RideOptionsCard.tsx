import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: 'motor-ab4323de',
    title: 'Yanto Basreng',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'motor-ab2223de',
    title: 'Munah Munirin',
    multiplier: 1.3,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'motor-ab4324je',
    title: 'Sunaryo Itiqad',
    multiplier: 1.5,
    image: 'https://links.papareact.com/3pn',
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<any>(null);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}>
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Pilih Tumpangan</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, image, multiplier}, item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id ? 'bg-gray-200' : ''
            }`}>
            <Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={{uri: image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>2 mins</Text>
            </View>
            <Text style={tw`text-xl`}>$99</Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-1 m-3 ${!selected ? 'bg-gray-300' : ''}`}>
          <Text style={tw`text-center text-white text-xl`}>
            Pilih {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
