/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

const containerBackgroundColor = "rgba(45, 59, 62, 0.4)";
const playButtonBorderColor = "rgba(255,255,255,0.5)";
const white = "#fff";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: containerBackgroundColor,
    backgroundColor: "blue",
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0,
  },
  controlsRow: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 20,
  },
  playButton: {
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginRight: 10,
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22,
    alignSelf: "center",
  },
  progressColumnContainer: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  progressSlider: {
    alignSelf: "stretch",
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25,
    color: "white",
  },
  thumb: {
    backgroundColor: white,
    borderRadius: 15 / 2,
    borderWidth: 3,
    height: 15,
    width: 15,
  },
  timeRow: {
    alignSelf: "stretch",
  },
  timerLabel: {
    color: white,
    fontSize: 12,
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7,
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
    height: 5,
  },
  controllerContainer: {
    width: "100%",
    flexDirection: "row",
  },
});
