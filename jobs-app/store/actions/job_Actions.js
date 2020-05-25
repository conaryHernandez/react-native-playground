import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { API_KEY } from '../../keys';

import { FETCH_JOBS, LIKE_JOB } from './types';

import JOB_DATA from '../../data/IndeedJobData.json'; // Dummy data

export const fetchJobs = (region, cb) => {
  return async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

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
          payload: JOB_DATA,
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
