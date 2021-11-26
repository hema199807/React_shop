import React, { useState } from 'react';
import './App.css';
import { baner_data } from './components/data';
import Cards from './components/cards';
import Header from './components/header';

function App() {
  const [countValue,setCountValue]=useState(0);
  
  function handleClick(count){
    setCountValue(count);
  }

  return (
    <>
    <Header count={countValue}/>
    <div id="banner">
      <h1 id="banner-title">Pizza Hut</h1>
      <div id="banner-wrapper">
        <div id="banner-image-wrapper">
          <img src={baner_data.image} id="banner-image" alt="cheese-pizza"/>
        </div>
        <div id="banner-content">
          <h3>{baner_data.pizzaTitle}</h3>
          <p style={{marginBottom:0,fontSize:18+"px"}}>Description:</p>
          <p style={{marginTop:5+"px"}}>{baner_data.description}</p>
          <div style={{display:"flex",alignItems:"center"}}>
            <i className="fas fa-map-marker-alt"></i>
            <p style={{marginLeft:11+"px"}}>{baner_data.Address}</p>
          </div>
          <div style={{display:"flex",alignItems:"center"}}>
            <i className="fas fa-mobile-alt"></i>
            <p style={{marginLeft:11+"px"}}>{baner_data.Phone}</p>
          </div>
        </div>
        <div id="offer">
          <div style={{color:"red"}}><i className="fas fa-percent"></i><span style={{marginLeft:5+"px",fontWeight:"bold"}}> Coupon</span></div>
          <p className="offer-content">{baner_data.offer.split("-")[0]}</p>
          <p className="offer-content">{baner_data.offer.split("-")[1]}</p>
        </div>
      </div>
    </div>
    <Cards onClick={handleClick}/>
    </>
  );
}

export default App;
