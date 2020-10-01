import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './components/routes';
import AsyncQueue from './components/AsyncQueue';
import FlashMessages from './components/FlashMessages';
import ConfirmDialog from './utils/components/ConfirmDialog';

function App() {
  return (
    <>
      <AsyncQueue />
      <Router>
        <Routes />
      </Router>
      <FlashMessages />
      <ConfirmDialog />
    </>
  );
}

export default App;
