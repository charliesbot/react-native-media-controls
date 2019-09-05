'use strict';
const __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null)
      for (const k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importStar(require('react'));
const react_native_1 = require('react-native');
const react_native_slider_1 = __importDefault(require('react-native-slider'));
const MediaControlsStyles_1 = __importDefault(require('./MediaControlsStyles'));
const utils_1 = require('./utils');
const constants_1 = __importDefault(require('./constants'));
const MediaControls = function(props) {
  const duration = props.duration,
    _a = props.isLoading,
    isLoading = _a === void 0 ? false : _a,
    _b = props.onFullScreen,
    onFullScreen = _b === void 0 ? utils_1.noop : _b,
    playerState = props.playerState,
    progress = props.progress,
    toolbar = props.toolbar,
    _c = props.fadeOutDelay,
    fadeOutDelay = _c === void 0 ? 5000 : _c,
    _d = props.mainColor,
    mainColor = _d === void 0 ? 'rgba(12, 83, 175, 0.9)' : _d;
  const opacity = react_1.useState(new react_native_1.Animated.Value(1))[0];
  const _e = react_1.useState(true),
    isVisible = _e[0],
    setIsVisible = _e[1];
  const fadeOutControls = function(delay) {
    if (delay === void 0) {
      delay = 0;
    }
    react_native_1.Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay: delay,
    }).start(function(result) {
      /* I noticed that the callback is called twice, when it is invoked and when it completely finished
            This prevents some flickering */
      if (result.finished) {
        setIsVisible(false);
      }
    });
  };
  const fadeInControls = function(loop) {
    if (loop === void 0) {
      loop = true;
    }
    setIsVisible(true);
    react_native_1.Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
    }).start(function() {
      if (loop) {
        fadeOutControls(fadeOutDelay);
      }
    });
  };
  var onReplay = function() {
    fadeOutControls(fadeOutDelay);
    onReplay();
  };
  const cancelAnimation = function() {
    return opacity.stopAnimation(function() {
      return setIsVisible(true);
    });
  };
  const onPause = function() {
    const playerState = props.playerState,
      onPaused = props.onPaused;
    const PLAYING = constants_1.default.PLAYING,
      PAUSED = constants_1.default.PAUSED;
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
  const toggleControls = function() {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    opacity.stopAnimation(function(value) {
      setIsVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };
  const dragging = function(value) {
    const onSeeking = props.onSeeking,
      playerState = props.playerState;
    onSeeking(value);
    if (playerState === constants_1.default.PAUSED) {
      return;
    }
    onPause();
  };
  const seekVideo = function(value) {
    props.onSeek(value);
    onPause();
  };
  react_1.useEffect(function() {
    fadeOutControls(5000);
  }, []);
  react_1.useEffect(
    function() {
      if (playerState === constants_1.default.ENDED) {
        fadeInControls(false);
      }
    },
    [playerState],
  );
  const icon = utils_1.getPlayerStateIcon(playerState);
  const pressAction =
    playerState === constants_1.default.ENDED ? onReplay : onPause;
  const fullScreenImage = require('./assets/ic_fullscreen.png');
  return (
    <react_native_1.TouchableWithoutFeedback onPress={toggleControls}>
      <react_native_1.Animated.View
        style={[MediaControlsStyles_1.default.container, { opacity: opacity }]}
      >
        {isVisible && (
          <react_native_1.View style={MediaControlsStyles_1.default.container}>
            <react_native_1.View
              style={[
                MediaControlsStyles_1.default.controlsRow,
                MediaControlsStyles_1.default.toolbarRow,
              ]}
            >
              {toolbar}
            </react_native_1.View>
            <react_native_1.View
              style={[MediaControlsStyles_1.default.controlsRow]}
            >
              {(function() {
                if (isLoading) {
                  return (
                    <react_native_1.ActivityIndicator
                      size="large"
                      color="#FFF"
                    />
                  );
                }
                return (
                  <react_native_1.TouchableOpacity
                    style={[
                      MediaControlsStyles_1.default.playButton,
                      { backgroundColor: mainColor },
                    ]}
                    onPress={pressAction}
                  >
                    <react_native_1.Image
                      source={icon}
                      style={MediaControlsStyles_1.default.playIcon}
                    />
                  </react_native_1.TouchableOpacity>
                );
              })()}
            </react_native_1.View>
            <react_native_1.View
              style={[
                MediaControlsStyles_1.default.controlsRow,
                MediaControlsStyles_1.default.progressContainer,
              ]}
            >
              <react_native_1.View
                style={MediaControlsStyles_1.default.progressColumnContainer}
              >
                <react_native_1.View
                  style={[MediaControlsStyles_1.default.timerLabelsContainer]}
                >
                  <react_native_1.Text
                    style={MediaControlsStyles_1.default.timerLabel}
                  >
                    {utils_1.humanizeVideoDuration(progress)}
                  </react_native_1.Text>
                  <react_native_1.Text
                    style={MediaControlsStyles_1.default.timerLabel}
                  >
                    {utils_1.humanizeVideoDuration(duration)}
                  </react_native_1.Text>
                </react_native_1.View>
                <react_native_slider_1.default
                  style={MediaControlsStyles_1.default.progressSlider}
                  onValueChange={dragging}
                  onSlidingComplete={seekVideo}
                  maximumValue={Math.floor(duration)}
                  value={Math.floor(progress)}
                  trackStyle={MediaControlsStyles_1.default.track}
                  thumbStyle={[
                    MediaControlsStyles_1.default.thumb,
                    { borderColor: mainColor },
                  ]}
                  minimumTrackTintColor={mainColor}
                />
              </react_native_1.View>
              <react_native_1.TouchableOpacity
                style={MediaControlsStyles_1.default.fullScreenContainer}
                onPress={onFullScreen}
              >
                <react_native_1.Image source={fullScreenImage} />
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        )}
      </react_native_1.Animated.View>
    </react_native_1.TouchableWithoutFeedback>
  );
};
exports.default = MediaControls;
//# sourceMappingURL=MediaControls.js.map
