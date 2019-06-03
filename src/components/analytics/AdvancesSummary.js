import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({
  bigAvatar: {
    width: 200,
    height: 200
  }
});

class AdvancesSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      received: 0,
      value: 0,
      weight: 0
    };
  }

  componentDidMount() {
    // Get count of farmers who have received advances
    const farmersRef = firebase.database().ref("advances");
    farmersRef.on("value", snapshot => {
      console.log(snapshot);
      const farmerCount = snapshot.numChildren();
      this.setState({
        received: farmerCount
      });
    });

    // Get value of advances provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let valueCounter = 0;
      let weightCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values

        childSnapshot.forEach(grandChildSnapshot => {
          //console.log(grandChildSnapshot.child("advanceAmount").val());
          console.log(grandChildSnapshot.child("totalCoffeeWeight").val());

          // Advance Value counter; convert string to int
          valueCounter =
            valueCounter +
            parseInt(grandChildSnapshot.child("advanceAmount").val());

          // Total coffee weight counter; convert string to int
          weightCounter =
            weightCounter +
            parseInt(grandChildSnapshot.child("totalCoffeeWeight").val());
        });
      });
      this.setState({
        value: valueCounter,
        weight: weightCounter
      });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <CardContent align="center">
              <Typography variant="headline" align="center" color="default">
                Advances Summary
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/advances.png"
                className={classes.bigAvatar}
              />
              <br />

              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Received
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.received}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Value
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.value}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Weight
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.weight}
                  </Typography>
                </Grid>
              </Grid>
              <br />
            </CardContent>
          </Card>
          <br />

          <br />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AdvancesSummary);
