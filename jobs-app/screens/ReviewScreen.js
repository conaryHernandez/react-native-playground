import React from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  ScrollView,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-native-elements';

const ReviewScreen = () => {
  const likedJobs = useSelector((state) => state.jobs.likedJobs);

  const renderLikedJobs = () => {
    return likedJobs.map((job) => {
      const {
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle,
        jobkey,
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02,
      };

      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  };

  return <ScrollView>{renderLikedJobs()}</ScrollView>;
};

const styles = StyleSheet.create({
  italics: {
    fontStyle: 'italic',
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

ReviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Review Jobs',
    headerRight: () => (
      <Button
        title="Settings"
        onPress={() => navData.navigation.navigate('Settings')}
      />
    ),
  };
};

export default ReviewScreen;
