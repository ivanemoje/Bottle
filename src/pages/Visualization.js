import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import RegistrationSummary from "../components/analytics/RegistrationSummary";
import FarmHistoryStatus from "../components/analytics/FarmHistoryStatus";
import AdvancesSummary from "../components/analytics/AdvancesSummary";
import ProcurementSummary from "../components/analytics/ProcurementSummary";
import AdvancesReport from "../components/analytics/AdvancesReport";
import AdvancesMode from "../components/analytics/AdvancesMode";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Visualization extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <Typography variant="headline" align="center">
          Analytics
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <RegistrationSummary />
          </Grid>
          <Grid item xs={4}>
            <FarmHistoryStatus />
          </Grid>
          <Grid item xs={4}>
            <AdvancesSummary />
          </Grid>
          {/*
          <Grid item xs={3}>
            <ProcurementSummary />
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <PieChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <BarChart />
            </Paper>
          </Grid>
          */}
        </Grid>
        <br />
        <Typography variant="headline" align="center">
          Advances
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <AdvancesReport />
          </Grid>
          <Grid item xs={6}>
            <AdvancesMode />
          </Grid>
          <br />

          <br />
        </Grid>

        <br />
        <Typography variant="headline" align="center">
          Procurement
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <ProcurementSummary />
          </Grid>
          <Grid item xs={6} />

          <br />

          <br />
        </Grid>
      </div>
    );
  }
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Visualization);
