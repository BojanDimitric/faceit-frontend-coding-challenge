import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import theme from '../theme';

import P from './P';
import Button from './Button';
import Tournament from './Tournament';

import { TournamentType } from '../constants/types';
import { RootState } from '../reducers';

import { getTournaments } from '../actions/tournaments';

const Div = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc((100% - 2 * ${theme.spacing(6)}) / 3) calc(
      (100% - 2 * ${theme.spacing(6)}) / 3
    ) calc((100% - 2 * ${theme.spacing(6)}) / 3);
  grid-gap: ${theme.spacing(6)};
  justify-content: center;
  box-sizing: border-box;
  padding: ${theme.spacing(6)} 0;

  @media all and (max-width: 1024px) {
    grid-template-columns: calc((100% - ${theme.spacing(6)}) / 2) calc(
        (100% - ${theme.spacing(6)}) / 2
      );
  }

  @media all and (max-width: 580px) {
    grid-template-columns: 100%;
  }
`;

const CenteredP = styled(P)`
  text-align: center;
  margin: ${theme.spacing(6)} 0;
`;

const CenteredDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Tournaments: React.FC = () => {
  const dispatch = useDispatch();

  const tournamentsLoading: boolean = useSelector(
    (state: RootState) => state.tournaments['tournamentsLoading']
  );
  const tournaments: TournamentType[] = useSelector(
    (state: RootState) => state.tournaments['tournaments']
  );
  const tournamentsError: string = useSelector(
    (state: RootState) => state.tournaments['tournamentsError']
  );

  const handleRetryClick = (): void => {
    dispatch(getTournaments());
  };

  return (
    <>
      {tournamentsLoading && <CenteredP>Loading tournaments ...</CenteredP>}
      <Div>
        {tournaments &&
          tournaments.map((item: TournamentType, i: number) => (
            <Tournament key={i} tournament={item} />
          ))}
      </Div>
      {!tournaments && !tournamentsLoading && (
        <CenteredP>No tournaments found.</CenteredP>
      )}
      {tournamentsError && (
        <CenteredDiv>
          <CenteredP>Something went wrong.</CenteredP>
          <Button type="button" onClick={handleRetryClick}>
            RETRY
          </Button>
        </CenteredDiv>
      )}
    </>
  );
};

export default Tournaments;
