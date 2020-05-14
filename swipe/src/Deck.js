import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  UIManager,
  LayoutAnimation,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCards,
}) => {
  const [cardIndex, setCardIndex] = useState(0);
  const position = new Animated.ValueXY();
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (event, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe('right');
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe('left');
          } else {
            resetPosition();
          }
        },
      }),
    []
  );

  useEffect(() => {
    setCardIndex(0);
  }, [data, setCardIndex]);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [UIManager, LayoutAnimation]);

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    const item = data[cardIndex];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCardIndex((prevState) => prevState + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (cardIndex >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item, index) => {
        if (index < cardIndex) {
          return null;
        }

        if (index === cardIndex) {
          return (
            <Animated.View
              key={item.id}
              style={{ ...getCardStyle(), ...styles.cardStyle, zIndex: 99 }}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={{
              ...styles.cardStyle,
              top: 10 * (index - cardIndex),
              zIndex: 5,
            }}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});

Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
};

export default Deck;
