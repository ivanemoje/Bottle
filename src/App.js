import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

import FarmerList from "./components/Farmer/FarmerList";
import FarmerDetails from "./components/Farmer/FarmerDetails";
import EditFarmer from "./components/Farmer/EditFarmer";
import ProcurementList from "./components/procurement/ProcurementList";

import AdvancesList from "./components/advances/AdvancesList";

import SalesList from "./components/sales/SalesList";
import PriceList from "./components/price/PriceList";

import GeneralSettings from "./components/settings/GeneralSettings";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <Header />
    <br />
    <br />
    <br />
    <br />

    <main className={classes.main}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/farmers" component={FarmerList} />
        <Route path="/show/:id" component={FarmerDetails} />
        <Route path="/farmers/edit" component={EditFarmer} />
        <Route path="/procurement" component={ProcurementList} />
        <Route path="/advances" component={AdvancesList} />
        <Route path="/sales" component={SalesList} />
        <Route path="/price" component={PriceList} />

        <Route path="/reports" />
        <Route path="/settings" component={GeneralSettings} />
      </Switch>
    </main>
  </React.Fragment>
);

export default withStyles(styles)(App);
