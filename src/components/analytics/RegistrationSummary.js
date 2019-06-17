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

class RegistrationSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      numOfFarmers: "",
      beer: 0,
      soda: 0,

      beer_sold: 0,
      soda_sold: 0,
      

      beer_test: 0,
      soda_test: 0


    };
  }

  componentDidMount() {
    // Get Farmer count
    const farmersRef = firebase.database().ref("stock");
    farmersRef.on("value", snapshot => {
      const farmerCount = snapshot.numChildren();
      this.setState({
        numOfFarmers: farmerCount
      });
    });

    // Get gender count
    const query = firebase
      .database()
      .ref("stock")
      .orderByKey();
    query.on("value", snapshot => {
      let beerCounter = 0;
      let sodaCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Verify gender before incrementing by sex
        const isMale = childSnapshot.child("drink").val() === "Beer";

        if (isMale) {
          beerCounter += 1;
        } else {
          sodaCounter += 1;
        }
      });

      this.setState({
        beer: beerCounter,
        soda: sodaCounter
      } 
    //   , function () {
    //     console.log("Beer: "+this.state.beer);
    //     console.log("Soda: "+this.state.soda);
    // }
      );
     });


     const query_latest_beer = firebase
     .database()
     .ref("stock")
     .orderByChild("drink")
     .equalTo('Beer')
     .limitToLast(1);
     
     query_latest_beer.on("value", snapshot => {
     let beerCounter_ = 0;
     let sodaCounter_ = 0;
     snapshot.forEach(function(childSnapshot) {
       // Verify gender before incrementing by sex
       const isMale = childSnapshot.child("drink").val() === "Beer";

       if (isMale) {
         beerCounter_ += 1;
       } else {
         sodaCounter_ += 1;
       }
     });

     this.setState({
       beer_test: beerCounter_,
       soda_test: sodaCounter_
     } 
     , function () {
       console.log("Beer: "+this.state.beer_test);
   }
     );
    });


    const query_latest_soda = firebase
    .database()
    .ref("stock")
    .orderByChild("drink")
    .equalTo('Soda')
    .limitToLast(1);
    
    query_latest_soda.on("value", snapshot => {

    let soda_value = 0;
    snapshot.forEach(function(childSnapshot) {
     
      // const isMale = childSnapshot.child("drink").val() === "Beer";
      const soda_value =  childSnapshot.child("sold").val();
      console.log("Soda value: " + soda_value);
    });

    this.setState({
      soda_sold: soda_value

    } 
    , function () {
      console.log("Soda Sold: "+this.state.soda_sold);
  }
    );
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
                Saved Stock Summary
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/farmers.jpeg"
                className={classes.bigAvatar}
              />
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Total
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.numOfFarmers}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Beers
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.beer}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Sodas
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.soda}
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

export default withStyles(styles)(RegistrationSummary);
