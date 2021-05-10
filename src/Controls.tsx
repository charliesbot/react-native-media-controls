import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "./MediaControls.style";
import { getPlayerStateIcon, getPlayerVolume } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

type ControlsProps = Pick<
  Props,
  "isLoading" | "mainColor" | "playerState" | "onReplay"
> & {
  onPause: () => void;
  onVolumePress: () => void;
  volume: number;
};

const Controls = (props: ControlsProps) => {
  const { playerState, volume, onReplay, onPause, onVolumePress } = props;
  const icon = getPlayerStateIcon(playerState);
  const volumeIcon = getPlayerVolume(volume);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
  const handleVolumeActionPress = () => {
    onVolumePress();
  };

  const content = (
    <View style={styles.controllerContainer}>
      <TouchableOpacity
        style={[styles.playButton]}
        activeOpacity={1}
        onPress={pressAction}
        accessibilityLabel={
          PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause"
        }
        accessibilityHint="Plays and Pauses the Video"
      >
        <Image source={icon} style={styles.playIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.playButton]}
        onPress={handleVolumeActionPress}
        activeOpacity={1}
        accessibilityLabel={
          volume === 0
            ? "Player muted"
            : volume === 0.5
            ? "Player volume medium"
            : "Player volume high"
        }
        accessibilityHint="Indicates player volume"
      >
        <Image source={volumeIcon} style={styles.playIcon} />
      </TouchableOpacity>
    </View>
  );

  return <View style={[styles.controlsRow]}>{content}</View>;
};

export { Controls };
