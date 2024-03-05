import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddKpopScreen from '../screens/AddKpopScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailScreen from '../screens/DetailScreen';
import AlbumScreen from '../screens/AlbumScreen';
import MusicPlayerScreen from '../screens/MusicPlayerScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="AddKpop" component={AddKpopScreen} />
      <Stack.Screen options={{headerShown:false}} name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen options={{headerShown:false}} name="Detail" component={DetailScreen} />
      <Stack.Screen options={{headerShown:false}} name="Album" component={AlbumScreen} />
      <Stack.Screen options={{headerShown:false}} name="MusicPlayer" component={MusicPlayerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}