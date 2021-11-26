import React, {useState} from 'react';
import { data, todays } from './data';
import Modal from 'react-modal';
import './cards.css'


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


const Cards = (props) => {
    const [active_reg,setActive_reg]=useState("active");
    const [active_med,setActive_med]=useState("non-active");
    const [active_lar,setActive_lar]=useState("non-active");
    const [modalIsOpen,setModal]=useState(false);
  
    function handleRegular(){
        setActive_reg("active");
        setActive_med("non-active");
        setActive_lar("non-active");
    }
    function handleMedium(){
        setActive_med("active");
        setActive_reg("non-active");
        setActive_lar("non-active");
    }
    function handleLarge(){
        setActive_lar("active");
        setActive_reg("non-active");
        setActive_med("non-active");
    }
    function handleCart(item){
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
        }else{
            localArr.push(item);
            localStorage.setItem("products",JSON.stringify(localArr));
        }
        props.onClick(localArr.length);
        var myVar = setInterval(setModal(true), 1000);
        setTimeout(()=>{
            clearInterval(myVar);
            setModal(false)
        },2000)
    }
  
    
   

    return ( 
        <div id="main">
            <div id="left-section">
                <div style={{marginBottom:20+"px"}} className={active_reg} onClick={handleRegular}>Regular</div>
                <div style={{marginBottom:20+"px"}} className={active_med} onClick={handleMedium}>Medium</div>
                <div style={{marginBottom:20+"px"}} className={active_lar} onClick={handleLarge}>Large</div>
            </div>
            <div id="main-section">
                {data.length&&data.map((item,index)=>{
                    if(item.size==="Regular" && active_reg==="active"){
                        return <div className="items-wrapper" key={index}>
                            <div className="item-content">
                                <p>{item.name}</p>
                                <p><i className="fas fa-rupee-sign"></i> {item.price}</p>
                                <button className="add-btn" onClick={()=>handleCart(item)}>Add to cart</button>
                            </div>
                            <div className="item-img-wraper">
                                <img src={item.img} alt={item.name} className="item-img"/>
                            </div>
                        </div>
                    }
                    if(item.size==="Medium" && active_med==="active"){
                        return <div className="items-wrapper" key={index}>
                            <div className="item-content">
                                <p>{item.name}</p>
                                <p><i className="fas fa-rupee-sign"></i> {item.price}</p>
                                <button className="add-btn" onClick={()=>handleCart(item)}>Add to cart</button>
                            </div>
                            <div className="item-img-wraper">
                                <img src={item.img} alt={item.name} className="item-img"/>
                            </div>
                        </div>
                    }
                    if(item.size==="Large" && active_lar==="active"){
                        return <div className="items-wrapper" key={index}>
                            <div className="item-content">
                                <p>{item.name}</p>
                                <p><i className="fas fa-rupee-sign"></i> {item.price}</p>
                                <button className="add-btn" onClick={()=>handleCart(item)}>Add to cart</button>
                            </div>
                            <div className="item-img-wraper">
                                <img src={item.img} alt={item.name} className="item-img"/>
                            </div>
                        </div>
                    }
                })}
            </div>
            <div id="right-section">
                <h3 style={{textAlign:'center'}}>Today Special Combo</h3>
                <div id="combo-image-wrapper">
                    <img src={todays.img} id="combo-img" alt="combo"/>
                </div>
                <div id="combo-content">
                    <p>{todays.name}</p>
                    <p><i className="fas fa-rupee-sign"></i> {todays.price}</p>
                </div>
                <div>
                    <button id="combo-order-place" onClick={()=>handleCart(todays)}>Add to cart</button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div style={{color:'white',textAlign:'center',fontSize:25+"px",marginTop:30+'px'}}>Added</div>     
            </Modal>
        </div>
    );
}
 
export default Cards;