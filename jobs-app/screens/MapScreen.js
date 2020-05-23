import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const MapScreen = () => {
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  const onRegionChangeComplete = (region) => {
    setRegion(region);
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
      <Text>The MapScreen</Text>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
