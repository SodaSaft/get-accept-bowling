import { actions } from '@/store';
import * as Utils from '@/utils/utils';
import * as BowlingCalculator from '@/services/bowling-calculator';

const {
  calculateScore,
  pinsHit,
  updateBowlingGameView,
} = actions;

describe('actions', () => {
  describe('pinsHit', () => {
    let fetchBowlingScoresStub;

    beforeEach(() => {
      fetchBowlingScoresStub = jest.spyOn(BowlingCalculator, 'default');
    });

    afterEach(() => {
      fetchBowlingScoresStub.mockRestore();
    });

    it('should call the calculator service but not commit any changes', async () => {
      const scores = [];
      fetchBowlingScoresStub.mockImplementation(() => Promise.resolve(scores));
      const commit = jest.fn();

      const state = {
        frames: [[4, 5]],
      };

      await calculateScore({ commit, state });

      expect(fetchBowlingScoresStub.mock.calls[0][0]).toEqual({ frames: state.frames });
      expect(commit).not.toHaveBeenCalledWith('updateScores');
    });

    it('should call the calculator service and update the state.score', async () => {
      const scores = [9];
      fetchBowlingScoresStub.mockImplementation(() => Promise.resolve(scores));
      const commit = jest.fn();

      const state = {
        frames: [[4, 5]],
      };

      await calculateScore({ commit, state });

      expect(fetchBowlingScoresStub.mock.calls[0][0]).toEqual({ frames: state.frames });
      expect(commit.mock.calls[0][0]).toEqual('updateScores');
      expect(commit.mock.calls[0][1]).toEqual({ scores });
    });
  });

  describe('pinsHit', () => {
    let isFrameCompletedStub;
    let isStrikeStub;

    beforeEach(() => {
      isFrameCompletedStub = jest.spyOn(Utils, 'isFrameCompleted');
      isStrikeStub = jest.spyOn(Utils, 'isStrike');
    });

    afterEach(() => {
      isFrameCompletedStub.mockRestore();
      isStrikeStub.mockRestore();
    });

    it('should update the currently active frame and dispatch the calculateScore action', async () => {
      isFrameCompletedStub.mockImplementation(() => true);
      isStrikeStub.mockImplementation(() => false);
      const commit = jest.fn();
      const dispatch = jest.fn();

      const state = {
        activeFrameNumber: 0,
        bowlingGameView: [],
        frames: [[4]],
        scores: [],
      };

      const payload = { amount: 5 };

      await pinsHit({ commit, dispatch, state }, payload);

      expect(commit.mock.calls[0][0]).toEqual('updateFrames');
      expect(commit.mock.calls[0][1]).toEqual({ activeFrameNumber: 0, frame: [4, 5] });
      expect(commit.mock.calls[1][0]).toEqual('incActiveFrameNumber');
      expect(dispatch.mock.calls[0][0]).toEqual('calculateScore');
      expect(dispatch.mock.calls[1][0]).toEqual('updateBowlingGameView');
    });

    it('should update a new frame and not increase the activeFrameNumber', async () => {
      isFrameCompletedStub.mockImplementation(() => false);
      isStrikeStub.mockImplementation(() => false);
      const commit = jest.fn();
      const dispatch = jest.fn();

      const state = {
        activeFrameNumber: 0,
        bowlingGameView: [],
        frames: [],
        scores: [],
      };

      const payload = { amount: 4 };

      await pinsHit({ commit, dispatch, state }, payload);

      expect(commit.mock.calls[0][0]).toEqual('updateFrames');
      expect(commit.mock.calls[0][1]).toEqual({ activeFrameNumber: 0, frame: [4] });
      expect(commit).not.toHaveBeenCalledWith('incActiveFrameNumber');
      expect(dispatch.mock.calls[0][0]).toEqual('calculateScore');
      expect(dispatch.mock.calls[1][0]).toEqual('updateBowlingGameView');
    });
  });

  it('updateBowlingGameView', () => {
    const mapBowlingGameViewStub = jest.spyOn(Utils, 'mapBowlingGameView')
      .mockImplementation(() => 'updatedBowlingGameView');
    const commit = jest.fn();
    const state = 'state';

    updateBowlingGameView({ commit, state });

    expect(mapBowlingGameViewStub).toHaveBeenCalledWith('state');
    expect(commit).toHaveBeenCalledWith('updateBowlingGameView', { bowlingGameView: 'updatedBowlingGameView' });
  });
});
