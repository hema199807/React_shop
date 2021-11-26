import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './header.css'

const Header = (props) => {
    const [cartProductsCount,setCartProductCount]=useState(0);

  
    
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('products'))){
            let productsArr=JSON.parse(localStorage.getItem('products'));
            setCartProductCount(productsArr.length);
        }
    },[])
   


    return ( 
        <div id="header-part">
            <div id="logo">
                <Link to="/">
                <p id="logo-cont">F</p>
                </Link>
            </div>
            
            <Link to="/order">
            <div id="cart-wrapper">
                <i className="fas fa-shopping-cart" style={{color:"black"}}></i>
                <span id="cart-count">{props.count===0?cartProductsCount:props.count}</span>
            </div>
            </Link>
        </div>
    );
}
 
export default Header;