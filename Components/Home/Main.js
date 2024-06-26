//Importing react library from react in to this js file.
//Rendering means adding the component.
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Main = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
 
export default Main;