import React, { useEffect, useRef, useState } from "react";
import {
  Animated, GestureResponderEvent, TouchableWithoutFeedback, View, ViewStyle
} from "react-native";
import { PLAYER_STATES } from "./constants/playerStates";
import { Controls } from "./Controls";
import styles from "./MediaControls.style";
import { CustomSliderStyle, Slider } from "./Slider";
import { Toolbar } from "./Toolbar";

export type Props = {
  children: React.ReactNode;
  containerStyle: ViewStyle;
  duration: number;
  fadeOutDelay?: number;
  isFullScreen: boolean;
  isLoading: boolean;
  mainColor: string;
  onFullScreen?: (event: GestureResponderEvent) => void;
  onPaused: (playerState: PLAYER_STATES) => void;
  onReplay: () => void;
  onSeek: (value: number) => void;
  onSeeking: (value: number) => void;
  onDoubleTap: () => void;
  playerState: PLAYER_STATES;
  progress: number;
  showOnStart?: boolean;
  sliderStyle?: CustomSliderStyle;
  toolbarStyle?: ViewStyle;
};

const MediaControls = (props: Props) => {
  const {
    children,
    containerStyle: customContainerStyle = {},
    duration,
    fadeOutDelay = 700,
    isLoading = false,
    mainColor = "rgba(12, 83, 175, 0.9)",
    onFullScreen,
    onReplay: onReplayCallback,
    onSeek,
    onSeeking,
    onDoubleTap,
    playerState,
    progress,
    showOnStart = true,
    sliderStyle, // defaults are applied in Slider.tsx
    toolbarStyle: customToolbarStyle = {},
  } = props;
  const { initialOpacity, initialIsVisible } = (() => {
    if (showOnStart) {
      return {
        initialOpacity: 1,
        initialIsVisible: true,
      };
    }

    return {
      initialOpacity: 0,
      initialIsVisible: false,
    };
  })();

  const [opacity] = useState(new Animated.Value(initialOpacity));
  const [isVisible, setIsVisible] = useState(initialIsVisible);

  //NOTE: ダブルタップの可能性があるかどうかを判定する
  const doubleTapPotential = useRef(false);

  useEffect(() => {
    fadeOutControls(fadeOutDelay);
  }, []);

  const fadeOutControls = (delay = 0) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
      useNativeDriver: false,
    }).start(result => {
      /* I noticed that the callback is called twice, when it is invoked and when it completely finished
      This prevents some flickering */
      if (result.finished) {
        setIsVisible(false);
      }
    });
  };

  const fadeInControls = (loop = true) => {
    setIsVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false,
    }).start(() => {
      if (loop) {
        fadeOutControls(fadeOutDelay);
      }
    });
  };

  const onReplay = () => {
    fadeOutControls(fadeOutDelay);
    onReplayCallback();
  };

  const cancelAnimation = () => opacity.stopAnimation(() => setIsVisible(true));

  const onPause = () => {
    const { playerState, onPaused } = props;
    const { PLAYING, PAUSED, ENDED } = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        cancelAnimation();
        break;
      }
      case PAUSED: {
        fadeOutControls(fadeOutDelay);
        break;
      }
      case ENDED:
        break;
    }

    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  const toggleControls = () => {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    opacity.stopAnimation((value: number) => {
      setIsVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  //NOTE: ダブルタップと判定する時間
  const DOUBLE_TAP_DELAY = 230;

  //NOTE: ダブルタップかシングルタップかを判定する
  const _onPress = () => {
    //NOTE: ダブルタップポテンシャルがtrueの時だったらダブルタップされたとみなす
    if (doubleTapPotential.current) {
      onDoubleTap();
      doubleTapPotential.current = false;
    } else { //NOTE: 違ったらダブルタップポテンシャルをtrueにして次のタップを待つ
      doubleTapPotential.current = true;
      setTimeout(() => {
        //NOTE: ダブルタップポテンシャルがtrueのままだとダブルタップじゃないので、シングル
        //NOTE: ダブルタップポテンシャルがfalseになっていたら、もうダブルタップが処理されているので処理なし
        if (doubleTapPotential.current) {
          toggleControls();
          doubleTapPotential.current = false;
        } else {
          doubleTapPotential.current = false;
        }
      }, DOUBLE_TAP_DELAY);
    }
  }

  return (
    <TouchableWithoutFeedback accessible={false} onPress={_onPress}>
      <Animated.View
        style={[styles.container, customContainerStyle, { opacity }]}
      >
        {isVisible && (
          <View style={[styles.container, customContainerStyle]}>
            <View
              style={[
                styles.controlsRow,
                styles.toolbarRow,
                customToolbarStyle,
              ]}
            >
              {children}
            </View>
            <Controls
              onPause={onPause}
              onReplay={onReplay}
              isLoading={isLoading}
              mainColor={mainColor}
              playerState={playerState}
            />
            <Slider
              progress={progress}
              duration={duration}
              mainColor={mainColor}
              onFullScreen={onFullScreen}
              playerState={playerState}
              onSeek={onSeek}
              onSeeking={onSeeking}
              onPause={onPause}
              customSliderStyle={sliderStyle}
            />
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

MediaControls.Toolbar = Toolbar;

export default MediaControls;
