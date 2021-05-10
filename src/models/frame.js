export const defaultFrameModel = (frameNumber) => ({
  frameNumber,
  leftBox: undefined,
  rightBox: undefined,
  ...(frameNumber === 10) && { bonusBox: undefined },
  isActive: frameNumber === 1,
  score: undefined,
});

// For testing
export const EXAMPLE = {
  REGULAR: [3],
  REGULAR_COMPLETED: [4, 4],
  SPARE: [9, 1],
  STRIKE: [10],
};
