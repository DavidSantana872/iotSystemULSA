import React, { useContext } from 'react';
import StartApp from "./StartApp";
import MainView from './MainView';

const Layout = () => {
  return (
    true ?  <div><MainView/></div> :  <div><StartApp/></div> 
  );
};

export default Layout;