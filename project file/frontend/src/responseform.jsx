import React from "react";
import axios from 'axios';
import Recaptcha from 'react-recaptcha'
import "./mainpage.css";

export default function Response (props){
    const [captcha, setCaptcha]=React.useState("false");
    const [fname, setFname]=React.useState("");
    const [lname, setLname]=React.useState("");
    const [email, setEmail]=React.useState("");
    const [msg, setMsg]=React.useState("");
    
    function recaptchaLoaded(){ 
        console.log("loaded captcha");
    }
    function verifyCallback(response){
        if(response){
            setCaptcha(true);
          }
    }
     function handleSubmit(){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(captcha&&fname&&lname&&re.test(String(email).toLowerCase())&&msg){
             axios.post("http://localhost:5000/mainpage",{
            firstN:fname,
            lastN:lname,
            email:email,
            msg:msg
           }).then((res)=>{console.log("data entered",res)}).catch(
            (err) => console.log('Exception Occured ', err)
           );
        }else{
            alert(`please, fill up the fields correctly`);
        }
    }
       return (
        <div id="material1" >
            <div id="response">
            <h1 id="lebel">Contact Us Form</h1>
            First Name
            <input id="text" type ="text" onChange={event => setFname(event.target.value)}/>
            <lable>Last Name</lable>
            <input id="text" type ="text" onChange={event => setLname(event.target.value)}/>
            <lable>Email</lable>
            <input id="text" type ="text" onChange={event => setEmail(event.target.value)}/>
            <lable>Message</lable>
            <textarea id="text" onChange={event => setMsg(event.target.value)}></textarea>
            <Recaptcha
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            render="explicit"
            verifyCallback={verifyCallback}
             onloadCallback={recaptchaLoaded}/>
            <button id="submit" onClick={handleSubmit} >Submit</button>
            </div>
        </div>
      );
    

}