import { mutations } from '@/store';
import * as Utils from '@/utils/utils';

const {
  incActiveFrameNumber,
  updateFrames,
  updateBowlingGameView,
  updateScores,
  updatePinsLeft,
  resetBowlingGame,
} = mutations;

describe('mutations', () => {
  describe('incActiveFrameNumber', () => {
    it('should increment the activeFrameNumber', () => {
      const state = { activeFrameNumber: 1 };
      incActiveFrameNumber(state);

      expect(state.activeFrameNumber).toEqual(2);
    });
  });

  describe('updateFrames', () => {
    it('should add a new frame if the specified frame does not exist', () => {
      const state = { frames: [[1, 2]] };
      const payload = { activeFrameNumber: 1, frame: [3, 4] };

      updateFrames(state, payload);

      expect(state.frames).toEqual([[1, 2], [3, 4]]);
    });

    it('should update the specified frame', () => {
      const state = { frames: [[1, 2], [3]] };
      const payload = { activeFrameNumber: 1, frame: [3, 4] };

      updateFrames(state, payload);

      expect(state.frames).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe('updateBowlingGameView', () => {
    it('should update the bowlingGameView', () => {
      const state = { bowlingGameView: '' };
      const payload = { bowlingGameView: 'bowlingGameView' };

      updateBowlingGameView(state, payload);

      expect(state.bowlingGameView).toEqual('bowlingGameView');
    });
  });

  describe('updateScores', () => {
    it('should update the bowlingGameView', () => {
      const state = { scores: [] };
      const payload = { scores: [10] };

      updateScores(state, payload);

      expect(state.scores).toStrictEqual([10]);
    });
  });

  describe('updatePinsLeft', () => {
    it('should return the default value', () => {
      const state = { frames: [], activeFrameNumber: 0, pinsLeft: 10 };

      updatePinsLeft(state);

      expect(state.pinsLeft).toEqual(10);
    });

    it('should calculate how many pins are left standing', () => {
      const state = { frames: [[5]], activeFrameNumber: 0, pinsLeft: 10 };

      updatePinsLeft(state);

      expect(state.pinsLeft).toEqual(5);
    });
  });

  describe('resetBowlingGame', () => {
    it('should return the state to its default state', () => {
      const DEFAULT_STATE = {
        activeFrameNumber: 0,
        bowlingGameView: 'defaultBowlingGameView',
        frames: [],
        pinsLeft: 10,
        scores: [],
      };

      const getDefaultStateStub = jest.spyOn(Utils, 'getDefaultState')
        .mockImplementation(() => DEFAULT_STATE);

      const state = {
        activeFrameNumber: 4,
        bowlingGameView: 'currentBowlingGameView',
        frames: [[10], [10], [10]],
        pinsLeft: 10,
        scores: [30],
      };

      resetBowlingGame(state);

      expect(state).toStrictEqual(DEFAULT_STATE);

      getDefaultStateStub.mockRestore();
    });
  });
});
