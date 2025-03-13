import React, { useContext } from 'react';
import StartApp from "./StartApp";
import MainView from './MainView';
import { counterContext } from '../Context/counterContext';
const Layout = () => {
  const {showApp} = useContext(counterContext)
  return (
    showApp ?  <div><MainView/></div> :  <div><StartApp/></div> 
  );
};

export default Layout;