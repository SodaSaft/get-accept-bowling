import * as Utils from '@/utils/utils';
import * as Frame from '@/models/frame';

const defaultBowlingGameView = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('utils.js', () => {
  let defaultFrameModelStub;

  beforeEach(() => {
    defaultFrameModelStub = jest.spyOn(Frame, 'defaultFrameModel');
  });

  afterEach(() => {
    defaultFrameModelStub.mockRestore();
  });

  it('isFrameCompleted', () => {
    expect(Utils.isFrameCompleted([])).toBeFalsy();
    expect(Utils.isFrameCompleted(Frame.EXAMPLE.REGULAR)).toBeFalsy();
    expect(Utils.isFrameCompleted(Frame.EXAMPLE.REGULAR_COMPLETED)).toBeTruthy();
    expect(Utils.isFrameCompleted(Frame.EXAMPLE.SPARE)).toBeTruthy();
    expect(Utils.isFrameCompleted(Frame.EXAMPLE.STRIKE)).toBeFalsy();
  });

  it('isSpare', () => {
    expect(Utils.isSpare([])).toBeFalsy();
    expect(Utils.isSpare(Frame.EXAMPLE.REGULAR)).toBeFalsy();
    expect(Utils.isSpare(Frame.EXAMPLE.REGULAR_COMPLETED)).toBeFalsy();
    expect(Utils.isSpare(Frame.EXAMPLE.SPARE)).toBeTruthy();
    expect(Utils.isSpare(Frame.EXAMPLE.STRIKE)).toBeFalsy();
  });

  it('isStrike', () => {
    expect(Utils.isStrike([])).toBeFalsy();
    expect(Utils.isStrike(Frame.EXAMPLE.REGULAR)).toBeFalsy();
    expect(Utils.isStrike(Frame.EXAMPLE.REGULAR_COMPLETED)).toBeFalsy();
    expect(Utils.isStrike(Frame.EXAMPLE.SPARE)).toBeFalsy();
    expect(Utils.isStrike(Frame.EXAMPLE.STRIKE)).toBeTruthy();
  });

  it('frameViewConverter', () => {
    expect(Utils.frameViewConverter([])).toStrictEqual([]);
    expect(Utils.frameViewConverter(Frame.EXAMPLE.REGULAR)).toStrictEqual(Frame.EXAMPLE.REGULAR);
    expect(Utils.frameViewConverter(Frame.EXAMPLE.REGULAR_COMPLETED))
      .toStrictEqual(Frame.EXAMPLE.REGULAR_COMPLETED);
    expect(Utils.frameViewConverter(Frame.EXAMPLE.SPARE)).toStrictEqual([Frame.EXAMPLE.SPARE[0], '/']);
    expect(Utils.frameViewConverter(Frame.EXAMPLE.STRIKE)).toStrictEqual([undefined, 'X']);
    expect(Utils.frameViewConverter(Frame.EXAMPLE.STRIKE, true)).toStrictEqual(['X']);
  });

  it('initializeBowlingGame', () => {
    defaultFrameModelStub.mockImplementation((n) => n);
    expect(Utils.initializeBowlingGame()).toStrictEqual(defaultBowlingGameView);
    expect(defaultFrameModelStub).toHaveBeenCalledTimes(10);
  });

  it('getDefaultState', () => {
    defaultFrameModelStub.mockImplementation((n) => n);
    const expected = {
      activeFrameNumber: 0,
      bowlingGameView: defaultBowlingGameView,
      frames: [],
      pinsLeft: 10,
      scores: [],
    };

    expect(Utils.getDefaultState()).toStrictEqual(expected);
  });

  describe('lastFrameViewConverter', () => {
    it('should return an empty frame view model', () => {
      expect(Utils.lastFrameViewConverter([], [], [])).toStrictEqual([]);
    });

    it('should return a regular frame view model', () => {
      expect(Utils.lastFrameViewConverter(Frame.EXAMPLE.REGULAR, [], []))
        .toStrictEqual(Frame.EXAMPLE.REGULAR);
    });

    it('should return a regular completed frame view model', () => {
      expect(Utils.lastFrameViewConverter(Frame.EXAMPLE.REGULAR_COMPLETED, [], []))
        .toStrictEqual(Frame.EXAMPLE.REGULAR_COMPLETED);
    });

    it('should return a frame view model with a spare', () => {
      const expected = [Frame.EXAMPLE.SPARE[0], '/'];

      const frame = Frame.EXAMPLE.SPARE;
      const bonusFrame = [];
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a spare and a regular', () => {
      const expected = [Frame.EXAMPLE.SPARE[0], '/', Frame.EXAMPLE.REGULAR[0]];

      const frame = Frame.EXAMPLE.SPARE;
      const bonusFrame = Frame.EXAMPLE.REGULAR;
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a spare and a strike', () => {
      const expected = [Frame.EXAMPLE.SPARE[0], '/', 'X'];

      const frame = Frame.EXAMPLE.SPARE;
      const bonusFrame = Frame.EXAMPLE.STRIKE;
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a strike', () => {
      const expected = ['X'];

      const frame = Frame.EXAMPLE.STRIKE;
      const bonusFrame = [];
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a strike and a regular completed', () => {
      const expected = ['X', Frame.EXAMPLE.REGULAR_COMPLETED[0], Frame.EXAMPLE.REGULAR_COMPLETED[1]];

      const frame = Frame.EXAMPLE.STRIKE;
      const bonusFrame = Frame.EXAMPLE.REGULAR_COMPLETED;
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a strike and a spare', () => {
      const expected = ['X', Frame.EXAMPLE.SPARE[0], '/'];

      const frame = Frame.EXAMPLE.STRIKE;
      const bonusFrame = Frame.EXAMPLE.SPARE;
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a double strike', () => {
      const expected = ['X', 'X'];

      const frame = Frame.EXAMPLE.STRIKE;
      const bonusFrame = Frame.EXAMPLE.STRIKE;
      const extraBonusFrame = [];

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });

    it('should return a frame view model with a triple strike', () => {
      const expected = ['X', 'X', 'X'];

      const frame = Frame.EXAMPLE.STRIKE;
      const bonusFrame = Frame.EXAMPLE.STRIKE;
      const extraBonusFrame = Frame.EXAMPLE.STRIKE;

      expect(Utils.lastFrameViewConverter(frame, bonusFrame, extraBonusFrame))
        .toStrictEqual(expected);
    });
  });

  describe('mapBowlingGameView', () => {
    it('should return bowlingGameView unchanged', () => {
      const state = {
        activeFrameNumber: 1,
        bowlingGameView: [
          {
            frameNumber: 1,
            isActive: false,
            leftBox: 4,
            rightBox: 4,
            score: 8,
          },
        ],
        frames: [[4, 4]],
        scores: [8],
      };

      expect(Utils.mapBowlingGameView(state)).toStrictEqual(state.bowlingGameView);
    });

    it('should return an updated bowlingGameView for one new shot in one frame', () => {
      const state = {
        activeFrameNumber: 1,
        bowlingGameView: [
          {
            frameNumber: 1,
            isActive: false,
            leftBox: 4,
            rightBox: 4,
            score: 8,
          },
          {
            frameNumber: 2,
            isActive: false,
            leftBox: undefined,
            rightBox: undefined,
            score: undefined,
          },
        ],
        frames: [[4, 4], [2]],
        scores: [8],
      };

      const updatedBowlingGameView = [
        {
          frameNumber: 1,
          isActive: false,
          leftBox: 4,
          rightBox: 4,
          score: 8,
        },
        {
          frameNumber: 2,
          isActive: true,
          leftBox: 2,
          rightBox: undefined,
          score: undefined,
        },
      ];

      expect(Utils.mapBowlingGameView(state)).toStrictEqual(updatedBowlingGameView);
    });

    it('should return an updated bowlingGameView for two new frames', () => {
      const state = {
        activeFrameNumber: 3,
        bowlingGameView: [
          {
            frameNumber: 1,
            isActive: false,
            leftBox: 4,
            rightBox: 4,
            score: 8,
          },
          {
            frameNumber: 2,
            isActive: false,
            leftBox: undefined,
            rightBox: undefined,
            score: undefined,
          },
          {
            frameNumber: 3,
            isActive: false,
            leftBox: undefined,
            rightBox: undefined,
            score: undefined,
          },
          {
            frameNumber: 4,
            isActive: false,
            leftBox: undefined,
            rightBox: undefined,
            score: undefined,
          },
        ],
        frames: [[4, 4], [2, 8], [9, 0]],
        scores: [8, 27, 36],
      };

      const updatedBowlingGameView = [
        {
          frameNumber: 1,
          isActive: false,
          leftBox: 4,
          rightBox: 4,
          score: 8,
        },
        {
          frameNumber: 2,
          isActive: false,
          leftBox: 2,
          rightBox: '/',
          score: 27,
        },
        {
          frameNumber: 3,
          isActive: false,
          leftBox: 9,
          rightBox: 0,
          score: 36,
        },
        {
          frameNumber: 4,
          isActive: true,
          leftBox: undefined,
          rightBox: undefined,
          score: undefined,
        },
      ];

      expect(Utils.mapBowlingGameView(state)).toStrictEqual(updatedBowlingGameView);
    });

    it('should return a bowlingGameView for a prefect game', () => {
      const bowlingGameView = Utils.initializeBowlingGame();
      const scores = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
      const frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10], [10], [10]];

      const state = {
        activeFrameNumber: 11,
        bowlingGameView,
        frames,
        scores,
      };

      const updatedBowlingGameView = [
        {
          frameNumber: 1,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[0],
        },
        {
          frameNumber: 2,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[1],
        },
        {
          frameNumber: 3,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[2],
        },
        {
          frameNumber: 4,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[3],
        },
        {
          frameNumber: 5,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[4],
        },
        {
          frameNumber: 6,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[5],
        },
        {
          frameNumber: 7,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[6],
        },
        {
          frameNumber: 8,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[7],
        },
        {
          frameNumber: 9,
          isActive: false,
          leftBox: undefined,
          rightBox: 'X',
          score: scores[8],
        },
        {
          frameNumber: 10,
          isActive: true,
          leftBox: 'X',
          rightBox: 'X',
          bonusBox: 'X',
          score: scores[9],
        },
      ];

      expect(Utils.mapBowlingGameView(state)).toStrictEqual(updatedBowlingGameView);
    });
  });
});
