import {
  StatusBar,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen2 from './screens/HomeScreen2';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  console.log('up and running')

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen2} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>

  );
}