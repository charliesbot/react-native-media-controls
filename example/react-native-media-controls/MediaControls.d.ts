import React from "react";
import { GestureResponderEvent } from "react-native";
import { PLAYER_STATES } from "./constants/playerStates";
interface MediaControlsComposition {
    Toolbar: React.FC;
}
export declare type Props = {
    mainColor: string;
    isLoading: boolean;
    progress: number;
    duration: number;
    isFullScreen: boolean;
    playerState: PLAYER_STATES;
    onFullScreen: (event: GestureResponderEvent) => void;
    fadeOutDelay?: number;
    onPaused: (playerState: PLAYER_STATES) => void;
    onReplay: () => void;
    onSeek: (value: number) => void;
    onSeeking: (value: number) => void;
};
declare const MediaControls: React.FC<Props> & MediaControlsComposition;
export default MediaControls;
