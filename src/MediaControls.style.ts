import { StyleSheet } from "react-native";

const containerBackgroundColor = "rgba(45, 59, 62, 0.1)";
const playButtonBorderColor = "rgba(255,255,255,0.5)";
const white = "#fff";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: containerBackgroundColor,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    top: 0,
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 10,
  },
  playButton: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  playIcon: {
    height: 40,
    resizeMode: "contain",
    width: 40,
  },
  progressColumnContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -25,
  },
  progressSlider: {
    alignSelf: "stretch",
    flex: 1,
    marginStart: 8,
    marginEnd: 8,
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25,
  },
  thumb: {
    backgroundColor: white,
    height: 16,
    width: 16,
  },
  timeRow: {
    alignSelf: "stretch",
  },
  timerLabel: {
    color: white,
    fontSize: 12,
  },
  timerLabelsContainer: {
    flexDirection: "row",
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  track: {
    borderRadius: 1,
    height: 3,
  },
});
