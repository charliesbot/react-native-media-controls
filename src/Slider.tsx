import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import RNSlider from "react-native-slider";
import styles from "./MediaControls.style";
import { humanizeVideoDuration } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

export type CustomSliderStyle = {
  style: any;
  trackStyle: any;
  thumbStyle: any;
};

type SliderProps = Pick<
  Props,
  | "progress"
  | "duration"
  | "mainColor"
  | "onFullScreen"
  | "playerState"
  | "onSeek"
  | "onSeeking"
> & {
  onPause: () => void;
  customSliderStyle: CustomSliderStyle;
};

const fullScreenImage = require("./assets/ic_fullscreen.png");

const Slider: React.FC<SliderProps> = props => {
  const {
    customSliderStyle,
    duration,
    mainColor,
    onFullScreen,
    onPause,
    progress,
  } = props;

  const {
    style: customStyle = {},
    trackStyle: customTrackStyle = {},
    thumbStyle: customThumbStyle = {},
  } = customSliderStyle;

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
        <RNSlider
          style={[styles.progressSlider, customStyle]}
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
