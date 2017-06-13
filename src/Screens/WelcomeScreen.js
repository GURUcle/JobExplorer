import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../Components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome To JobExplorer', color: '#03A9F4' },
  { text: 'Use This App To Find a Job', color: '#009688' },
  { text: 'Set Your Location, Then Swipe Away', color: '#03A9F4' },
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    const { navigation } = this.props;
    if (token) {
      this.setState({ token });
      navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    const { navigation } = this.props;
    navigation.navigate('auth');
  }

  render() {
    if(this.state.token === null) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
}

export default WelcomeScreen;
