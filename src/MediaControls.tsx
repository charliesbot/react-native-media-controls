import React, { useState } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import styles from "./MediaControls.style";
import { PLAYER_STATES } from "./constants/playerStates";
import { Controls } from "./Controls";
import { Slider } from "./Slider";
import { Toolbar } from "./Toolbar";

interface MediaControlsComposition {
  Toolbar: React.FC;
}

export type Props = {
  mainColor: string;
  isLoading: boolean;
  progress: number;
  duration: number;
  isFullScreen: boolean;
  playerState: PLAYER_STATES;
  onFullScreen?: (event: GestureResponderEvent) => void;
  fadeOutDelay?: number;
  onPaused: (playerState: PLAYER_STATES) => void;
  onReplay: () => void;
  onSeek: (value: number) => void;
  onSeeking: (value: number) => void;
};

const MediaControls: React.FC<Props> & MediaControlsComposition = props => {
  const {
    children,
    duration,
    isLoading = false,
    onFullScreen,
    playerState,
    progress,
    onReplay: onReplayCallback,
    fadeOutDelay = 5000,
    mainColor = "rgba(12, 83, 175, 0.9)",
    onSeeking,
    onSeek,
  } = props;
  const [opacity] = useState(new Animated.Value(1));
  const [isVisible, setIsVisible] = useState(true);

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
    const { PLAYING, PAUSED } = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        cancelAnimation();
        break;
      }
      case PAUSED: {
        fadeOutControls(5000);
        break;
      }
      default:
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

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <Animated.View style={[styles.container, { opacity }]}>
        {isVisible && (
          <View style={styles.container}>
            <View style={[styles.controlsRow, styles.toolbarRow]}>
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
            />
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

MediaControls.Toolbar = Toolbar;

export default MediaControls;
