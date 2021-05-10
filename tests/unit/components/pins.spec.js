import { shallowMount } from '@vue/test-utils';
import Pins from '@/components/pins.vue';

const mockStore = {
  dispatch: jest.fn(),
  state: {
    pinsLeft: 10,
  },
};

describe('pins.vue', () => {
  describe('methods', () => {
    describe('pinsHit', () => {
      it('should dispatch the amount of pins that was hit by the player', () => {
        const wrapper = shallowMount(Pins, {
          mocks: {
            $store: mockStore,
          },
        });

        wrapper.vm.pinsHit(10);
        expect(mockStore.dispatch.mock.calls[0][0]).toEqual('pinsHit');
        expect(mockStore.dispatch.mock.calls[0][1]).toEqual({ amount: 10 });
      });
    });
  });

  describe('computed', () => {
    describe('possibleHits', () => {
      it('should return the amount of pins left standing, plus 1 for a missed shot', () => {
        const wrapper = shallowMount(Pins, {
          mocks: {
            $store: mockStore,
          },
        });

        expect(wrapper.vm.possibleHits).toEqual(11);
      });
    });
  });
});
