import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Slides = ({ data }) => {
  const renderSlides = () => {
    return data.map((slide, index) => (
      <View
        style={{ ...styles.slide, backgroundColor: slide.color }}
        key={slide.text}
      >
        <Text style={styles.slideText}>{slide.text}</Text>
        {renderLastSlide(index)}
      </View>
    ));
  };

  const renderLastSlide = (index) => {
    if (index === data.length - 1) {
      return <Button title="Onwards!" raised />;
    }
  };

  return (
    <ScrollView horizontal pagingEnabled>
      {renderSlides()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
  },
  screen: {
    flex: 1,
  },
});

export default Slides;
