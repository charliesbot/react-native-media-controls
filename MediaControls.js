import React, {Component, PropTypes} from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Animated,
  Image,
  UIManager,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './MediaControlsStyles';
import Utils from './Utils';
import {PLAYER_STATE} from './Constants';
import Slider from 'react-native-slider';

class MediaControls extends Component {
  constructor(props) {
    super(props);
    this.toggleControls = this.toggleControls.bind(this);
    this.dragging = this.dragging.bind(this);
    this.seekVideo = this.seekVideo.bind(this);
    this.state = {
      opacity: new Animated.Value(1),
      isVisible: true,
    };
  }

  componentDidMount() {
    // TODO remove when android supports animations
    if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);
    this.fadeOutControls(5000);
  }

  getPlayerStateIcon(playerState) {
    switch (playerState) {
      case PLAYER_STATE.PAUSED:
        return require('./assets/ic_play.png');
      case PLAYER_STATE.PLAYING:
        return require('./assets/ic_pause.png');
      case PLAYER_STATE.ENDED:
        return require('./assets/ic_replay.png');
    }
  }

  setPlayerControls(playerState) {
    let icon = this.getPlayerStateIcon(playerState);
    let pressAction =
      playerState === PLAYER_STATE.ENDED ? this.props.onReplay : this.props.onPaused;
    return (
      <TouchableOpacity
        style={[styles.playButton]}
        onPress={pressAction}
      >
        <Image source={icon} style={styles.playIcon}
        />
      </TouchableOpacity>
    );
  }

  setLoadingView() {
    return (
      <ActivityIndicator size="large" color="#FFF"/>
    );
  }

  toggleControls() {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    this.state.opacity.stopAnimation(
      (value) => {
        this.setState({isVisible: !!value});
        value ? this.fadeOutControls() : this.fadeInControls();
      });
  }

  fadeOutControls(delay = 0) {
    Animated.timing(this.state.opacity, {toValue: 0, duration: 300, delay}).start(() => {
      this.setState({isVisible: false});
    });
  }

  fadeInControls() {
    this.setState({isVisible: true});
    Animated.timing(this.state.opacity, {toValue: 1, duration: 300, delay: 0}).start(() => {
      this.fadeOutControls(5000);
    });
  }

  dragging() {
    if (this.props.playerState === PLAYER_STATE.PAUSED) return;
    this.props.onPaused();
  }

  seekVideo(value) {
    this.props.onSeek(value);
    this.props.onPaused();
  }

  renderControls() {
    //this let us block the controls
    if (!this.state.isVisible) return null;
    return (
      <View style={styles.container}>
        <View style={[styles.controlsRow, styles.toolbarRow]}>
          {this.props.toolbar}
        </View>
        <View style={[styles.controlsRow]}>
          {
            this.props.isLoading
              ? this.setLoadingView()
              : this.setPlayerControls(this.props.playerState)
          }
        </View>
        <View style={[styles.controlsRow, styles.progressContainer]}>
          <View style={styles.progressColumnContainer}>
            <View style={[styles.timerLabelsContainer]}>
              <Text style={styles.timerLabel}>
                {Utils.humanizeVideoDuration(this.props.progress)}
              </Text>
              <Text style={styles.timerLabel}>
                {Utils.humanizeVideoDuration(this.props.duration)}
              </Text>
            </View>
            <Slider
              style={styles.progressSlider}
              onValueChange={this.dragging}
              onSlidingComplete={this.seekVideo}
              maximumValue={Math.floor(this.props.duration)}
              value={Math.floor(this.props.progress)}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              minimumTrackTintColor={'#0C53B0'}
            />
          </View>
          <TouchableOpacity style={styles.fullScreenContainer} onPress={this.props.onFullScreen}>
            <Image source={require('./assets/ic_fullscreen.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.toggleControls}>
        <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
          {this.renderControls()}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

MediaControls.propTypes = {
  toolbar: PropTypes.node,
  isLoading: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  progress: PropTypes.number,
  duration: PropTypes.number,
  playerState: PropTypes.number,
  onFullScreen: PropTypes.func,
  onPaused: PropTypes.func,
  onReplay: PropTypes.func,
  onSeek: PropTypes.func,
};

export default MediaControls;

