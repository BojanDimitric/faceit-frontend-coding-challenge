import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import GlobalStyle from './GlobalStyle';

import Container from './components/Container';
import H4 from './components/H4';
import Header from './components/Header';
import Tournaments from './components/Tournaments';

import store from './store';

const App: React.FC = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Header />
      <Tournaments />
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
