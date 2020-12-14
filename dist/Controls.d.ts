/// <reference types="react" />
import { Props } from "./MediaControls";
declare type ControlsProps = Pick<Props, "isLoading" | "mainColor" | "playerState" | "onReplay"> & {
    onPause: () => void;
};
declare const Controls: (props: ControlsProps) => JSX.Element;
export { Controls };
