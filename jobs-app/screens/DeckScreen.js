import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView from 'react-native-maps';
import { Card, Button } from 'react-native-elements';

import Swipe from '../components/Swipe';

import * as actions from '../store/actions';

const DeckScreen = ({ navigation }) => {
  const jobs = useSelector((state) => state.jobs.results);

  const renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02,
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS == 'android' ? true : false}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          buttonStyle={{ backgroundColor: '#03A9F4' }}
          onPress={() => navigation.navigate('Map')}
        />
      </Card>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Swipe
        data={jobs.results}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        keyProp="jobkey"
        onSwipeRight={(job) => useDispatch(actions.likeJob(job))}
      />
    </View>
  );
};

DeckScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Jobs',
  };
};

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default DeckScreen;
