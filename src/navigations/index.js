import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import User from '../screens/User';
import TambahUser from '../screens/TambahUser';
import Login from '../screens/Login';
import HalamanError from '../screens/HalamanError';
import Cuti from '../screens/Cuti';
import EditProfile from '../screens/EditProfile';
import AjukanCuti from '../screens/AjukanCuti';
import CutiKaryawan from '../screens/CutiKaryawan';
import ApprovalLeader from '../screens/ApprovalLeader';
import ApprovalOpt from '../screens/ApprovalOpt';
import AjukanCutiHamil from '../screens/AjukanCutiHamil';
import Entypo from 'react-native-vector-icons/Entypo';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="users" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cuti"
        component={Cuti}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const StaffApp = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cuti"
        component={Cuti}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
const LeaderApp = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cuti"
        component={Cuti}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StaffApp"
        component={StaffApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LeaderApp"
        component={LeaderApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahUser"
        component={TambahUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HalamanError"
        component={HalamanError}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: true, title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="AjukanCuti"
        component={AjukanCuti}
        options={{headerShown: true, title: 'Ajukan Cuti'}}
      />
      <Stack.Screen
        name="AjukanCutiHamil"
        component={AjukanCutiHamil}
        options={{headerShown: true, title: 'Ajukan Cuti Hamil'}}
      />
      <Stack.Screen
        name="CutiKaryawan"
        component={CutiKaryawan}
        options={{headerShown: true, title: 'Cuti Karyawan'}}
      />
      <Stack.Screen
        name="ApprovalLeader"
        component={ApprovalLeader}
        options={{headerShown: true, title: 'Approval Leader'}}
      />
      <Stack.Screen
        name="ApprovalOpt"
        component={ApprovalOpt}
        options={{headerShown: true, title: 'Approval Operation'}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
