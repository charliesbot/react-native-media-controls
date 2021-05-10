import { Props } from "./MediaControls";
declare type ControlsProps = Pick<Props, "isLoading" | "mainColor" | "playerState" | "onReplay"> & {
    onPause: () => void;
    onVolumePress: () => void;
    volume: number;
};
declare const Controls: (props: ControlsProps) => JSX.Element;
export { Controls };
