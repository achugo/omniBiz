import React from 'react';
import '../scss/style.scss'
import Home from './Home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom'
import Employee from './Employee/Employee';
import Allreport from './reports/Allreport';
import SingleReport from './reports/SingleReport';


  
const App = () => {
    return (
       <Router>
        <Switch>
            <Route path="/employee" component={Employee} />
            <Route path="/reports" component={Allreport} />
            <Route path="/report/:user" component={SingleReport} />
           <Route exact path="/" component={Home} />
        </Switch>
       </Router>
    )
}

export default App;