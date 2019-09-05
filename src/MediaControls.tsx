import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Animated,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Slider from 'react-native-slider';
import styles from './MediaControlsStyles';
import { humanizeVideoDuration, noop, getPlayerStateIcon } from './utils';
import { Props } from './types';
import PLAYER_STATES from './constants';

const MediaControls: React.FC<Props> = props => {
  const {
    duration,
    isLoading = false,
    onFullScreen = noop,
    playerState,
    progress,
    toolbar,
    fadeOutDelay = 5000,
    mainColor = 'rgba(12, 83, 175, 0.9)',
  } = props;
  const [opacity] = useState(new Animated.Value(1));
  const [isVisible, setIsVisible] = useState(true);

  const fadeOutControls = (delay = 0) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
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
    }).start(() => {
      if (loop) {
        fadeOutControls(fadeOutDelay);
      }
    });
  };

  const onReplay = () => {
    fadeOutControls(fadeOutDelay);
    onReplay();
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

  const dragging = (value: number) => {
    const { onSeeking, playerState } = props;

    onSeeking(value);
    if (playerState === PLAYER_STATES.PAUSED) {
      return;
    }

    onPause();
  };

  const seekVideo = (value: number) => {
    props.onSeek(value);
    onPause();
  };

  useEffect(() => {
    fadeOutControls(5000);
  }, []);

  useEffect(() => {
    if (playerState === PLAYER_STATES.ENDED) {
      fadeInControls(false);
    }
  }, [playerState]);

  const icon = getPlayerStateIcon(playerState);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
  const fullScreenImage = require('./assets/ic_fullscreen.png');

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <Animated.View style={[styles.container, { opacity }]}>
        {isVisible && (
          <View style={styles.container}>
            <View style={[styles.controlsRow, styles.toolbarRow]}>
              {toolbar}
            </View>
            <View style={[styles.controlsRow]}>
              {(() => {
                if (isLoading) {
                  return <ActivityIndicator size="large" color="#FFF" />;
                }

                return (
                  <TouchableOpacity
                    style={[styles.playButton, { backgroundColor: mainColor }]}
                    onPress={pressAction}
                  >
                    <Image source={icon} style={styles.playIcon} />
                  </TouchableOpacity>
                );
              })()}
            </View>
            <View style={[styles.controlsRow, styles.progressContainer]}>
              <View style={styles.progressColumnContainer}>
                <View style={[styles.timerLabelsContainer]}>
                  <Text style={styles.timerLabel}>
                    {humanizeVideoDuration(progress)}
                  </Text>
                  <Text style={styles.timerLabel}>
                    {humanizeVideoDuration(duration)}
                  </Text>
                </View>
                <Slider
                  style={styles.progressSlider}
                  onValueChange={dragging}
                  onSlidingComplete={seekVideo}
                  maximumValue={Math.floor(duration)}
                  value={Math.floor(progress)}
                  trackStyle={styles.track}
                  thumbStyle={[styles.thumb, { borderColor: mainColor }]}
                  minimumTrackTintColor={mainColor}
                />
              </View>
              <TouchableOpacity
                style={styles.fullScreenContainer}
                onPress={onFullScreen}
              >
                <Image source={fullScreenImage} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default MediaControls;
