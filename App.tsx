import 'react-native-url-polyfill/auto';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Session} from '@supabase/supabase-js';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import Auth from './screens/AuthScreen';
import {supabase} from './supabase';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import {store} from './store';
import SettingsScreen from './screens/SettingsScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
            {session && session.user ? (
              <Stack.Navigator>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SettingsScreen"
                  options={{headerShown: false}}>
                  {() => (
                    <SettingsScreen key={session.user.id} session={session} />
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            ) : (
              <Auth />
            )}
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
