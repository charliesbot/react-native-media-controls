'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var RNSlider = _interopDefault(require('react-native-slider'));

var containerBackgroundColor = "rgba(45, 59, 62, 0.4)";
var playButtonBorderColor = "rgba(255,255,255,0.5)";
var white = "#fff";
var styles = /*#__PURE__*/reactNative.StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: containerBackgroundColor,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center"
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 20
  },
  playButton: {
    alignItems: "center",
    borderColor: playButtonBorderColor,
    borderRadius: 3,
    borderWidth: 1.5,
    height: 50,
    justifyContent: "center",
    width: 50
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22
  },
  progressColumnContainer: {
    flex: 1
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -25
  },
  progressSlider: {
    alignSelf: "stretch"
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25
  },
  thumb: {
    backgroundColor: white,
    borderRadius: 50,
    borderWidth: 3,
    height: 20,
    width: 20
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
      return require("./assets/ic_play.png");

    case exports.PLAYER_STATES.PLAYING:
      return require("./assets/ic_pause.png");

    case exports.PLAYER_STATES.ENDED:
      return require("./assets/ic_replay.png");

    default:
      return null;
  }
};

var Controls = function Controls(props) {
  var isLoading = props.isLoading,
      mainColor = props.mainColor,
      playerState = props.playerState,
      onReplay = props.onReplay,
      onPause = props.onPause;
  var icon = getPlayerStateIcon(playerState);
  var pressAction = playerState === exports.PLAYER_STATES.ENDED ? onReplay : onPause;
  var content = isLoading ? React__default.createElement(reactNative.ActivityIndicator, {
    size: "large",
    color: "#FFF"
  }) : React__default.createElement(reactNative.TouchableOpacity, {
    style: [styles.playButton, {
      backgroundColor: mainColor
    }],
    onPress: pressAction
  }, React__default.createElement(reactNative.Image, {
    source: icon,
    style: styles.playIcon
  }));
  return React__default.createElement(reactNative.View, {
    style: [styles.controlsRow]
  }, content);
};

var fullScreenImage = /*#__PURE__*/require("./assets/ic_fullscreen.png");

var Slider = function Slider(props) {
  var progress = props.progress,
      duration = props.duration,
      mainColor = props.mainColor,
      onFullScreen = props.onFullScreen,
      onPause = props.onPause;

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
    style: [styles.controlsRow, styles.progressContainer]
  }, React__default.createElement(reactNative.View, {
    style: styles.progressColumnContainer
  }, React__default.createElement(reactNative.View, {
    style: [styles.timerLabelsContainer]
  }, React__default.createElement(reactNative.Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(progress)), React__default.createElement(reactNative.Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(duration))), React__default.createElement(RNSlider, {
    style: styles.progressSlider,
    onValueChange: dragging,
    onSlidingComplete: seekVideo,
    maximumValue: Math.floor(duration),
    value: Math.floor(progress),
    trackStyle: styles.track,
    thumbStyle: [styles.thumb, {
      borderColor: mainColor
    }],
    minimumTrackTintColor: mainColor
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
  var children = props.children,
      duration = props.duration,
      _props$isLoading = props.isLoading,
      isLoading = _props$isLoading === void 0 ? false : _props$isLoading,
      onFullScreen = props.onFullScreen,
      playerState = props.playerState,
      progress = props.progress,
      onReplayCallback = props.onReplay,
      _props$fadeOutDelay = props.fadeOutDelay,
      fadeOutDelay = _props$fadeOutDelay === void 0 ? 5000 : _props$fadeOutDelay,
      _props$mainColor = props.mainColor,
      mainColor = _props$mainColor === void 0 ? "rgba(12, 83, 175, 0.9)" : _props$mainColor,
      onSeeking = props.onSeeking,
      onSeek = props.onSeek;

  var _useState = React.useState(new reactNative.Animated.Value(1)),
      opacity = _useState[0];

  var _useState2 = React.useState(true),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

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

  var fadeInControls = function fadeInControls(loop) {
    if (loop === void 0) {
      loop = true;
    }

    setIsVisible(true);
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
    var playerState = props.playerState,
        onPaused = props.onPaused;
    var PLAYING = exports.PLAYER_STATES.PLAYING,
        PAUSED = exports.PLAYER_STATES.PAUSED;

    switch (playerState) {
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
    onPress: toggleControls
  }, React__default.createElement(reactNative.Animated.View, {
    style: [styles.container, {
      opacity: opacity
    }]
  }, isVisible && React__default.createElement(reactNative.View, {
    style: styles.container
  }, React__default.createElement(reactNative.View, {
    style: [styles.controlsRow, styles.toolbarRow]
  }, children), React__default.createElement(Controls, {
    onPause: onPause,
    onReplay: onReplay,
    isLoading: isLoading,
    mainColor: mainColor,
    playerState: playerState
  }), React__default.createElement(Slider, {
    progress: progress,
    duration: duration,
    mainColor: mainColor,
    onFullScreen: onFullScreen,
    playerState: playerState,
    onSeek: onSeek,
    onSeeking: onSeeking,
    onPause: onPause
  }))));
};

MediaControls.Toolbar = Toolbar;

exports.default = MediaControls;
//# sourceMappingURL=react-native-media-controls.cjs.development.js.map
