# react-native-media-controls
A sweet UI component to manipulate your media

![mediac](https://cloud.githubusercontent.com/assets/10927770/16887015/3380f59a-4a9d-11e6-9e3f-8d1ca29aea03.gif)

## Installation
`yarn add react-native-media-controls`

## Usage
```js
// Require the module
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const Main = () => {
    [...]
    [...]
    return (
      <View style={styles.container}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode="cover"
          source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
          style={styles.mediaPlayer}
          volume={0.0}
        />
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="orange"
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        />
      </View>
    );
  }

```
## Props
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
| onPaused     | function | No       |                        | Triggered when the play/pause button is pressed. It returns the new toggled value (PLAYING or PAUSED)                     |
| onReplay     | function | Yes      |                        | Triggered when the replay button is pressed                          |
| onSeek       | function | No       |                        | Triggered when the user released the slider                          |
| onSeeking    | function | Yes      |                        | Triggered when the user is interacting with the slider               |

## Constants 
```js
  PLAYING,
  PAUSED,
  ENDED,
```  
## Example
Refer to the example folder to find an implementation of this project

