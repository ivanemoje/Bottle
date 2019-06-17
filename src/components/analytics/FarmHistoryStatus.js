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

class FarmHistoryStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      sold: 0,
      opening: 0,
      closing: 0
    };
  }

  componentDidMount() {
    // Get mature & immature trees count
    const query = firebase
      .database()
      .ref("stock")
      .orderByKey();
    query.on("value", snapshot => {
      let openingCounter = 0;
      let closingCounter = 0;
      let soldCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Immature trees counter; convert string to int
        closingCounter =
         closingCounter +
          parseInt(childSnapshot.child("closing").val());

        // Mature trees counter; convert string to int
        openingCounter =
          openingCounter + parseInt(childSnapshot.child("opening").val());

        // Hectarage counter; convert string to int
        soldCounter =
          soldCounter + parseInt(childSnapshot.child("sold").val());
      });
      this.setState({
        opening: openingCounter,
        closing: closingCounter,
        sold: soldCounter
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
                Stock History & Status
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/stats.png"
                className={classes.bigAvatar}
              />
              <br />

              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Sold
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.sold}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Opening
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.opening}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Closing
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.closing}
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

export default withStyles(styles)(FarmHistoryStatus);
