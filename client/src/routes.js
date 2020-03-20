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
import SampleDashboard from "views/SampleDashboard.js";
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/info"
  },
  {
    path: "/sampledashboard",
    name: "Sample",
    icon: "tim-icons icon-chart-pie-36",
    component: SampleDashboard,
    layout: "/info"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/info"
  },
  {
    path: "/map",
    name: "Map",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/info"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/info"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/info"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/info"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/info"
  }
];
export default routes;
