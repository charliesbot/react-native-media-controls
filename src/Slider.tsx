import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ViewStyle,
  Platform,
} from "react-native";
import RNSlider from "react-native-slider";
import styles from "./MediaControls.style";
import { getPlayerStateIcon, humanizeVideoDuration } from "./utils";
import { Props as MediaControlsProps } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

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
  isMute: boolean;
  onMutePress: () => void;
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
    onMutePress,
    isMute = false,
  } = props;

  const containerStyle = customSliderStyle?.containerStyle || {};
  const customTrackStyle = customSliderStyle?.trackStyle || {};
  const customThumbStyle = customSliderStyle?.thumbStyle || {};
  const iconVolume = getPlayerStateIcon(
    isMute ? PLAYER_STATES.MUTE : PLAYER_STATES.UN_MUTE,
  );

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
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={styles.timerLabel}>{humanizeVideoDuration(progress)}</Text>
        <RNSlider
          style={[styles.progressSlider]}
          onValueChange={dragging}
          onSlidingComplete={seekVideo}
          maximumValue={Math.floor(duration)}
          value={Math.floor(progress)}
          trackStyle={[styles.track, customTrackStyle]}
          thumbStyle={[styles.thumb, customThumbStyle]}
          minimumTrackTintColor={"white"}
        />
        <Text style={styles.timerLabel}>{humanizeVideoDuration(duration)}</Text>
        <TouchableOpacity
          style={styles.fullScreenContainer}
          onPress={onMutePress}
        >
          <Image source={iconVolume} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        {Boolean(onFullScreen) && (
          <TouchableOpacity
            style={styles.fullScreenContainer}
            onPress={onFullScreen}
          >
            <Image source={fullScreenImage} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export { Slider };
