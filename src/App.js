import React from 'react';
import Sidebar from './Component/Sidebar';
import Table from './Component/Table';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Manageuser from './Pages/ManageUser';
import ManageSession from './Pages/ManageSession';
import ManageConfigurations from './Pages/ManageConfigurations';
function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/login" component={Manageuser} />
          <Route exact path="/register" component={ManageSession} />
          <Route exact path="/profiles" component={ManageConfigurations} />
        </Switch>

        <Table />

      </Router>
    </>
  );
}

export default App;