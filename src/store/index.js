import Vue from 'vue';
import Vuex from 'vuex';
import {
  getDefaultState, isFrameCompleted, isStrike, mapBowlingGameView,
} from '@/utils/utils';
import fetchBowlingScores from '@/services/bowling-calculator';

Vue.use(Vuex);

export const mutations = {
  incActiveFrameNumber(state) {
    state.activeFrameNumber++;
  },
  updateFrames(state, payload) {
    state.frames[payload.activeFrameNumber] = payload.frame;
  },
  updateBowlingGameView(state, payload) {
    state.bowlingGameView = payload.bowlingGameView;
  },
  updateScores(state, payload) {
    state.scores = payload.scores;
  },
  updatePinsLeft(state) {
    const currentFrame = state.frames[state.activeFrameNumber] || [];
    state.pinsLeft = 10 - (currentFrame[0] || 0);
  },
  resetBowlingGame(state) {
    const defaultState = getDefaultState();
    Object.keys(defaultState).forEach((key) => state[key] = defaultState[key]);
    state.frames.length = 0;
  },
};

export const actions = {
  async calculateScore({ commit, state }) {
    const { frames } = state;

    const scores = await fetchBowlingScores({ frames });
    if (scores.length) {
      commit('updateScores', { scores });
    }
  },
  async pinsHit({ commit, dispatch, state }, payload) {
    const { activeFrameNumber, frames } = state;

    const currentFrame = frames[activeFrameNumber] || [];

    const frame = [...currentFrame, payload.amount];

    const framesPayload = { activeFrameNumber, frame };

    commit('updateFrames', framesPayload);

    if (isFrameCompleted(frame) || isStrike(frame)) {
      commit('incActiveFrameNumber');
    }

    commit('updatePinsLeft');

    await dispatch('calculateScore');

    dispatch('updateBowlingGameView');
  },
  updateBowlingGameView({ commit, state }) {
    const updatedBowlingGameView = mapBowlingGameView(state);

    commit('updateBowlingGameView', { bowlingGameView: updatedBowlingGameView });
  },
};

export default new Vuex.Store({
  state: getDefaultState(),
  mutations,
  actions,
});
