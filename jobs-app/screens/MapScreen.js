import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import * as actions from '../store/actions';

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch = useDispatch();

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  const afterButtonPress = () => {
    navigation.navigate('Deck');
  };

  const onButtonPress = () => {
    dispatch(actions.fetchJobs(region, afterButtonPress));
  };

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Search this Area"
          buttonStyle={{
            backgroundColor: '#009688',
          }}
          icon={{ name: 'search' }}
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};

MapScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Map',
  };
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
});

export default MapScreen;
