import React from "react";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Analytics from "./analytics.jsx";
import Response from './responseform.jsx'
import "./mainpage.css";

export default function Mainpage (props){
    const [clicked,setClick]=React.useState(false);
    const [d1,setD1]=React.useState("");
    const [d2,setD2]=React.useState("");
    const [label1,setLabel1]=React.useState([]);
    const [label2,setLabel2]=React.useState([]);

    React.useEffect( ()=>{
        var countD;
        if(d1!==""&&d2!==""&& d1<d2){
        const getCount =async()=>{
                const data1= await axios.put("http://localhost:5000/mainpage", { date1:d1,date2:d2 }).then(response => {
                    console.log("the response",response);
                    countD=response.data;
                  })
                  .catch(error => {
                    console.log(error);
                  });
                console.log(countD);
                console.log(d1);
                console.log(d2);
                console.log("useeffect2");
                let l1=[];
                let l2=[];
                for(let i=0;i<countD.length;i++){
                    l1.push(countD[i]._date);
                    l2.push(parseInt(countD[i]._count));
                }
            setLabel1(l1);
            setLabel2(l2);
            }
            getCount();
        }else{
            setLabel1([]);
            setLabel2([]);
        }

    },[d1,d2])

      if(!window.sessionStorage.getItem('isloggedin')){
          return(
              <>
              <Redirect to="/"/>
              </>
          );
      }
       return (
        <div >
        <div id="buttons">  <h1 id="logo1">logo</h1><div id="controls"><button id="contactus" onClick={()=>setClick(false)} disabled={!clicked} >Contact Us</button></div>
        <div id="controlana"><button id="analytics" onClick={()=>setClick(true)} disabled={clicked}>analytics</button></div>
        <div id="controllog"><button id="logout"onClick={()=>{
            window.sessionStorage.removeItem('isloggedin'); 
                props.history.replace("/");
                
            }
        }>logout</button></div>
        </div>
        <div >
        {clicked&& (<div id="dates"><div id="d1pad"><input id="d1" type="date" onChange={event=>setD1(event.target.value.replace(/-/g,'/'))}></input></div>
        <input id="d2" type="date" onChange={event=>setD2(event.target.value.replace(/-/g,'/'))}></input></div>)}
        <div id="body">
            {
            clicked?<Analytics label1={label1} label2={label2} />:<Response/>
            }</div></div>
        </div>
      );
    

}