import initialState from './initialState';
import {
  GET_QUESTIONS,
  SHOW_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  CLEAR_MESSAGES
} from '../actions/constants';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        question: action.payload.results,
        nextPage: !action.payload.next.page && !action.payload.previous.page ? 2 : action.payload.next.page,
        previousPage: action.payload.previous.page
      }
    case SHOW_QUESTION:
      return {
        ...state,
        getQuestion: action.payload,

      }
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        errorMessage: undefined,
      }
    case ADD_QUESTION_FAIL:
      return {
        ...state,
        successMessage: undefined,
        errorMessage: action.payload,
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        successMessage: undefined,
        errorMessage: undefined,
      }
    default:
      return state;
  }
};
