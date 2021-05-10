'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var RNSlider = _interopDefault(require('react-native-slider'));

var white = "#fff";
var styles = /*#__PURE__*/reactNative.StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: containerBackgroundColor,
    backgroundColor: "blue",
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0
  },
  controlsRow: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 20
  },
  playButton: {
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginRight: 10
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22,
    alignSelf: "center"
  },
  progressColumnContainer: {
    flex: 1
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  progressSlider: {
    alignSelf: "stretch"
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25,
    color: "white"
  },
  thumb: {
    backgroundColor: white,
    borderRadius: 15 / 2,
    borderWidth: 3,
    height: 15,
    width: 15
  },
  timeRow: {
    alignSelf: "stretch"
  },
  timerLabel: {
    color: white,
    fontSize: 12
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  track: {
    borderRadius: 1,
    height: 5
  },
  controllerContainer: {
    width: "100%",
    flexDirection: "row"
  }
});

(function (PLAYER_STATES) {
  PLAYER_STATES[PLAYER_STATES["PLAYING"] = 0] = "PLAYING";
  PLAYER_STATES[PLAYER_STATES["PAUSED"] = 1] = "PAUSED";
  PLAYER_STATES[PLAYER_STATES["ENDED"] = 2] = "ENDED";
})(exports.PLAYER_STATES || (exports.PLAYER_STATES = {}));

var humanizeVideoDuration = function humanizeVideoDuration(seconds) {
  var _ref = seconds >= 3600 ? [11, 8] : [14, 5],
      begin = _ref[0],
      end = _ref[1];

  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};
var getPlayerStateIcon = function getPlayerStateIcon(playerState) {
  switch (playerState) {
    case exports.PLAYER_STATES.PAUSED:
      return require("./assets/ic_play_new.png");

    case exports.PLAYER_STATES.PLAYING:
      return require("./assets/ic_pause_new.png");

    case exports.PLAYER_STATES.ENDED:
      return require("./assets/ic_replay.png");

    default:
      return null;
  }
};
var getPlayerVolume = function getPlayerVolume(volume) {
  switch (volume) {
    case 0:
      return require("./assets/ic_volume_mute.png");

    case 0.5:
      return require("./assets/ic_volume_medium.png");

    case 1:
      return require("./assets/ic_volume_high.png");
  }
};

var Controls = function Controls(props) {
  var playerState = props.playerState,
      volume = props.volume,
      onReplay = props.onReplay,
      onPause = props.onPause,
      onVolumePress = props.onVolumePress;
  var icon = getPlayerStateIcon(playerState);
  var volumeIcon = getPlayerVolume(volume);
  var pressAction = playerState === exports.PLAYER_STATES.ENDED ? onReplay : onPause;

  var handleVolumeActionPress = function handleVolumeActionPress() {
    onVolumePress();
  };

  var content = React__default.createElement(reactNative.View, {
    style: styles.controllerContainer
  }, React__default.createElement(reactNative.TouchableOpacity, {
    style: [styles.playButton],
    activeOpacity: 1,
    onPress: pressAction,
    accessibilityLabel: exports.PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause",
    accessibilityHint: "Plays and Pauses the Video"
  }, React__default.createElement(reactNative.Image, {
    source: icon,
    style: styles.playIcon
  })), React__default.createElement(reactNative.TouchableOpacity, {
    style: [styles.playButton],
    onPress: handleVolumeActionPress,
    activeOpacity: 1,
    accessibilityLabel: volume === 0 ? "Player muted" : volume === 0.5 ? "Player volume medium" : "Player volume high",
    accessibilityHint: "Indicates player volume"
  }, React__default.createElement(reactNative.Image, {
    source: volumeIcon,
    style: styles.playIcon
  })));
  return React__default.createElement(reactNative.View, {
    style: [styles.controlsRow]
  }, content);
};

var fullScreenImage = /*#__PURE__*/require("./assets/ic_fullscreen.png");

var Slider = function Slider(props) {
  var customSliderStyle = props.customSliderStyle,
      duration = props.duration,
      mainColor = props.mainColor,
      onFullScreen = props.onFullScreen,
      onPause = props.onPause,
      progress = props.progress;
  var containerStyle = (customSliderStyle === null || customSliderStyle === void 0 ? void 0 : customSliderStyle.containerStyle) || {};
  var customTrackStyle = (customSliderStyle === null || customSliderStyle === void 0 ? void 0 : customSliderStyle.trackStyle) || {};
  var customThumbStyle = (customSliderStyle === null || customSliderStyle === void 0 ? void 0 : customSliderStyle.thumbStyle) || {};

  var dragging = function dragging(value) {
    var onSeeking = props.onSeeking,
        playerState = props.playerState;
    onSeeking(value);

    if (playerState === exports.PLAYER_STATES.PAUSED) {
      return;
    }

    onPause();
  };

  var seekVideo = function seekVideo(value) {
    props.onSeek(value);
    onPause();
  };

  return React__default.createElement(reactNative.View, {
    style: [styles.controlsRow, styles.progressContainer, containerStyle]
  }, React__default.createElement(reactNative.View, {
    style: styles.progressColumnContainer
  }, React__default.createElement(reactNative.View, {
    style: [styles.timerLabelsContainer]
  }, React__default.createElement(reactNative.Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(progress)), React__default.createElement(reactNative.Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(duration))), React__default.createElement(RNSlider, {
    style: [styles.progressSlider],
    onValueChange: dragging,
    onSlidingComplete: seekVideo,
    maximumValue: Math.floor(duration),
    value: Math.floor(progress),
    trackStyle: [styles.track, customTrackStyle],
    thumbStyle: [styles.thumb, customThumbStyle, {
      borderColor: mainColor
    }],
    minimumTrackTintColor: mainColor,
    disabled: false,
    iconComponent: null
  })), Boolean(onFullScreen) && React__default.createElement(reactNative.TouchableOpacity, {
    style: styles.fullScreenContainer,
    onPress: onFullScreen
  }, React__default.createElement(reactNative.Image, {
    source: fullScreenImage
  })));
};

var Toolbar = function Toolbar(_ref) {
  var children = _ref.children;
  return React__default.createElement(React__default.Fragment, null, children);
};

var MediaControls = function MediaControls(props) {
  var _props$containerStyle = props.containerStyle,
      customContainerStyle = _props$containerStyle === void 0 ? {} : _props$containerStyle,
      duration = props.duration,
      _props$fadeOutDelay = props.fadeOutDelay,
      fadeOutDelay = _props$fadeOutDelay === void 0 ? 5000 : _props$fadeOutDelay,
      _props$isLoading = props.isLoading,
      isLoading = _props$isLoading === void 0 ? false : _props$isLoading,
      _props$mainColor = props.mainColor,
      mainColor = _props$mainColor === void 0 ? "rgba(12, 83, 175, 0.9)" : _props$mainColor,
      onFullScreen = props.onFullScreen,
      onReplayCallback = props.onReplay,
      onSeek = props.onSeek,
      onSeeking = props.onSeeking,
      playerState = props.playerState,
      progress = props.progress,
      _props$showOnStart = props.showOnStart,
      showOnStart = _props$showOnStart === void 0 ? true : _props$showOnStart,
      sliderStyle = props.sliderStyle,
      onVolumeChange = props.onVolumeChange,
      volume = props.volume;

  var _ref = function () {
    if (showOnStart) {
      return {
        initialOpacity: 1,
        initialIsVisible: true
      };
    }

    return {
      initialOpacity: 0,
      initialIsVisible: false
    };
  }(),
      initialOpacity = _ref.initialOpacity,
      initialIsVisible = _ref.initialIsVisible;

  var _useState = React.useState(new reactNative.Animated.Value(initialOpacity)),
      opacity = _useState[0];

  var _useState2 = React.useState(initialIsVisible),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var _useState3 = React.useState(initialIsVisible),
      isSliderVisible = _useState3[0],
      setIsSliderVisible = _useState3[1];

  var fadeOutControls = function fadeOutControls(delay) {
    if (delay === void 0) {
      delay = 0;
    }

    reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay: delay,
      useNativeDriver: false
    }).start(function (result) {
      /* I noticed that the callback is called twice, when it is invoked and when it completely finished
      This prevents some flickering */
      if (result.finished) {
        setIsVisible(false);
      }
    });
  };

  React.useEffect(function () {
    fadeOutControls(fadeOutDelay); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var handleVolumePress = function handleVolumePress() {
    onVolumeChange();
  };

  var fadeInControls = function fadeInControls(loop) {
    if (loop === void 0) {
      loop = true;
    }

    setIsVisible(true);

    if (!isSliderVisible) {
      setIsSliderVisible(true);
    }

    reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false
    }).start(function () {
      if (loop) {
        fadeOutControls(fadeOutDelay);
      }
    });
  };

  var onReplay = function onReplay() {
    fadeOutControls(fadeOutDelay);
    onReplayCallback();
  };

  var cancelAnimation = function cancelAnimation() {
    return opacity.stopAnimation(function () {
      return setIsVisible(true);
    });
  };

  var onPause = function onPause() {
    var pState = props.playerState,
        onPaused = props.onPaused;
    var PLAYING = exports.PLAYER_STATES.PLAYING,
        PAUSED = exports.PLAYER_STATES.PAUSED;

    switch (pState) {
      case PLAYING:
        {
          cancelAnimation();
          break;
        }

      case PAUSED:
        {
          fadeOutControls(fadeOutDelay);
          break;
        }
    }

    var newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  var toggleControls = function toggleControls() {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    opacity.stopAnimation(function (value) {
      setIsVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  return React__default.createElement(reactNative.TouchableWithoutFeedback, {
    accessible: false,
    onPress: toggleControls
  }, React__default.createElement(reactNative.Animated.View, {
    style: [styles.container, customContainerStyle, {
      opacity: opacity
    }]
  }, isVisible && React__default.createElement(reactNative.View, {
    style: [styles.container, customContainerStyle]
  }, React__default.createElement(Slider, {
    progress: progress,
    duration: duration,
    mainColor: mainColor,
    onFullScreen: onFullScreen,
    playerState: playerState,
    onSeek: onSeek,
    onSeeking: onSeeking,
    onPause: onPause,
    customSliderStyle: sliderStyle
  }), React__default.createElement(Controls, {
    onPause: onPause,
    onReplay: onReplay,
    isLoading: isLoading,
    mainColor: mainColor,
    playerState: playerState,
    onVolumePress: handleVolumePress,
    volume: volume
  }))));
};

MediaControls.Toolbar = Toolbar;

exports.default = MediaControls;
//# sourceMappingURL=react-native-media-controls.cjs.development.js.map
