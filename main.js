import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './src/Services/push_notifications';

import Store from './src/Store';
import AuthScreen from './src/Screens/AuthScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import MapScreen from './src/Screens/MapScreen';
import DeckScreen from './src/Screens/DeckScreen';
import ReviewScreen from './src/Screens/ReviewScreen';
import SettingsScreen from './src/Screens/SettingsScreen';

class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    // Call back that will be executed anytime a user recieves a push notif
    // " notification " contains all info about the notif
    Notifications.addListener((notification) => {
      const { data : { text }, origin } = notification;
      // const data = notification.data.text;

      if(origin === 'received' && text){
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            showIcon: true,
            iconStyle: { width: 20, height: 20 },
            labelStyle: { fontSize: 11 },
            activeTintColor: '#fff',
            style: { backgroundColor: '#009688' }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false,
      },
      lazy: true,
      animationEnabled: false,
    });

    return (
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
