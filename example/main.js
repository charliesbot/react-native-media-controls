/**
 * Created by Charlie on 7/5/16.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Video from 'react-native-video';
import {MediaControls, PLAYER_STATE} from 'react-native-media-controls';


class Main extends Component {
  constructor(props) {
    super(props);
    this.exitFullScreen = this.exitFullScreen.bind(this);
    this.onFullScreen = this.onFullScreen.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onPaused = this.onPaused.bind(this);
    this.onReplay = this.onReplay.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.state = {
      isLoading: true,
      isFullScreen: false,
      playerState: PLAYER_STATE.PLAYING,
      paused: false,
      currentTime: 0,
      duration: 0,
    }
  }

  onSeek(seek) {
    this.refs.videoPlayer.seek(seek);
  };

  onPaused() {
    this.setState({
      paused: !this.state.paused,
      playerState: !this.state.paused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
    });
  };

  onReplay() {
    this.setState({playerState: PLAYER_STATE.PLAYING});
    this.refs.videoPlayer.seek(0);
  }

  onProgress(data) {
    if (this.state.isLoading) return null;
    this.setState({currentTime: data.currentTime});
  };

  onLoad(data) {
    this.setState({duration: data.duration, isLoading: false});
  };

  onLoadStart(data) {
    this.setState({isLoading: true});
  };

  onEnd() {
    this.setState({playerState: PLAYER_STATE.ENDED});
  };

  onError() {
    console.log("test test ", error);
  };

  exitFullScreen() {
  };

  enterFullScreen() {
  }

  onFullScreen() {
  };

  renderToolbar() {
    return (
      <View style={styles.toolbar}></View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          ref="videoPlayer"
          style={styles.mediaPlayer}
          resizeMode="cover"
          source={{uri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
          volume={0.0}
          paused={this.state.paused}
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
        />
        <MediaControls
          mainColor="orange"
          toolbar={this.renderToolbar()}
          playerState={this.state.playerState}
          isLoading={this.state.isLoading}
          progress={this.state.currentTime}
          duration={this.state.duration}
          onPaused={this.onPaused}
          onSeek={this.onSeek}
          onReplay={this.onReplay}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: 'blue',
    height: 20,
    width: 20,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

export default Main;
