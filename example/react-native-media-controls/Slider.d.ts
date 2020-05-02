import React from "react";
import { Props } from "./MediaControls";
declare type SliderProps = Pick<Props, "progress" | "duration" | "mainColor" | "onFullScreen" | "playerState" | "onSeek" | "onSeeking"> & {
    onPause: () => void;
};
declare const Slider: React.FC<SliderProps>;
export { Slider };
