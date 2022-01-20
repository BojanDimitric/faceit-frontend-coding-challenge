import * as actionTypes from '../actions/actionTypes';
import { TournamentsType, ActionType } from '../constants/types';

const initialState: TournamentsType = {
  tournamentsLoading: false,
  tournaments: [],
  tournamentsError: ''
};

const tournaments = (
  state: TournamentsType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case actionTypes.GET_TOURNAMENTS_START:
      return {
        ...state,
        tournamentsLoading: true
      };
    case actionTypes.GET_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        tournamentsLoading: false,
        tournaments: action.tournaments,
        tournamentsError: ''
      };
    case actionTypes.GET_TOURNAMENTS_FAIL:
      return {
        ...state,
        tournamentsLoading: false,
        tournamentsError: action.error
      };
    case actionTypes.DELETE_TOURNAMENTS_SUCCESS:
      return {
        tournamentsLoading: false,
        tournaments: [],
        tournamentsError: ''
      };
    case actionTypes.CREATE_TOURNAMENT_SUCCESS:
      return {
        tournamentsLoading: false,
        tournaments: [action.tournament, ...state.tournaments],
        tournamentsError: ''
      };
    case actionTypes.EDIT_TOURNAMENT_SUCCESS:
      return {
        tournamentsLoading: false,
        tournaments: [
          ...state.tournaments.map(item =>
            item.id === action.id ? action.tournament : item
          )
        ],
        tournamentsError: ''
      };
    case actionTypes.DELETE_TOURNAMENT_SUCCESS:
      return {
        tournamentsLoading: false,
        tournaments: [
          ...state.tournaments.filter(item => item.id !== action.id)
        ],
        tournamentsError: ''
      };
    default:
      return state;
  }
};

export default tournaments;
