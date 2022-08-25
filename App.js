import AppNav from './src/navigation/app-nav';
import React, {Node, createContext, useState, useEffect} from 'react';
import {getUserData} from './src/repos/auth-repo';

const App = () => {
  return <AppNav />;
};

export default App;
