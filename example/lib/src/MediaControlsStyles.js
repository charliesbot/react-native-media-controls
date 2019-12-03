// @flow

// eslint ignore next $FlowFixMe
import { StyleSheet } from 'react-native';

export const _playButton = (width, height, borderColor, backgroundColor) => ({
  width,
  height,
  borderColor,
  backgroundColor,
  borderRadius: 3,
  borderWidth: 1.5,
  alignItems: 'center',
  justifyContent: 'center',
});

export const container = backgroundColor => ({
  flex: 1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor,
  position: 'absolute',
  paddingVertical: 13,
  alignItems: 'center',
  paddingHorizontal: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export default StyleSheet.create({
  controlsRow: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timeRow: {
    alignSelf: 'stretch',
  },
  playIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  progressContainer: {
    marginBottom: -25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progressColumnContainer: {
    flex: 1,
  },
  fullScreenContainer: {
    paddingLeft: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSlider: {
    alignSelf: 'stretch',
  },
  timerLabelsContainer: {
    marginBottom: -7,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerLabel: {
    fontSize: 12,
    color: 'white',
  },
  track: {
    height: 5,
    borderRadius: 1,
  },
  thumb: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
