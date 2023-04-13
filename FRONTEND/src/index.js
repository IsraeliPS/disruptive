import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { ChallengeApp } from './ChallengeApp';
import { generateStore } from './reducers/store';

import './styles/challengeApp.scss';
import { AuthenticateProvider } from './context/AuthenticateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={generateStore()}>
    <AuthenticateProvider>
      <ChallengeApp />
    </AuthenticateProvider>
  </Provider>
);
