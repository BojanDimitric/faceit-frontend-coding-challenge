import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import theme from '../theme';

import H6 from './H6';
import P from './P';
import Button from './Button';

import { TournamentType } from '../constants/types';

import { editTournament, deleteTournament } from '../actions/tournaments';

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  padding: ${theme.spacing(4)};
  background: ${theme.palette.background.base};
  border-radius: ${theme.spacing(1)};
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${theme.spacing(1)};

  button:first-child {
    margin-right: ${theme.spacing(2)};
  }
`;

const Tournament: React.FC<{ tournament: TournamentType }> = ({
  tournament
}) => {
  const dispatch = useDispatch();

  const handleEditClick = (): void => {
    const name = window.prompt('New Tournament Name:', tournament.name);
    if (name?.length) {
      dispatch(editTournament(tournament.id, name));
    }
  };

  const handleDeleteClick = (): void => {
    const want = window.confirm('Do You realy want to delete this tournament?');
    if (want) dispatch(deleteTournament(tournament.id));
  };

  return (
    <Div>
      <H6>
        {tournament.name.length > 29
          ? tournament.name.slice(0, 25) + ' ...'
          : tournament.name}
      </H6>
      <P>Organizer: {tournament.organizer}</P>
      <P>Game: {tournament.game}</P>
      <P>
        Participants:{' '}
        {`${tournament.participants.current}/${tournament.participants.max}`}
      </P>
      <P>Start: {new Date(tournament.startDate).toLocaleString('en-GB')}</P>
      <Buttons>
        <Button type="button" onClick={handleEditClick}>
          EDIT
        </Button>
        <Button type="button" onClick={handleDeleteClick}>
          DELETE
        </Button>
      </Buttons>
    </Div>
  );
};

export default Tournament;
