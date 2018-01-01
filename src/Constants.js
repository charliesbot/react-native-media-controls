// @flow

const PLAYER_STATES = {
  PLAYING: 0,
  PAUSED: 1,
  ENDED: 2,
};

export type PlayerState = $Keys<typeof PLAYER_STATES>;
export default PLAYER_STATES;
