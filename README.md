# react-native-media-controls
A sweet UI component to manipulate your media

##Installation
`npm i react-native-media-controls --save`

##Usage##
```js
// Require the module
import {MediaControls, PLAYER_STATE} from 'react-native-media-controls';

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

```
##Constants##
```js
  PLAYING,
  PAUSED,
  ENDED,
```  
##Example##
Refer to the example folder to find an implementation of this project

