import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "../Farmer/Snackbar";

import firebase from "../common/firebase";

const styles = theme => ({});

const coffeeTypes = [
  {
    value: "Cherry",
    label: "Cherry"
  },
  {
    value: "Parchment",
    label: "Parchment"
  },
  {
    value: "Mbuni",
    label: "Mbuni"
  }
];

const cashAvailability = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];

const payNowOptions = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];
class CreateProcurement extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: "",

      payNow: "",
      amountPaid: "",
      outstandingBalance: "",

      // Price per kg readOnly property
      readOnly: true
    };
  }

  componentWillMount() {
    // Global procurement price setting.
    const priceRef = firebase
      .database()
      .ref("settings")
      .orderByKey();
    priceRef.on("value", snapshot => {
      let priceConfig = "";
      snapshot.forEach(function(childSnapshot) {
        //console.log(childSnapshot.child("pricePerKg").val());
        priceConfig = childSnapshot.child("pricePerKg").val();
      });
      this.setState({
        pricePerKg: priceConfig
      });
      //console.log(this.state.pricePerKg);
    });

    //Retrieve advance balance
    const key = this.props.id;
    const advanceRef = firebase
      .database()
      .ref(`advances/${key}`)
      .orderByKey();
    advanceRef.on("value", snapshot => {
      //let advanceConfig = "";
      let advanceCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Mature trees counter; convert string to int
        advanceCounter =
          advanceCounter + parseInt(childSnapshot.child("advanceAmount").val());
      });
      this.setState({
        advanceBalance: advanceCounter
      });
      console.log(this.state.advanceBalance);
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

  handleCalculateValueSaleLiability = () => {
    this.setState({
      valueOfSaleLiability:
        this.state.todayValueSale - this.state.advanceBalance
    });
  };

  handleCalculateTodayValueSale = () => {
    this.setState({
      todayValueSale: this.state.pricePerKg * this.state.weight
    });
  };

  handleCalculateOutstandingBalance = () => {
    this.setState({
      outstandingBalance:
        this.state.valueOfSaleLiability - this.state.amountPaid
    });
  };

  handleSubmit = event => {
    // target ID retrieved from another component using onClick event listener
    const key = this.props.id;
    event.preventDefault();

    // get our form data out of state
    const procurement = {
      advanceBalance: this.state.advanceBalance,
      cashAvailabletoday: this.state.cashAvailabletoday,
      coffeeType: this.state.coffeeType,
      pricePerKg: this.state.pricePerKg,
      todayValueSale: this.state.todayValueSale,
      valueOfSaleLiability: this.state.valueOfSaleLiability,
      weight: this.state.weight,

      payNow: this.state.payNow,
      amountPaid: this.state.amountPaid,
      outstandingBalance: this.state.outstandingBalance,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    const procurementRef = firebase.database().ref(`procurement/${key}`);

    procurementRef.push(procurement);
    this.setState({
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: "",

      payNow: "",
      amountPaid: "",
      outstandingBalance: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Grid container spacing={24}>
            <Snackbar />
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="inherit">
                Procurement
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="advanceBalance"
                name="advanceBalance"
                value={this.state.advanceBalance}
                onChange={this.onChange}
                label="Advance Balance"
                type="number"
                inputProps={{
                  readOnly: Boolean(this.state.readOnly),
                  disabled: Boolean(this.state.readOnly)
                }}
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                id="coffeeType"
                select
                name="coffeeType"
                value={this.state.coffeeType}
                onChange={this.onChange}
                label="Coffee type*"
                fullWidth
                helperText="Please select coffee type"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {coffeeTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="weight"
                name="weight"
                value={this.state.weight}
                onChange={this.onChange}
                label="Weight"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="pricePerKg"
                name="pricePerKg"
                value={this.state.pricePerKg}
                onChange={this.onChange}
                label="Price Per Kg"
                type="number"
                inputProps={{
                  readOnly: Boolean(this.state.readOnly),
                  disabled: Boolean(this.state.readOnly)
                }}
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="todayValueSale"
                name="todayValueSale"
                value={this.state.todayValueSale}
                onClick={this.handleCalculateTodayValueSale}
                helperText="Click to display Today Value sale"
                label="Today Value Sale"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="valueOfSaleLiability"
                name="valueOfSaleLiability"
                value={this.state.valueOfSaleLiability}
                onClick={this.handleCalculateValueSaleLiability}
                label="Value of sale liability"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="cashAvailabletoday"
                select
                name="cashAvailabletoday"
                value={this.state.cashAvailabletoday}
                onChange={this.onChange}
                label="Cash available today?*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {cashAvailability.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="inherit">
                Payment of Farmer
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="payNow"
                select
                name="payNow"
                value={this.state.payNow}
                onChange={this.onChange}
                label="Pay now?*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {payNowOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="amountPaid"
                name="amountPaid"
                value={this.state.amountPaid}
                onChange={this.onChange}
                label="Amount paid"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="outstandingBalance"
                name="outstandingBalance"
                value={this.state.outstandingBalance}
                onClick={this.handleCalculateOutstandingBalance}
                //onChange={this.onChange}
                label="Outstanding balance"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Add Procurement
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateProcurement);
