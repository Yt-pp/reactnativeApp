import React from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
const MyView = React.forwardRef((props, ref) => {
    // some additional logic
    return <View ref={ref} {...props} />;
  });
  const MyAnimatedView = Animated.createAnimatedComponent(MyView);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);


export default function TestingAnimation() {
    const scale = useSharedValue(1);
  const r = useSharedValue(20);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    r.value = 20 + offsetY * 0.1; // Adjust multiplier as needed
    scale.value = 1 + offsetY * 0.01;
  };


  const handlePress = () => {
    r.value += 10;
  };

  // highlight-start
  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
    transform:[{scale: withTiming(scale.value)}],
  }));
  // highlight-end

  return (
    <ScrollView
      className="flex-1"
      onScroll={handleScroll}
      scrollEventThrottle={16} // Adjust as needed
    >
        <View className="items-center" style={{height:1000}}>
      <Svg style={styles.svg}>
        <AnimatedCircle
          cx="50%"
          cy="50%"
          fill="#b58df1"
          // highlight-next-line
          animatedProps={animatedProps}
        />

      </Svg>
      
      <Button onPress={handlePress} title="Click me" />
      <Animated.View style={{width:100,height:100,backgroundColor:'red'}}
      animatedProps={animatedProps}
      >
        </Animated.View>
        <MyAnimatedView style={{width:100,height:100,backgroundColor:'red'}}
      animatedProps={animatedProps}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  svg: {
    height: 250,
    width: '100%',
  },
});
