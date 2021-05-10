import * as Frame from '@/models/frame';

describe('frame.js', () => {
  describe('defaultFrameModel', () => {
    it('should return the default frameModel', () => {
      const expected = {
        frameNumber: 3,
        leftBox: undefined,
        rightBox: undefined,
        isActive: false,
        score: undefined,
      };

      expect(Frame.defaultFrameModel(3)).toStrictEqual(expected);
    });

    it('should return the default frameModel for the first frame', () => {
      const expected = {
        frameNumber: 1,
        leftBox: undefined,
        rightBox: undefined,
        isActive: true,
        score: undefined,
      };

      expect(Frame.defaultFrameModel(1)).toStrictEqual(expected);
    });

    it('should return the default frameModel for the last frame', () => {
      const expected = {
        frameNumber: 10,
        leftBox: undefined,
        rightBox: undefined,
        bonusBox: undefined,
        isActive: false,
        score: undefined,
      };

      expect(Frame.defaultFrameModel(10)).toStrictEqual(expected);
    });
  });
});
