import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'react-native-elements';
import * as actions from '../Actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    title: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='favorite' size={30} color={tintColor} />;
    }
  }

  render() {
    return (
      <Card>
        <Button
          large
          title='Reset Liked Jobs'
          icon={{ name: 'delete-forever' }}
          backgroundColor='#F44336'
          onPress={this.props.clearLikedJobs}
        />
      </Card>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
