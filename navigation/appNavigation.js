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
import SongScreen from '../screens/SongScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { useContext } from 'react';
import AuthContext from '../auth.user';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();


const HomeStack = () => {
   
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown:false}}>
       <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="AddKpop" component={AddKpopScreen} />
      <Stack.Screen options={{headerShown:false}} name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen options={{headerShown:false}} name="Detail" component={DetailScreen} />
      <Stack.Screen options={{headerShown:false}} name="Album" component={AlbumScreen} />
    </Stack.Navigator>
  )
}

export default function AppNavigation() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
  {isAuthenticated ? (
        <Tab.Navigator screenOptions={{headerShown:false}}>
          <Tab.Screen name="Home" component={HomeStack} />
          {/* Only render the SongScreen if the user is authenticated */}
          <Tab.Screen name="Search" component={SongScreen} />
        </Tab.Navigator>
      ) : (
        <HomeStack />
      )}

  </NavigationContainer>
  );
}