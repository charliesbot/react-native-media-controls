import PLAYER_STATES from "constants/playerStates";

export const getPlayerStateIcon = (playerState: PLAYER_STATES) => {
  switch (playerState) {
    case PLAYER_STATES.PAUSED:
      return require("./assets/ic_play.png");
    case PLAYER_STATES.PLAYING:
      return require("./assets/ic_pause.png");
    case PLAYER_STATES.ENDED:
      return require("./assets/ic_replay.png");
    default:
      return null;
  }
};
