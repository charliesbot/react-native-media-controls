import { PLAYER_STATES } from "./constants/playerStates";

export const humanizeVideoDuration = (seconds: number) => {
  const [begin, end] = seconds >= 3600 ? [11, 8] : [14, 5];
  const date = new Date(0);

  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};

export const noop = () => {};

export const getPlayerStateIcon = (playerState: PLAYER_STATES) => {
  switch (playerState) {
    case PLAYER_STATES.PAUSED:
      return require("./assets/ic_play_new.png");
    case PLAYER_STATES.PLAYING:
      return require("./assets/ic_pause_new.png");
    case PLAYER_STATES.ENDED:
      return require("./assets/ic_replay.png");
    default:
      return null;
  }
};

export const getPlayerVolume = (volume: number) => {
  switch (volume) {
    case 0:
      return require("./assets/ic_volume_mute.png");
    case 0.5:
      return require("./assets/ic_volume_medium.png");
    case 1:
      return require("./assets/ic_volume_high.png");
  }
};
