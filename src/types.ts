import { GestureResponderEvent } from 'react-native';
import PLAYER_STATES from './constants';

export type Props = {
  toolbar: React.ReactNode;
  mainColor: string;
  isLoading: boolean;
  progress: number;
  duration: number;
  isFullScreen: boolean;
  playerState: PLAYER_STATES;
  onFullScreen: (event: GestureResponderEvent) => void;
  fadeOutDelay?: number;
  onPaused: Function;
  onReplay: Function;
  onSeek: Function;
  onSeeking: Function;
};
