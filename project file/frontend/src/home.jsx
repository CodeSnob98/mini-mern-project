import React ,{Component}from "react";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import "./homepage.css";

export default class Home extends Component{
  constructor(props){
    super(props);
}

  render (){
      const componentClicked=()=>{}
    const responseFacebook = (response) => {
       this.props.makelogin();
      this.props.history.push('/mainpage/')
        console.log("success fb",response);
      }
      const responseGoogle = (response) => {
        this.props.makelogin();
       this.props.history.push('/mainpage/');
        console.log("success gg",response);
      }
    return (<>
    <div id="logo"><h1>Logo</h1></div>  
        <div id="body">
          <div>
          login
          <div id="container">
          <div id="google">
            <GoogleLogin
        clientId="951190000011-13igv8t80h6qp26u7s8viqpv75rssf69.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      </div>
      <div id="fb">
          <FacebookLogin
        appId="421280025573001"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook} />
        </div>
        </div>
        </div>
        </div>
        </>
      );
  }
}