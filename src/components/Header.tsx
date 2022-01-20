import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import theme from '../theme';

import Button from './Button';
import Input from './Input';

import {
  getTournaments,
  searchTournaments,
  deleteTournaments,
  createTournament
} from '../actions/tournaments';

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media all and (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ResponsiveInput = styled(Input)`
  @media all and (max-width: 400px) {
    margin-bottom: ${theme.spacing(6)};
  }
`;

const Header: React.FC = () => {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!search) dispatch(getTournaments());
  }, [search, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === 'Enter') {
      dispatch(deleteTournaments());
      dispatch(searchTournaments(search.trim()));
    }
  };

  const handleCreateClick = (): void => {
    const name = window.prompt('Tournament Name:');
    if (name?.length) dispatch(createTournament(name.trim()));
  };

  return (
    <Div>
      <ResponsiveInput
        type="text"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search tournament ..."
      />
      <Button onClick={handleCreateClick}>CREATE TOURNAMENT</Button>
    </Div>
  );
};

export default Header;
