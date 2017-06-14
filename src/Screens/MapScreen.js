import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../Actions';

class MapScreen extends Component {
  static navigationOptions = {
    title:'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='my-location' size={20} color={tintColor}/>;
    }
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    },
    query: ''
  };

  componentDidMount() {
    //AsyncStorage.removeItem('fb_token');
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    const { navigation } = this.props;
    const { query } = this.state;
    // Call back function to navigate user after finding jobs
    this.props.fetchJobs(this.state.region, query, () => {
      navigation.navigate('deck', { query });
    });
  }

  render() {
    if(!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, marginTop: 24 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />

        <View style={styles.textBoxContainer}>
          <Text style={styles.textStyle}>Enter Job Keyword:</Text>
          <TextInput
            value={this.state.text}
            style={styles.textBoxStyle}
            onChangeText={(text) => this.setState({ query: text })}
            maxLength={40}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Search this area"
            large
            backgroundColor='#009688'
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
            buttonStyle={{ borderRadius: 5 }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  textBoxContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textBoxStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    paddingLeft: 5,
    color: 'gray'
  },
  textStyle: {
    color: 'gray'
  }
};

export default connect(null, actions)(MapScreen);
