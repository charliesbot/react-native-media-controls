import React from "react";
import { TouchableOpacity, View, Text, Image, ViewStyle } from "react-native";
import RNSlider from "react-native-slider";
import styles from "./MediaControls.style";
import { humanizeVideoDuration } from "./utils";
import { Props as MediaControlsProps } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

const getAccessibilityProps = (isFullScreen: boolean) => ({
  accessible: true,
  accessibilityLabel: isFullScreen
    ? "Tap to Exit Fullscreen"
    : "Tap to Enter Fullscreen",
  accessibilityHint: "Toggles Fullscreen View",
});

export type CustomSliderStyle = {
  containerStyle: ViewStyle;
  trackStyle: ViewStyle;
  thumbStyle: ViewStyle;
};

type Props = Pick<
  MediaControlsProps,
  | "progress"
  | "duration"
  | "mainColor"
  | "onFullScreen"
  | "playerState"
  | "onSeek"
  | "onSeeking"
> & {
  onPause: () => void;
  customSliderStyle?: CustomSliderStyle;
};

const fullScreenImage = require("./assets/ic_fullscreen.png");

const Slider = (props: Props) => {
  const {
    customSliderStyle,
    duration,
    mainColor,
    onFullScreen,
    onPause,
    progress,
  } = props;

  const containerStyle = customSliderStyle?.containerStyle || {};
  const customTrackStyle = customSliderStyle?.trackStyle || {};
  const customThumbStyle = customSliderStyle?.thumbStyle || {};

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

  const isFullscreen = Boolean(onFullScreen);

  return (
    <View
      style={[styles.controlsRow, styles.progressContainer, containerStyle]}
    >
      <View style={styles.progressColumnContainer}>
        <View style={[styles.timerLabelsContainer]}>
          <Text style={styles.timerLabel}>
            {humanizeVideoDuration(progress)}
          </Text>
          <Text style={styles.timerLabel}>
            {humanizeVideoDuration(duration)}
          </Text>
        </View>
        <RNSlider
          style={[styles.progressSlider]}
          onValueChange={dragging}
          onSlidingComplete={seekVideo}
          maximumValue={Math.floor(duration)}
          value={Math.floor(progress)}
          trackStyle={[styles.track, customTrackStyle]}
          thumbStyle={[
            styles.thumb,
            customThumbStyle,
            { borderColor: mainColor },
          ]}
          minimumTrackTintColor={mainColor}
        />
      </View>
      {isFullscreen && (
        <TouchableOpacity
          style={styles.fullScreenContainer}
          onPress={onFullScreen}
          {...getAccessibilityProps(isFullscreen)}
        >
          <Image source={fullScreenImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { Slider };
