import axios from 'axios';
import {
  GET_QUESTIONS,
  SHOW_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  CLEAR_MESSAGES
} from './constants';

export const getQuestions = (params) => dispatch => {
  axios
    .get('http://localhost:3001/api/questions', { params })
    .then(response =>
      dispatch({
        type: GET_QUESTIONS,
        payload: response.data
      })
    )
}

export const showQuestion = (id) => dispatch => {
  axios
    .get('http://localhost:3001/api/questions/id/' + id,)
    .then(response =>
      dispatch({
        type: SHOW_QUESTION,
        payload: response.data.question
      })
    )
}

export const addQuestion = (question) => dispatch => {
  axios
    .post('http://localhost:3001/api/questions', { question })
    .then(response =>
      dispatch({
        type: ADD_QUESTION_SUCCESS,
        payload: response.data
      })
    )
    .catch((error) => {
      dispatch({
        type: ADD_QUESTION_FAIL,
        payload: error.response.data.message
      })
    });
}

export const clearMessages = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGES })
}
