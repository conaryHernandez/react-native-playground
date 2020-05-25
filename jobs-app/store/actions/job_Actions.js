import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { API_KEY } from '../../keys';

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';

import JOB_DATA from '../../data/IndeedJobData'; // Dummy data

export const fetchJobs = (region, cb) => {
  return async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    const fakeRegion = {
      longitude: 0.02,
      latitude: 0.05,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    };

    if (status === 'granted') {
      const { latitude, longitude } = region;

      Location.setApiKey(API_KEY);
      try {
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        // FETCH CALL TO API const { data } = await axios.get('../../data/IndeedJobData.json');

        dispatch({
          type: FETCH_JOBS,
          payload: JOB_DATA(fakeRegion),
        });
        cb();
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Permissions required');
    }
  };
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job,
  };
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS,
  };
};
