import React, { useMemo, useState } from 'react';
import { View, Animated, PanResponder } from 'react-native';

const Deck = ({ data, renderCard }) => {
  const position = new Animated.ValueXY();
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          console.log({ ...gesture }, position);

          position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: () => {},
      }),
    []
  );

  const renderCards = () => data.map((item) => renderCard(item));

  return (
    <Animated.View style={position.getLayout()} {...panResponder.panHandlers}>
      {renderCards()}
    </Animated.View>
  );
};

export default Deck;
