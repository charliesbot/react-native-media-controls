// @flow

export const humanizeVideoDuration = (seconds: number) => {
  const [begin, end] = seconds >= 3600 ? [11, 8] : [14, 5];
  // $FlowFixMe
  const date = new Date(null);

  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};

export const noop = () => {};
