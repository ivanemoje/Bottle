import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import firebase from "../common/firebase";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Header from "../Header";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class GeneralSettings extends React.Component {
  state = {
    pricePerKg: ""
  };

  componentWillMount() {
    // procurement price setting.
    const priceRef = firebase
      .database()
      .ref("settings")
      .orderByKey();
    priceRef.on("value", snapshot => {
      let priceConfig = "";
      snapshot.forEach(function(childSnapshot) {
        priceConfig = childSnapshot.child("pricePerKg").val();
      });
      this.setState({
        pricePerKg: priceConfig
      });
      console.log(this.state.pricePerKg);
    });
  }
  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePriceSetting = event => {
    event.preventDefault();

    // get our form data out of state
    //const date = Date.now();
    console.log(Date(Date.now()));
    const priceConfig = {
      pricePerKg: this.state.pricePerKg,
      dateConfigured: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    const settingsRef = firebase.database().ref("settings");

    settingsRef.push(priceConfig);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header />

        <main className={classes.layout}>
          <form onSubmit={this.handlePriceSetting}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <Typography component="h2" variant="h4" align="center">
                  General Settings
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="headline" align="left" color="inherit">
                  Procurement prices
                </Typography>
              </Grid>

              <Grid item xs={9} sm={9}>
                <TextField
                  id="pricePerKg"
                  name="pricePerKg"
                  label="Price per kg"
                  type="number"
                  required
                  fullWidth
                  className={classes.textField}
                  value={this.state.pricePerKg}
                  onChange={this.onChange}
                  margin="normal"
                />
              </Grid>

              <Grid>
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GeneralSettings);
