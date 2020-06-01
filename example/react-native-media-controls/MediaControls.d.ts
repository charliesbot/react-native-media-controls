import React from "react";
import { GestureResponderEvent } from "react-native";
import { PLAYER_STATES } from "./constants/playerStates";
interface MediaControlsComposition {
    Toolbar: React.FC;
}
export declare type Props = {
    duration: number;
    fadeOutDelay?: number;
    isFullScreen: boolean;
    isLoading: boolean;
    mainColor: string;
    onFullScreen?: (event: GestureResponderEvent) => void;
    onPaused: (playerState: PLAYER_STATES) => void;
    onReplay: () => void;
    onSeek: (value: number) => void;
    onSeeking: (value: number) => void;
    playerState: PLAYER_STATES;
    progress: number;
    showOnStart?: boolean;
};
declare const MediaControls: React.FC<Props> & MediaControlsComposition;
export default MediaControls;
