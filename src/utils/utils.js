import { compose, inc, times } from 'ramda';
import { defaultFrameModel } from '@/models/frame';

export const isFrameCompleted = (frame) => frame.length === 2;
export const isSpare = (frame) => isFrameCompleted(frame) && (frame[0] + frame[1]) === 10;
export const isStrike = (frame) => frame.length === 1 && frame[0] === 10;

export const initializeBowlingGame = () => times(compose(defaultFrameModel, inc), 10);

export const getDefaultState = () => ({
  activeFrameNumber: 0,
  bowlingGameView: initializeBowlingGame(),
  frames: [],
  pinsLeft: 10,
  scores: [],
});

export const frameViewConverter = (frame, isLastFrame = false) => {
  let frameView;

  if (isStrike(frame)) {
    frameView = isLastFrame ? ['X'] : [undefined, 'X'];
  } else if (isSpare(frame)) {
    frameView = [frame[0], '/'];
  } else {
    frameView = frame;
  }

  return frameView;
};

export const lastFrameViewConverter = (frame, bonusFrame, extraBonusFrame) => {
  const hasBonusRounds = isStrike(frame) || isSpare(frame);
  let frameView = frameViewConverter(frame, true);

  if (hasBonusRounds && frameView.length !== 3) {
    const second = frameViewConverter(bonusFrame, true);
    frameView = [...frameView, ...second];
  }

  if (hasBonusRounds && frameView.length !== 3) {
    const third = frameViewConverter(extraBonusFrame, true);
    frameView = [...frameView, ...third];
  }

  return frameView;
};

export const mapBowlingGameView = (state) => {
  const {
    activeFrameNumber, bowlingGameView, frames, scores,
  } = state;

  return bowlingGameView.map((viewFrame, index) => {
    if (viewFrame.score) { // Frame has already been calculated
      return { ...viewFrame };
    }

    const isLastFrame = viewFrame.frameNumber === 10;
    const isActive = (index === activeFrameNumber) || (isLastFrame && activeFrameNumber >= 9);
    const frame = frames[index];

    if (!frame) {
      return { ...viewFrame, isActive };
    }

    let leftBox = '';
    let rightBox = '';
    let bonusBox = '';
    if (isLastFrame) {
      const bonusFrame = frames[10] || [];
      const extraBonusFrame = frames[11] || [];
      // eslint-disable-next-line max-len
      [leftBox, rightBox, bonusBox] = lastFrameViewConverter(frame, bonusFrame, extraBonusFrame);
    } else {
      [leftBox, rightBox] = frameViewConverter(frame);
    }

    const score = scores[index];

    return {
      ...viewFrame,
      ...isLastFrame && { bonusBox },
      isActive,
      leftBox,
      rightBox,
      score,
    };
  });
};
