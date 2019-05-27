import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import MenuItem from "@material-ui/core/MenuItem";

import firebase from "../common/firebase";

const styles = theme => ({});

const advanceTypes = [
  {
    value: "Cash",
    label: "Cash"
  },
  {
    value: "Commodity",
    label: "Commodity"
  }
];

const commodities = [
  {
    value: "Seedlings",
    label: "Seedlings"
  },
  {
    value: "Fertilizer",
    label: "Fertilizer"
  },
  {
    value: "Chemicals",
    label: "Chemicals"
  },
  {
    value: "Polythene tubes",
    label: "Polythene tubes"
  }
];

const paymentModes = [
  {
    value: "Cash",
    label: "Cash"
  },
  {
    value: "Coffee",
    label: "Coffee"
  }
];
class CreateAdvances extends React.Component {
  constructor() {
    super();
    this.state = {
      advanceType: "",
      advanceAmount: "",
      commodityAdvanced: "",
      paymentMode: "",
      pricePerKg: "",
      totalCoffeeWeight: "",

      // inputValues
      amount: false,
      commodity: false
    };
  }

  componentWillMount() {
    // targetID retrieved from another component using onClick event listener
    console.log(this.props.id);
  }

  handleActivation = event => {
    if (event.target.value !== "Cash") {
      this.handleCashInput();
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.handleCommodityInput();
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleCashInput() {
    this.setState({
      amount: true,
      commodity: false
    });
  }
  handleCommodityInput() {
    this.setState({ amount: false, commodity: true });
  }
  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  // Check for empty fields
  isEmpty(value) {
    return value == null || value.length === 0;
  }

  handleSubmit = event => {
    // target ID retrieved from another component using onClick event listener
    const key = this.props.id;
    event.preventDefault();

    // get our form data out of state
    const advance = {
      advanceType: this.state.advanceType,
      advanceAmount: this.isEmpty(this.state.advanceAmount)
        ? 0
        : this.state.advanceAmount,
      //advanceAmount: this.state.advanceAmount,
      commodityAdvanced: this.state.commodityAdvanced,
      paymentMode: this.state.paymentMode,
      pricePerKg: this.state.pricePerKg,
      totalCoffeeWeight: this.state.totalCoffeeWeight,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    const advanceRef = firebase.database().ref(`advances/${key}`);

    advanceRef.push(advance);
    this.setState({
      advanceType: "",
      advanceAmount: "",
      commodityAdvanced: "",
      paymentMode: "",
      pricePerKg: "",
      totalCoffeeWeight: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="inherit">
                Advances
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                id="advanceType"
                select
                name="advanceType"
                value={this.state.advanceType}
                onChange={event => this.handleActivation(event)}
                label="Advance type*"
                fullWidth
                helperText="Please select advance type"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {advanceTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="advanceAmount"
                disabled={this.state.amount}
                name="advanceAmount"
                value={this.state.advanceAmount}
                onChange={this.onChange}
                label="Advance amount"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="commodityAdvanced"
                disabled={this.state.commodity}
                select
                name="commodityAdvanced"
                value={this.state.commodityAdvanced}
                onChange={this.onChange}
                label="Commodity Advanced"
                fullWidth
                helperText="Please select commodity advanced"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {commodities.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="paymentMode"
                select
                name="paymentMode"
                value={this.state.paymentMode}
                onChange={this.onChange}
                label="Mode of payment"
                fullWidth
                helperText="Please select mode of payment"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {paymentModes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="totalCoffeeWeight"
                name="totalCoffeeWeight"
                value={this.state.totalCoffeeWeight}
                onChange={this.onChange}
                label="Total coffee weight"
                helperText="based on price"
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
                Save Advance
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateAdvances);
