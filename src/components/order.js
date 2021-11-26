import React, {useState, useEffect} from 'react';
import Header from './header';
import Modal from 'react-modal';
import './order.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor:"black",
        border: 'solid 2px brown',
        width: '40%',
        height: '20%',
    }
};


const Order = () => {

    const [cartProductsCount,setCartProductCount]=useState(0);
    const [orderArr,setOrderArr]=useState([]);
    const [quantityValue,setQuantityValue]=useState(0);
    const [amount,setAmount]=useState(0);
    const [modalIsOpen,setModal]=useState(false);
    
    useEffect(()=>{
        handleOrderPlaceData()
    },[cartProductsCount])

    function handleOrderPlaceData(){
        if(JSON.parse(localStorage.getItem('products'))){
            let productsArr=JSON.parse(localStorage.getItem('products'));
            setCartProductCount(productsArr.length);
            setOrderArr(productsArr);
            let Qua=0;
            let cost=0;
            for(let i=0;i<productsArr.length;i++){
                Qua+=productsArr[i].Qantity;
                cost+=productsArr[i].Qantity * productsArr[i].price;
            }
            setQuantityValue(Qua);
            setAmount(cost);
        }
    }

    function handleOrder(){
        var myVar = setInterval(setModal(true), 1000);
        setTimeout(()=>{
            clearInterval(myVar);
            setModal(false);
            let localArr=JSON.parse(localStorage.getItem('products'));
            localArr.splice(0,localArr.length);
            localStorage.setItem("products",JSON.stringify(localArr));
            window.location.assign('/');

        },2000)
    }
    function handleIncrement(item){
        let localArr=JSON.parse(localStorage.getItem('products'))===null?[]:JSON.parse(localStorage.getItem('products'));
        let pos=-1;
        for(let i=0;i<localArr.length;i++){
            if(localArr[i].id===item.id){
                pos=i;
            }
        }
        if(pos>-1){
            localArr[pos].Qantity+=1;
            localStorage.setItem("products",JSON.stringify(localArr));
            handleOrderPlaceData()
        }
    }
    function handledecrement(item){
        let localArr=JSON.parse(localStorage.getItem('products'))===null?[]:JSON.parse(localStorage.getItem('products'));
        let pos=-1;
        for(let i=0;i<localArr.length;i++){
            if(localArr[i].id===item.id){
                pos=i;
            }
        }
        if(pos>-1){
            if(localArr[pos].Qantity>1){
                localArr[pos].Qantity-=1;
                localStorage.setItem("products",JSON.stringify(localArr));
                handleOrderPlaceData()
            } 
        }
    }
    function handleRemoveItem(item){
        let localArr=JSON.parse(localStorage.getItem('products'));
        let pos=-1;
        for(let i=0;i<localArr.length;i++){
            if(localArr[i].id===item.id){
                pos=i;
            }
        }
        localArr.splice(pos,1);
        localStorage.setItem("products",JSON.stringify(localArr));
        handleOrderPlaceData();
    }


    return (
        <> 
        <Header count={cartProductsCount}/>
        <div id="order_heading">
            <h2 style={{textAlign:'center'}}>Cart items</h2>
            <h4 style={{fontSize:20+"px"}}>Total items: {orderArr.length}</h4>
        </div>
        <div id="order-items-wrapper">
            <div id="order-items">
                    {orderArr.length&& orderArr.map((item,index)=>{
                        return  <div className="ordered-items-wraper" key={index}>
                            <div className="ordered-items-div">
                                <div className="ordered-items-img-wraper">
                                <img src={item.img} alt={item.name} className="ordered-items-img"/>
                                </div>
                                <div style={{marginTop:20+"px"}}>
                                <button className="remove" onClick={()=>handleRemoveItem(item)}><i className="fas fa-trash"></i></button>
                                <button className="change-qua" onClick={()=>handledecrement(item)}>-</button>
                                <span className="quantity">{item.Qantity}</span>
                                <button className="change-qua" onClick={()=>handleIncrement(item)}>+</button>
                                </div>
                            </div>
                            <div className="ordered-items-content-wraper">
                                <p>{item.name}</p>
                                <p>Price: <i className="fas fa-rupee-sign"></i> {item.price} for 1 Quantity</p>
                                <p>{item.size}</p>
                            </div>
                        </div>
                    })}
                   
               
            </div>
            <div id="order-total">
                    <h3 style={{marginBottom:0}}>Quantity: {quantityValue}</h3>
                    <h3 style={{marginBottom:0}}>Items: {orderArr.length}</h3>
                    <h3 style={{marginBottom:0}}>Total amount:</h3>
                    <div style={{marginTop:10+"px"}}><i className="fas fa-rupee-sign"></i><span id="cancle-amount">{amount}</span> {quantityValue===1?<span className="off-span">10% off <span className="amount-display"><i className="fas fa-rupee-sign"></i>{amount-Math.round(amount*(10/100))} </span></span>:<span className="off-span">15% off <span className="amount-display"><i className="fas fa-rupee-sign"></i>{amount-Math.round(amount*(15/100))} </span></span>}</div>
                    <button id="order-place-btn" onClick={handleOrder}>Place Order</button>
            </div>
        </div>
        <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div style={{color:'white',textAlign:'center',fontSize:25+"px",marginTop:30+'px'}}>Order Placed Successfully</div>     
        </Modal>
        </>
    );
}
 
export default Order;