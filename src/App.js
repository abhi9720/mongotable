import React from 'react';
import Sidebar from './Component/Sidebar';

import { Route, Switch, useHistory } from "react-router-dom";
import Manageuser from './Pages/ManageUser';
import ManageSession from './Pages/ManageSession';
import ManageConfigurations from './Pages/ManageConfigurations';
import Login from './Pages/Login';
import ERROR404 from './Pages/ERROR404';

import useToken from './useToken';

function App() {
  const history = useHistory();
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
  else {
    history.push("/manageusers")
  }
  return (
    <>
      <main>
        <div className="Container" style={{
          padding: "5px"
        }}>
          <Sidebar />
          <Switch>
            <Route exact path="/manageusers" component={Manageuser} />
            <Route exact path="/managesessios" component={ManageSession} />
            <Route exact path="/manageconfig" component={ManageConfigurations} />
            <Route exatc path="*" component={ERROR404} />
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;