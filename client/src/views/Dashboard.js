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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps({ data }) {
    this.setState(data);
  }

  render() {
    const {
      totalCases,
      totalDeaths,
      totalRecovered,
      deathRate,
      recoveryRate,
      countryData,
      ageData
    } = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4">
              <Card className="card-chart text-center">
                <CardHeader>
                  <h1>Global Deaths</h1>
                  <CardTitle>
                    <h1 className="text-primary">
                      <i className="tim-icons icon-world text-primary" />
                      {totalDeaths}
                    </h1>
                    <h4>Death Rate</h4>
                    <h3 className="text-primary">{deathRate}%</h3>
                    <h5>US Influenza Deaths / Death Rate 2019-2020</h5>
                    <h6 className="text-primary">
                      22,000 – 55,000 / 0.061% - 1.078%
                    </h6>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart text-center">
                <CardHeader>
                  <h1>Global Cases</h1>
                  <CardTitle>
                    <h1 className="text-warning">
                      <i className="tim-icons icon-world text-warning" />
                      {totalCases}
                    </h1>
                    <h5>US Influenza Cases 2019-2020</h5>
                    <h6 className="text-warning">36,000,000 – 51,000,000</h6>
                  </CardTitle>
                </CardHeader>
              </Card>
              <div className="text-center" style={{ width: "100%" }}>
                <h1> CORONA-FACT.COM</h1>
              </div>
            </Col>
            <Col lg="4">
              <Card className="card-chart text-success text-center">
                <CardHeader>
                  <h1>Global Recovered</h1>
                  <CardTitle>
                    <h1 className="text-success">
                      <i className="tim-icons icon-world text-success" />
                      {totalRecovered}
                    </h1>
                    <h4>Recovery Rate</h4>
                    <h3 className="text-success">{recoveryRate}%</h3>
                    <h5>US Influenza Hospitalizations 2019-2020</h5>
                    <h5 className="text-success">370,000 – 670,000</h5>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            {/* <Col lg="6">
              <Card className="card-chart text-danger text-center card-center">
                <CardHeader>
                  <h4>Global Heat Map</h4>
                </CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <MapWrapper
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJWYCZNOFZ7sm3toZbMhuDay4KcDyJnXM"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col> */}
            <Col lg="7">
              <Card className="card-chart text-danger text-center card-center">
                <CardHeader>
                  <h4>Data By Location</h4>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Country/Other</th>
                          <th className="text-warning">Cases</th>
                          <th className="text-warning">Active</th>
                          <th className="text-warning">Today</th>
                          <th className="text-primary">Deaths</th>
                          <th className="text-primary">Today</th>
                        </tr>
                      </thead>
                      <tbody>
                        {countryData &&
                          countryData.map(
                            ({
                              country_name,
                              country_cases,
                              country_active,
                              cases_today,
                              country_deaths,
                              deaths_today
                            }) => {
                              return (
                                <tr>
                                  <td>{country_name}</td>
                                  <td>
                                    <b className="text-warning">
                                      {country_cases}
                                    </b>
                                  </td>
                                  <td>
                                    <b className="text-warning">
                                      {country_active}
                                    </b>
                                  </td>
                                  <td>
                                    <b className="text-warning">
                                      {cases_today}
                                    </b>
                                  </td>
                                  <td>
                                    <b className="text-primary">
                                      {country_deaths}
                                    </b>
                                  </td>
                                  <td>
                                    <b className="text-primary">
                                      {deaths_today}
                                    </b>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </CardBody>
                </CardHeader>
              </Card>
            </Col>

            <Col lg="5">
              <Card className="card-chart text-center card-center">
                <CardHeader>
                  <h4>Data By Age</h4>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Age Range</th>
                        <th className="text-primary">Death Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryData &&
                        ageData.map(({ ageRange, ageDeathRate }) => {
                          return (
                            <tr>
                              <td>{ageRange}</td>
                              <td>
                                <b className="text-primary">{ageDeathRate}</b>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8ec3b9"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1a3646"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#64779e"
              }
            ]
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#334e87"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6f9ba5"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3C7680"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#304a7d"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#2c6675"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#9d2a80"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#9d2a80"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#b0d5ce"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#3a4762"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#0e1626"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#4e6d70"
              }
            ]
          }
        ]
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);
