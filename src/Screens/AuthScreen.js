import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';


class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props)
  }

  // called when component is about to be re-rendered
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    const { navigation } = this.props;
    if(props.token) {
      navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
