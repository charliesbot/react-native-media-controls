// @flow

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
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import styles, { _playButton, container } from './MediaControlsStyles';
import { humanizeVideoDuration, noop } from './Utils';
import PLAYER_STATES from './Constants';

const MediaControls = props => {
  const { containerBackgroundColor } = props;
  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const [isVisible, setVisibility] = useState(true);

  //Hooks: componentDidMount
  useEffect(() => {
    fadeOutControls(5000);
  }, []);

  // Hooks: componentWillReceiveProps
  useEffect(() => {
    if (props.playerState === PLAYER_STATES.ENDED) {
      fadeInControls(false);
    }
  }, [props.playerState]);

  onReplay = () => {
    fadeOutControls(5000);
    props.onReplay();
  };

  onPause = () => {
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

  setLoadingView = () => <ActivityIndicator size="large" color="#FFF" />;

  setPlayerControls = (playerState: PlayerState) => {
    const icon = getPlayerStateIcon(playerState);
    const pressAction =
      playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
    const {
      playButtonHeight,
      playButtonWidth,
      playButtonBorderColor,
      playButtonBackgroundColor,
      playButtonStyle,
    } = props;
    return (
      <TouchableOpacity
        style={
          playButtonStyle ||
          _playButton(
            playButtonHeight,
            playButtonWidth,
            playButtonBorderColor,
            playButtonBackgroundColor,
          )
        }
        onPress={pressAction}
      >
        <Image source={icon} style={styles.playIcon} />
      </TouchableOpacity>
    );
  };

  getPlayerStateIcon = (playerState: PlayerState) => {
    switch (playerState) {
      case PLAYER_STATES.PAUSED:
        // eslint ignore next $FlowFixMe
        return require('./assets/ic_play.png');
      case PLAYER_STATES.PLAYING:
        // eslint ignore next $FlowFixMe
        return require('./assets/ic_pause.png');
      case PLAYER_STATES.ENDED:
        // eslint ignore next $FlowFixMe
        return require('./assets/ic_replay.png');
      default:
        return null;
    }
  };

  cancelAnimation = () => {
    opacity.stopAnimation(() => setVisibility(true));
  };

  toggleControls = () => {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    opacity.stopAnimation(value => {
      setVisibility(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  fadeOutControls = (delay = 0) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
    }).start(result => {
      /* I noticed that the callback is called twice, when it is invoked and when it completely finished
    This prevents some flickering */
      if (result.finished) setVisibility(false);
    });
  };

  fadeInControls = (loop = true) => {
    setVisibility(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
    }).start(() => {
      if (loop) {
        fadeOutControls(5000);
      }
    });
  };

  dragging = value => {
    const { onSeeking, playerState } = props;

    onSeeking(value);
    if (playerState === PLAYER_STATES.PAUSED) return;

    onPause();
  };

  seekVideo = value => {
    props.onSeek(value);
    onPause();
  };

  renderControls = () => {
    const {
      toolbar,
      duration,
      progress,
      isLoading,
      mainColor,
      thumbStyle,
      playerState,
      onFullScreen,
      minimumTrackTintColor,
      containerBackgroundColor,
    } = props;

    // this let us block the controls
    if (!isVisible) return null;

    // eslint ignore next $FlowFixMe
    const fullScreenImage = require('./assets/ic_fullscreen.png');
    return (
      <View style={container(containerBackgroundColor)}>
        <View style={[styles.controlsRow, styles.toolbarRow]}>{toolbar}</View>
        <View style={[styles.controlsRow]}>
          {isLoading ? setLoadingView() : setPlayerControls(playerState)}
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
              thumbStyle={[
                thumbStyle || styles.thumb,
                { borderColor: mainColor },
              ]}
              minimumTrackTintColor={minimumTrackTintColor}
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
    );
  };
  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <Animated.View
        style={[container(containerBackgroundColor), { opacity: opacity }]}
      >
        {this.renderControls()}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

MediaControls.propTypes = {
  toolbar: PropTypes.node,
  mainColor: PropTypes.string,
  isLoading: PropTypes.boolean,
  progress: PropTypes.number,
  duration: PropTypes.number,
  playButtonHeight: PropTypes.number,
  playButtonWidth: PropTypes.number,
  minimumTrackTintColor: PropTypes.string,
  playButtonBackgroundColor: PropTypes.string,
  playButtonBorderColor: PropTypes.string,
  containerBackgroundColor: PropTypes.string,
  onFullScreen: Function,
  onPaused: Function,
  onReplay: Function,
  onSeek: Function,
  onSeeking: Function,
};

MediaControls.defaultProps = {
  isFullScreen: false,
  isLoading: false,
  mainColor: 'rgba(12, 83, 175, 0.9)',
  onFullScreen: noop,
  onReplay: noop,
  onSeeking: noop,
  playButtonHeight: 50,
  playButtonWidth: 50,
  playButtonBackgroundColor: '#FBA928',
  minimumTrackTintColor: '#FBA928',
  playButtonBorderColor: 'rgba(255,255,255,0.5)',
  containerBackgroundColor: 'rgba(45, 59, 62, 0.4)',
};

export default MediaControls;

// class MediaControls extends Component<Props, State> {
//   static defaultProps = {
//     isFullScreen: false,
//     isLoading: false,
//     mainColor: 'rgba(12, 83, 175, 0.9)',
//     onFullScreen: noop,
//     onReplay: noop,
//     onSeeking: noop,
//     playButtonHeight: 50,
//     playButtonWidth: 50,
//     playButtonBackgroundColor: '#FBA928',
//     minimumTrackTintColor: '#FBA928',
//     playButtonBorderColor: 'rgba(255,255,255,0.5)',
//     containerBackgroundColor: 'rgba(45, 59, 62, 0.4)',
//   };

//   state = {
//     opacity: new Animated.Value(1),
//     isVisible: true,
//   };

//   componentDidMount() {
//     this.fadeOutControls(5000);
//   }

//   componentWillReceiveProps(nextProps: Props) {
//     if (nextProps.playerState === PLAYER_STATES.ENDED) {
//       this.fadeInControls(false);
//     }
//   }

//   onReplay = () => {
//     this.fadeOutControls(5000);
//     this.props.onReplay();
//   };

//   onPause = () => {
//     const { playerState, onPaused } = this.props;
//     const { PLAYING, PAUSED } = PLAYER_STATES;
//     switch (playerState) {
//       case PLAYING: {
//         this.cancelAnimation();
//         break;
//       }
//       case PAUSED: {
//         this.fadeOutControls(5000);
//         break;
//       }
//       default:
//         break;
//     }

//     const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
//     return onPaused(newPlayerState);
//   };

//   setLoadingView = () => <ActivityIndicator size="large" color="#FFF" />;

//   setPlayerControls = (playerState: PlayerState) => {
//     const icon = this.getPlayerStateIcon(playerState);
//     const pressAction =
//       playerState === PLAYER_STATES.ENDED ? this.onReplay : this.onPause;
//     const {
//       playButtonHeight,
//       playButtonWidth,
//       playButtonBorderColor,
//       playButtonBackgroundColor,
//       playButtonStyle,
//     } = this.props;
//     return (
//       <TouchableOpacity
//         style={
//           playButtonStyle ||
//           _playButton(
//             playButtonHeight,
//             playButtonWidth,
//             playButtonBorderColor,
//             playButtonBackgroundColor,
//           )
//         }
//         onPress={pressAction}
//       >
//         <Image source={icon} style={styles.playIcon} />
//       </TouchableOpacity>
//     );
//   };

//   getPlayerStateIcon = (playerState: PlayerState) => {
//     switch (playerState) {
//       case PLAYER_STATES.PAUSED:
//         // eslint ignore next $FlowFixMe
//         return require('./assets/ic_play.png');
//       case PLAYER_STATES.PLAYING:
//         // eslint ignore next $FlowFixMe
//         return require('./assets/ic_pause.png');
//       case PLAYER_STATES.ENDED:
//         // eslint ignore next $FlowFixMe
//         return require('./assets/ic_replay.png');
//       default:
//         return null;
//     }
//   };

//   cancelAnimation = () => {
//     this.state.opacity.stopAnimation(() => {
//       this.setState({ isVisible: true });
//     });
//   };

//   toggleControls = () => {
//     // value is the last value of the animation when stop animation was called.
//     // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
//     this.state.opacity.stopAnimation((value: number) => {
//       this.setState({ isVisible: !!value });
//       return value ? this.fadeOutControls() : this.fadeInControls();
//     });
//   };

//   fadeOutControls = (delay: number = 0) => {
//     Animated.timing(this.state.opacity, {
//       toValue: 0,
//       duration: 300,
//       delay,
//     }).start(result => {
//       /* I noticed that the callback is called twice, when it is invoked and when it completely finished
//       This prevents some flickering */
//       if (result.finished) this.setState({ isVisible: false });
//     });
//   };

//   fadeInControls = (loop: boolean = true) => {
//     this.setState({ isVisible: true });
//     Animated.timing(this.state.opacity, {
//       toValue: 1,
//       duration: 300,
//       delay: 0,
//     }).start(() => {
//       if (loop) {
//         this.fadeOutControls(5000);
//       }
//     });
//   };

//   dragging = (value: number) => {
//     const { onSeeking, playerState } = this.props;

//     onSeeking(value);
//     if (playerState === PLAYER_STATES.PAUSED) return;

//     this.onPause();
//   };

//   seekVideo = (value: number) => {
//     this.props.onSeek(value);
//     this.onPause();
//   };

//   renderControls() {
//     const {
//       toolbar,
//       duration,
//       progress,
//       isLoading,
//       mainColor,
//       thumbStyle,
//       playerState,
//       onFullScreen,
//       minimumTrackTintColor,
//       containerBackgroundColor,
//     } = this.props;

//     // this let us block the controls
//     if (!this.state.isVisible) return null;

//     // eslint ignore next $FlowFixMe
//     const fullScreenImage = require('./assets/ic_fullscreen.png');
//     return (
//       <View style={container(containerBackgroundColor)}>
//         <View style={[styles.controlsRow, styles.toolbarRow]}>{toolbar}</View>
//         <View style={[styles.controlsRow]}>
//           {isLoading
//             ? this.setLoadingView()
//             : this.setPlayerControls(playerState)}
//         </View>
//         <View style={[styles.controlsRow, styles.progressContainer]}>
//           <View style={styles.progressColumnContainer}>
//             <View style={[styles.timerLabelsContainer]}>
//               <Text style={styles.timerLabel}>
//                 {humanizeVideoDuration(progress)}
//               </Text>
//               <Text style={styles.timerLabel}>
//                 {humanizeVideoDuration(duration)}
//               </Text>
//             </View>
//             <Slider
//               style={styles.progressSlider}
//               onValueChange={this.dragging}
//               onSlidingComplete={this.seekVideo}
//               maximumValue={Math.floor(duration)}
//               value={Math.floor(progress)}
//               trackStyle={styles.track}
//               thumbStyle={[
//                 thumbStyle || styles.thumb,
//                 { borderColor: mainColor },
//               ]}
//               minimumTrackTintColor={minimumTrackTintColor}
//             />
//           </View>
//           <TouchableOpacity
//             style={styles.fullScreenContainer}
//             onPress={onFullScreen}
//           >
//             <Image source={fullScreenImage} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   render() {
//     const { containerBackgroundColor } = this.props;
//     return (
//       <TouchableWithoutFeedback onPress={this.toggleControls}>
//         <Animated.View
//           style={[
//             container(containerBackgroundColor),
//             { opacity: this.state.opacity },
//           ]}
//         >
//           {this.renderControls()}
//         </Animated.View>
//       </TouchableWithoutFeedback>
//     );
//   }
// }

// export default MediaControls;
