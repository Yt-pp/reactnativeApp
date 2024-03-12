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
// import LibraryScreen from '../screens/LibraryScreen';
import SongScreen from '../screens/SongScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import AuthContext from '../auth.user';
import { Dimensions, View } from 'react-native';
import { HomeIcon, MagnifyingGlassIcon, MusicalNoteIcon } from 'react-native-heroicons/solid';
import LibraryScreen from '../screens/LibraryScreen';

const { width, height } = Dimensions.get("window")
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();


const HomeStack = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="AddKpop" component={AddKpopScreen} />
      <Stack.Screen options={{ headerShown: false }} name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Detail" component={DetailScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Album" component={AlbumScreen} />
    </Stack.Navigator>
  )
}

const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

const TabArr = [
  { route: 'HomeScreen', label: 'Home', stack:HomeStack, icon: HomeIcon },
  { route: 'SearchScreen', label: 'Search', stack:SongScreen, icon: MagnifyingGlassIcon },
  { route: 'MusicLibraryScreen', label: 'Library', stack:LibraryScreen, icon: MusicalNoteIcon }
]

export default function AppNavigation() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <View style={{
          width,
          height,
        }}>
          <Tab.Navigator
            screenOptions={{ 
              headerShown: false,
              tabBarStyle: {
                  position: 'absolute', 
                  bottom: 0,
                  padding: 5,
                  paddingBottom:10,
                  height:60,
              },
              tabBarActiveTintColor: '#FF4D4D'
             }}
            >
           {TabArr.map((tab, index) => (
              <Tab.Screen
                key={index}
                name={tab.route}
                component={tab.stack}
                options={{
                  tabBarLabel: tab.label,
                  tabBarIcon: ({ color, size, focused }) => {
                    const Icon = tab.icon;
                    const strokeWidth = focused ? 3 : 1;
                    return <Icon color={color} size={size} strokeWidth={strokeWidth} />;
                  }
                }}
              />
            ))}
          </Tab.Navigator>
      
        </View>
      ) : (
        <AuthStack />
      )}

    </NavigationContainer>
  );
}