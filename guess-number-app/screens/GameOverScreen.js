import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over!</TitleText>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            fadeDuration={1000}
            source={require('../assets/success.png')}
            /* source={{
            uri:
              'https://www.roughguides.com/wp-content/uploads/2016/02/matterhorn-shutterstock_1118486243.jpg',
          }} */
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed
            <Text style={styles.highlight}> {roundsNumber} </Text>
            attempts to guess the number:
            <Text style={styles.highlight}> {userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    marginVertical: Dimensions.get('window').height / 20,
    width: (Dimensions.get('window').width * 0.7) / 2,
    height: (Dimensions.get('window').width * 0.7) / 2,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 40,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
});

export default GameOver;
