# react-native-media-controls
A sweet UI component to manipulate your media. Strongly typed using Typescript.

![mediac](https://cloud.githubusercontent.com/assets/10927770/16887015/3380f59a-4a9d-11e6-9e3f-8d1ca29aea03.gif)

## Installation
```bash
   yarn add react-native-media-controls
   yarn add react-native-slider
```

## Usage
```js
// Require the module
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const App = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  // ... ... ...
  // ... ... ...

  return (
    <View style={styles.container}>
      <Video
        {...videoProps}
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="orange"
        onFullScreen={noop}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
      >
        <MediaControls.Toolbar>
          <View style={styles.toolbar}>
            <Text>I'm a custom toolbar </Text>
          </View>
        </MediaControls.Toolbar>
      </MediaControls>
    </View>
  );
};

```
## Props
| Prop         | Type     | Optional | Default                | Description                                                          |
|--------------|----------|----------|------------------------|----------------------------------------------------------------------|
| mainColor    | string   | Yes      | rgba(12, 83, 175, 0.9) | Change custom color to the media controls                            |
| isLoading    | boolean  | Yes      | false                  | When is loading                                                      |
| isFullScreen | boolean  | Yes      | false                  | To change icon state of fullscreen                                   |
| fadeOutDelay | number   | Yes      | 5000                   | Allows to customize the delay between fade in and fade out transition|
| progress     | number   | No       |                        | Current time of the media player                                     |
| duration     | number   | No       |                        | Total duration of the media                                          |
| playerState  | number   | No       |                        | Could be PLAYING, PAUSED or ENDED (take a look at constants section) |
| onFullScreen | function | Yes      |                        | Triggered when the fullscreen button is pressed. If not provided, the fullscreen icon is not displayed                    |
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
