import {useState, useEffect} from 'react';
import {supabase} from '../supabase';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Input} from '@rneui/base';
import {Session} from '@supabase/supabase-js';
import Avatar from '../components/Avatar';
import tw from 'twrnc';
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function SettingsScreen({session}: {session: Session}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let {data, error, status} = await supabase
        .from('profiles')
        .select(`username, full_name, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFullname(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    fullname,
    avatar_url,
  }: {
    username: string;
    fullname: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name: fullname,
        avatar_url,
        updated_at: new Date(),
      };

      let {error} = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={tw`h-full`}>
      <View
        style={[tw`flex-1 items-center justify-center p-8 w-full max-w-sm`]}>
        <View>
          <Avatar
            size={200}
            url={avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateProfile({username, fullname, avatar_url: url});
            }}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input label="Email" value={session?.user?.email} disabled />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Nama Pengguna"
            value={username || ''}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Nama Lengkap"
            value={fullname || ''}
            onChangeText={text => setFullname(text)}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TouchableOpacity
            onPress={() =>
              updateProfile({username, fullname, avatar_url: avatarUrl})
            }
            disabled={loading}
            style={tw`h-12 bg-black rounded-md flex flex-row justify-center items-center px-6 ${
              loading ? 'bg-gray-300' : ''
            }`}>
            <Text style={tw`text-center text-white text-xl`}>
              {loading ? 'Memuat ...' : 'Perbarui'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verticallySpaced}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(CommonActions.goBack())}
            style={tw`h-12 bg-black rounded-md flex flex-row justify-center items-center px-6 ${
              loading ? 'bg-gray-300' : ''
            }`}>
            <Text style={tw`text-center text-white text-xl`}>Kembali</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verticallySpaced}>
          <TouchableOpacity
            onPress={() => supabase.auth.signOut()}
            style={tw`h-12 bg-red-700 rounded-md flex flex-row justify-center items-center px-6 ${
              loading ? 'bg-gray-300' : ''
            }`}>
            <Text style={tw`text-center text-white text-xl`}>Keluar</Text>
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
