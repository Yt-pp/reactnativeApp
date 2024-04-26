import React, { useCallback, useRef } from 'react';
import { Button, View, StyleSheet, ScrollView, ImageBackground, Image, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import { TapGestureHandler,GestureHandlerRootView, PanGestureHandler,State  } from 'react-native-gesture-handler';
import { HeartIcon, PlayIcon } from 'react-native-heroicons/solid';
import { transform } from 'typescript';
import { XCircleIcon } from 'react-native-heroicons/outline';

const MyView = React.forwardRef((props, ref) => {
    // some additional logic
    return <View ref={ref} {...props} />;
  });
  const MyAnimatedView = Animated.createAnimatedComponent(MyView);
  const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedImage = Animated.createAnimatedComponent(Image)
export default function TestingAnimation() {
    const doubleTapRef = useRef(null);
    const scale = useSharedValue(1);
  const r = useSharedValue(20);

    const scaleForHeart = useSharedValue(0);
    const sStyle = useAnimatedStyle(()=>({
        transform: [
            {scale: Math.max(scaleForHeart.value, 0)}
        ]
    }));
    const onDoubleTap = useCallback(()=>{
        scaleForHeart.value = withSpring(0.5, undefined, (isFinished) => {
            if(isFinished){
                scaleForHeart.value = withSpring(0);
            }
        });
      },[]);

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
    //transform:[{scale: withTiming(scale.value)}],
  }));
  // highlight-end

  const translateY = useSharedValue(0);
  const isFullHeight = useSharedValue(false);

  const { height: screenHeight } = Dimensions.get('window');

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
        console.log('start')
      ctx.startY = translateY.value;

    },
    onActive: (event, ctx) => {
        
      translateY.value = ctx.startY + event.translationY;
      
    },
    onEnd: (_, ctx) => {
        const threshold = screenHeight / 2; // 50% of screen height
        const fullHeight = translateY.value < -threshold;
        isFullHeight.value = fullHeight;
    
        // Reset startY to allow the gesture handler to start again
        ctx.startY = 0;
    
        // Animate to the nearest edge
        if (fullHeight) {
          translateY.value = withSpring(-screenHeight + 100);
        } else {
          translateY.value = withSpring(0);
        }
      },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (translateY.value) }],
  }));


  
  return (
    <>
    <ScrollView
      className="flex-1"
      onScroll={handleScroll}
      scrollEventThrottle={16} // Adjust as needed
    >
          <GestureHandlerRootView>

      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={onDoubleTap}
      >
       <Animated.View>
        <ImageBackground
          className="w-full h-52"
          source={require('../assets/images/winter.jpg')}
        >
         <AnimatedImage  className="w-full h-52"
          resizeMode={'center'}
          source={require('../assets/images/heart.png')}
          style={[sStyle]}/>
        </ImageBackground>
        </Animated.View>
      </TapGestureHandler>

  </GestureHandlerRootView>
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
    <GestureHandlerRootView>
    <PanGestureHandler 
    maxDeltaY={-5}
    onGestureEvent={onGestureEvent}>
      <AnimatedView style={[{ height: isFullHeight.value ? 500 : 50,backgroundColor: 'black' }, animatedStyle]}>
        <View style={{ width: '100%' }} className="w-full d-flex items-center flex-row" >
          <Image source={require('../assets/images/winter.jpg')} style={{ width: 140, height: 50 }} />
          <View style={{ marginLeft: 3 }}>
            <Text style={{ color: 'white' }}>Test Content</Text>
            <Text style={{ color: 'white' }}>Content Creator</Text>
          </View>
          <View style={{ marginLeft: 'auto', flexDirection: 'row', justifyContent: 'center' }}>
            <PlayIcon color={'white'} size={30} />
            <View style={{ marginLeft: 4, marginRight: 2 }}>
              <XCircleIcon color={'white'} size={30} />
            </View>
          </View>
        </View>
      </AnimatedView>
    </PanGestureHandler>
    </GestureHandlerRootView>
    
  </>
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
