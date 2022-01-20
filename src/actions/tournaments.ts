import { Dispatch } from 'redux';
import axios from 'axios';

import { API_TOURNAMENTS_URL } from '../constants/api';
import * as actionTypes from './actionTypes';
import { TournamentType, ActionType } from '../constants/types';

const getTournamentsStart = (): ActionType => ({
  type: actionTypes.GET_TOURNAMENTS_START
});

const getTournamentsSuccess = (tournaments: TournamentType[]): ActionType => ({
  type: actionTypes.GET_TOURNAMENTS_SUCCESS,
  tournaments
});

const getTournamentsFail = (error: string): ActionType => ({
  type: actionTypes.GET_TOURNAMENTS_FAIL,
  error
});

export const getTournaments = () => {
  return (dispatch: Dispatch): void => {
    dispatch(getTournamentsStart());
    axios
      .get(API_TOURNAMENTS_URL)
      .then(res => res.data)
      .then(res => dispatch(getTournamentsSuccess(res)))
      .catch(err => dispatch(getTournamentsFail(err)));
  };
};

export const searchTournaments = (query: string) => {
  return (dispatch: Dispatch): void => {
    dispatch(getTournamentsStart());
    axios
      .get(API_TOURNAMENTS_URL + '?q=' + query)
      .then(res => res.data)
      .then(res => dispatch(getTournamentsSuccess(res)))
      .catch(err => dispatch(getTournamentsFail(err)));
  };
};

export const deleteTournaments = (): ActionType => ({
  type: actionTypes.DELETE_TOURNAMENTS_SUCCESS
});

const createTournamentSuccess = (tournament: TournamentType): ActionType => ({
  type: actionTypes.CREATE_TOURNAMENT_SUCCESS,
  tournament
});

export const createTournament = (name: string) => {
  return (dispatch: Dispatch): void => {
    axios
      .post(API_TOURNAMENTS_URL, { name })
      .then(res => res.data)
      .then(res => dispatch(createTournamentSuccess(res)))
      .catch(err => {
        console.log('err: ', err);
      });
  };
};

const editTournamentSuccess = (
  id: string,
  tournament: TournamentType
): ActionType => ({
  type: actionTypes.EDIT_TOURNAMENT_SUCCESS,
  id,
  tournament
});

export const editTournament = (id: string, name: string) => {
  return (dispatch: Dispatch): void => {
    axios
      .patch(API_TOURNAMENTS_URL + '/' + id, { name })
      .then(res => res.data)
      .then(res => dispatch(editTournamentSuccess(id, res)))
      .catch(err => {
        console.log('err: ', err);
      });
  };
};

const deleteTournamentSuccess = (id: string): ActionType => ({
  type: actionTypes.DELETE_TOURNAMENT_SUCCESS,
  id
});

export const deleteTournament = (id: string) => {
  return (dispatch: Dispatch): void => {
    axios
      .delete(API_TOURNAMENTS_URL + '/' + id)
      .then(() => dispatch(deleteTournamentSuccess(id)))
      .catch(err => {
        console.log('err: ', err);
      });
  };
};
