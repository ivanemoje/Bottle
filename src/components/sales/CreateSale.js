import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({});

const bars = [
  {
    value: "Bar 1",
    label: "Bar 1"
  },
  {
    value: "Bar 2",
    label: "Bar 2"
  },
  {
    value: "Bar 3",
    label: "Bar 3"
  }
];


const drinks = [
  {
    value: "Beer",
    label: "Beer"
  },
  {
    value: "Soda",
    label: "Soda"
  }
];

const lookup = {
  Beer: [
    { id: "1", text: "Kameme" },
    { id: "2", text: "Mwabulambya" },
    { id: "3", text: "Mwenemisuku" },
    { id: "4", text: "Mwenewenya" },
    { id: "5", text: "Nthalire" }
  ],
  Soda: [
    { id: "1", text: "Chikulamayembe" },
    { id: "2", text: "Chipinduka" },
    { id: "3", text: "Kachulu" },
    { id: "4", text: "Mwahenga" },
    { id: "5", text: "Mwalweni" },
    { id: "6", text: "Mwamlowe" },
    { id: "7", text: "Mwankhunikira" },
    { id: "8", text: "Nyika National Park" },
    { id: "9", text: "Rumphi Boma" },
    { id: "10", text: "Vwaza Game Reserve" },
    { id: "11", text: "Zolokere" }
  ]
};

class CreateSale extends React.Component {
  constructor() {
    super();
    this.state = {
      bar: "Bar 1",
      // goodsPurchased: "",
      // phone: "",
      unitPrice: "",
      quantity: "",
      drink: "",
      brand: "",
      totalPrice: "",
      dataValue: "Beer"
    };
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onChangeDrink = e => {
    this.setState({
      dataValue: e.target.value,
      drink: e.target.value,
      brand: ""
    });
    console.log(e.target.value);
  };

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCalculateTotalPrice = () => {
    this.setState({
      totalPrice: this.state.quantity * this.state.unitPrice
    });
  };




  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const sale = {
      drink: this.state.drink,
      brand: this.state.brand,
      bar: this.state.bar,
      // goodsPurchased: this.state.goodsPurchased,
      // phone: this.state.phone,
      unitPrice: this.state.unitPrice,
      quantity: this.state.quantity,
      totalPrice: this.state.totalPrice,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    console.log(sale);


    //Save sale record
    const salesRef = firebase.database().ref("sales");

    salesRef.push(sale);
    this.setState({
      drink: "",
      brand: "",
      bar: "",
      // goodsPurchased: "",
      // phone: "",
      unitPrice: "",
      quantity: "",
      totalPrice: ""
    });
  };

  render() {
    const {
      unitPrice,
      quantity,
      totalPrice
    } = this.state;

    const { dataValue } = this.state;
    const options = lookup[dataValue];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Typography variant="headline" align="left" color="inherit">
            Sales Record
          </Typography>

          <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
              <TextField
                required
                id="drink"
                select
                name="drink"
                value={this.state.drink}
                onChange={this.onChangeDrink}
                label="Drink"
                fullWidth
                helperText="Please select Drink"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {drinks.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="brand"
                select
                name="brand"
                value={this.state.brand}
                onChange={this.onChange}
                label="Brand"
                fullWidth
                helperText="Please select Brand"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {options.map(option => (
                  <MenuItem key={option.id} value={option.text}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="bar"
                select
                name="bar"
                value={this.state.bar}
                onChange={this.onChange}
                label="Bar*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {bars.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>         
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="unitPrice"
                name="unitPrice"
                value={unitPrice}
                onChange={this.onChange}
                label="Unit Price"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={this.onChange}
                label="Quantity"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                onClick={this.handleCalculateTotalPrice}
                label="Total Price"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
              >
                Create Sale
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateSale);
