
import React from "react";
import {Route,Switch} from 'react-router-dom';
import Home from "./home.jsx"
import Mainpage from "./mainpage.jsx";
function App() {
  function makelogin(){
    window.sessionStorage.setItem('isloggedin',true);
  }

  return (
    <div>
      <Switch>
        <Route exact path="/mainpage" render={(props)=><Mainpage isloggedin={window.sessionStorage.getItem('isloggedin')} {...props} />}/>
        <Route exact path="/" render={(props)=><Home  makelogin={makelogin} {...props}/>}/>
        <Route path="*" component={()=>"Error 404"}/>
      </Switch>
    </div>
  );
}

export default App;
