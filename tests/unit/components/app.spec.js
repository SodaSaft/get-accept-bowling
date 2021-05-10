import { shallowMount } from '@vue/test-utils';
import App from '@/app.vue';

const mockStore = {
  commit: jest.fn(),
  state: {
    bowlingGameView: ['bowlingGameView'],
  },
};

describe('app.vue', () => {
  describe('methods', () => {
    describe('resetBowlingGame', () => {
      it('should reset the state of the store', () => {
        const wrapper = shallowMount(App, {
          mocks: {
            $store: mockStore,
          },
        });

        wrapper.vm.resetBowlingGame();
        expect(mockStore.commit.mock.calls[0][0]).toEqual('resetBowlingGame');
      });
    });
  });

  describe('computed', () => {
    describe('bowlingGameView', () => {
      it('should return the bowlingGameView list from store', () => {
        const wrapper = shallowMount(App, {
          mocks: {
            $store: mockStore,
          },
        });

        expect(wrapper.vm.bowlingGameView).toEqual(['bowlingGameView']);
      });
    });
  });
});
