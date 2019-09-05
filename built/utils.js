'use strict';
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const constants_1 = __importDefault(require('./constants'));
exports.humanizeVideoDuration = function(seconds) {
  const _a = seconds >= 3600 ? [11, 8] : [14, 5],
    begin = _a[0],
    end = _a[1];
  const date = new Date();
  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};
exports.noop = function() {};
exports.getPlayerStateIcon = function(playerState) {
  switch (playerState) {
    case constants_1.default.PAUSED:
      return require('./assets/ic_play.png');
    case constants_1.default.PLAYING:
      return require('./assets/ic_pause.png');
    case constants_1.default.ENDED:
      return require('./assets/ic_replay.png');
    default:
      return null;
  }
};
//# sourceMappingURL=utils.js.map
