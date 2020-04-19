import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: Colors.primary,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: '#ccc',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : 'black',
  },
});

export default Header;
