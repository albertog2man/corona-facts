/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import { createBrowserHistory } from "history";
import AdminLayout from "layouts/Default.js";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

dotenv.config();

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/info" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/info/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
