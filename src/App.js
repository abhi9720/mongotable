import React from 'react';
import Sidebar from './Component/Sidebar';
import { Switch, Route, useHistory, BrowserRouter } from 'react-router-dom';


import Manageuser from './Pages/ManageUser';
import ManageSession from './Pages/ManageSession';
import ManageConfigurations from './Pages/ManageConfigurations';
import Login from './Pages/Login';
import ERROR404 from './Pages/ERROR404';

import useToken from './useToken';
import EditProfile from './Component/EditProfile';

function App() {
  const history = useHistory()
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
  else {
    history?.push('/manageusers')
  }
  return (

      <BrowserRouter history={window.history}>
    
      <div className="Container" style={{
        padding: "5px"
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
    </BrowserRouter >

  );
}

export default App;