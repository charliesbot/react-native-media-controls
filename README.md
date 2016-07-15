# react-native-media-controls
A sweet UI component to manipulate your media

![mediac](https://cloud.githubusercontent.com/assets/10927770/16887015/3380f59a-4a9d-11e6-9e3f-8d1ca29aea03.gif)

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
##Props##
| Prop         | Type     | Optional | Default                | Description                                                          |
|--------------|----------|----------|------------------------|----------------------------------------------------------------------|
| toolbar      | node     | Yes      |                        | Add a custom view on the top of the controls                         |
| mainColor    | string   | Yes      | rgba(12, 83, 175, 0.9) | Change custom color to the media controls                            |
| isLoading    | bool     | Yes      | false                  | When is loading                                                      |
| isFullScreen | bool     | Yes      | false                  | To change icon state of fullscreen                                   |
| progress     | number   | No       |                        | Current time of the media player                                     |
| duration     | number   | No       |                        | Total duration of the media                                          |
| playerState  | number   | No       |                        | Could be PLAYING, PAUSED or ENDED (take a look at constants section) |
| onFullScreen | function | Yes      |                        | Triggered when the fullscreen button is pressed                      |
| onPaused     | function | No       |                        | Triggered when the play/pause button is pressed                      |
| onReplay     | function | Yes      |                        | Triggered when the replay button is pressed                          |
| onSeek       | function | No       |                        | Triggered when the user is interacting with the slider               |

##Constants##
```js
  PLAYING,
  PAUSED,
  ENDED,
```  
##Example##
Refer to the example folder to find an implementation of this project

