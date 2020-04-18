import React, { forwardRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

import Dashboard from './pages/Delivery/Dashboard';
import Details from './pages/Delivery/Details';
import Confirm from './pages/Delivery/Confirm';
import CreateProblem from './pages/Delivery/CreateProblem';
import ViewProblem from './pages/Delivery/ViewProblem';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DeliveryStack = createStackNavigator();

function DeliveryStackNavigator() {
  return (
    <DeliveryStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerBackTitle: false,
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
          backgroundColor: '#7D40E7',
        },
      }}
    >
      <DeliveryStack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <DeliveryStack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Detalhes da encomenda',
          headerBackImage: () => (
            <Icon name="chevron-left" size={24} color="#FFF" />
          ),
        }}
      />
      <DeliveryStack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar entrega',
          headerBackImage: () => (
            <Icon name="chevron-left" size={24} color="#FFF" />
          ),
        }}
      />
      <DeliveryStack.Screen
        name="CreateProblem"
        component={CreateProblem}
        options={{
          title: 'Informar problema',
          headerBackImage: () => (
            <Icon name="chevron-left" size={24} color="#FFF" />
          ),
        }}
      />
      <DeliveryStack.Screen
        name="ViewProblem"
        component={ViewProblem}
        options={{
          title: 'Visualizar problemas',
          headerBackImage: () => (
            <Icon name="chevron-left" size={24} color="#FFF" />
          ),
        }}
      />
    </DeliveryStack.Navigator>
  );
}

function Routes({ signed }, ref) {
  return (
    <NavigationContainer ref={ref}>
      {signed ? (
        <Tab.Navigator
          initialRouteName="Dashboard"
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#7D40E7',
            style: {
              backgroundColor: '#FFFFFF',
              height: 70,
              paddingTop: 10,
            },
            inactiveTintColor: '#999999',
            labelStyle: {
              marginBottom: 12,
              fontSize: 14,
            },
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DeliveryStackNavigator}
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Entregas',
              tabBarIcon: ({ color }) => (
                <Icon name="menu" size={26} color={color} />
              ),
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarLabel: 'Meu Perfil',
              tabBarIcon: ({ color }) => (
                <Icon name="account-circle" size={26} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default forwardRef(Routes);
Routes.propTypes = {
  signed: PropTypes.bool.isRequired,
};

DeliveryStackNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
