import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../Actions';
import Swipe from '../Components/Swipe';

class DeckScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='description' size={20} color={tintColor}/>;
    }
  });

  renderCard(job) {
    const { jobtitle, company, formattedRelativeTime,
      snippet, latitude, longitude } = job;
    const initialRegion = {
      longitude,
      latitude,
      latitudeDelta: 0.045 ,
      longitudeDelta: 0.02
    };
    return (
      <Card title={jobtitle} containerStyle={styles.containerStyle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>

        <View style={styles.detailWrapper}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>

        <Text>
          {snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  // This method is an arrow function to help with binding.
  // renderNoMoreCards is called by swipe, so the value of
  // " this " == Swipe
  renderNoMoreCards = () => {
    const { navigation } = this.props;
    return (
      <Card title='No More Jobs'>
        <Button
          large
          title='Back To Map'
          icon={{ name: 'my-location' }}
          backgroundColor='#03A9F4'
          onPress={() => navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    const { navigate, state } = this.props.navigation;
    //const { query } = state.params;
    return (
      <View style={{ marginTop: 24 }}>
        <View style={{ paddingLeft: 10, paddingRight: 10}}>
          <Text style={styles.queryTitleStyle}>{`Job Results For :`}</Text>
        </View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={(job) => this.props.likeJob(job)}
          keyProp='jobkey'
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  containerStyle: {
    height: 600,
  },
  queryTitleStyle: {
    fontSize: 16,
    color: 'black',
  }
};

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
