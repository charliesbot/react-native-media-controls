import React from "react";
import { TouchableOpacity, View, Text, Image, ViewStyle } from "react-native";
import CSlider from "@react-native-community/slider";
import styles from "./MediaControls.style";
import { humanizeVideoDuration } from "./utils";
import { Props as MediaControlsProps } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

export type CustomSliderStyle = {
  containerStyle: ViewStyle;
  trackStyle: ViewStyle;
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
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  thumbTintColor?: string;
  disableTrack?: boolean;
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
    maximumTrackTintColor,
    minimumTrackTintColor,
    thumbTintColor,
    disableTrack,
  } = props;

  const containerStyle = customSliderStyle?.containerStyle || {};
  const customTrackStyle = customSliderStyle?.trackStyle || {};

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
        <CSlider
          style={[styles.progressSlider, customTrackStyle]}
          onValueChange={dragging}
          onSlidingComplete={seekVideo}
          maximumValue={Math.floor(duration)}
          value={Math.floor(progress)}
          thumbTintColor={thumbTintColor ? thumbTintColor : mainColor}
          minimumTrackTintColor={
            minimumTrackTintColor ? minimumTrackTintColor : mainColor
          }
          maximumTrackTintColor={
            maximumTrackTintColor ? maximumTrackTintColor : mainColor
          }
          disabled={disableTrack}
        />
        {/* <RNSlider
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
        /> */}
      </View>
      {Boolean(onFullScreen) && (
        <TouchableOpacity
          style={styles.fullScreenContainer}
          onPress={onFullScreen}
        >
          <Image source={fullScreenImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { Slider };
