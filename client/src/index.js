import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Components/table.js';
import College from './Components/college.js'
import StateColleges from './Components/stateColleges'
import CourseColleges from './Components/courseColleges'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route 
        exact = {true}
        path = "/"
        component = {Table}
      />
      <Route 
        exact = {true}
        path = "/college/:id"
        component = {College}
      />
      <Route 
        exact = {true}
        path = "/state/:name"
        component = {StateColleges}
      />
      <Route 
        exact = {true}
        path = "/courses/:name"
        component = {CourseColleges}
      />
    </Switch>
  </Router>,
  document.getElementById('root')
);