import React from 'react';
import Sidebar from './Component/Sidebar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router";

import Manageuser from './Pages/ManageUser';
import ManageSession from './Pages/ManageSession';
import ManageConfigurations from './Pages/ManageConfigurations';
import Login from './Pages/Login';
import ERROR404 from './Pages/ERROR404';

import useToken from './useToken';
import EditProfile from './Component/EditProfile';

function App() {
  const router = useHistory();
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
  else {


  }
  return (
    <BrowserRouter>

      <div className='Container' style={{
        padding: '5px'
      }}>
        <Sidebar />
        <Switch>
          <Route exact path='/profile/:id' component={EditProfile} />
          <Route exact path='/manageusers' component={Manageuser} />
          <Route exact path='/managesessios' component={ManageSession} />
          <Route exact path='/manageconfig' component={ManageConfigurations} />
          <Route exact path='*' component={ERROR404} />
        </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;