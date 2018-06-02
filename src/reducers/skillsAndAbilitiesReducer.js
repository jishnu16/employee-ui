/* eslint-disable import/namespace */
import * as types from '../constants/constant';
import initialState from './initialState';

export default function ratingReducer(state = initialState.skillsAndAbilities, action) {
  switch (action.type) {
    case types.SAVE_SKILLS_AND_ABILITIES_SUCCESS:
      return action.skillsAndAbilities;
    default:
      return state;
  }
}