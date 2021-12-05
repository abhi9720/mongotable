import React from 'react';
import Sidebar from './Component/Sidebar';

import { Route, Switch } from "react-router-dom";
import Manageuser from './Pages/ManageUser';
import ManageSession from './Pages/ManageSession';
import ManageConfigurations from './Pages/ManageConfigurations';

function App() {
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
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;