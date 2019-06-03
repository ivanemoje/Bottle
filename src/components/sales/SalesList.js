import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import MenuItem from "@material-ui/core/MenuItem";

import MUIDataTable from "mui-datatables";
import CustomToolbarSales from "../mui-datatables/CustomToolbarSales";
import firebase from "../common/firebase";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const columns = [
  "",
  {
    name: "Fullname",
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: "Address",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Goods Purchased",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Phone",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Unit Price",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Quantity",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Total price",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Actions",
    options: {
      filter: false,
      sort: false
    }
  }
];

const styles = {
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#327F24"
  }
};

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

class SalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
      bar: "",
      unitPrice: "",
      quantity: "",
      drink: "",
      brand: "",
      totalPrice: "",

      dataValue: "Beer"
    };

    this.handleOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
  }

  componentDidMount() {
    const salesRef = firebase.database().ref("sales");

    salesRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          bar: items[item].bar,
          unitPrice: items[item].unitPrice,
          quantity: items[item].quantity,
          drink: items[item].drink,
          brand: items[item].brand,
          totalPrice: items[item].totalPrice
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
    });
  }

  updateSale(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(id);
    this.handleOpen();

    const key = id;
    const salesRef = firebase.database().ref(`sales/${key}`);
    salesRef.on("value", snapshot => {
      // handle read data.
      //let data = snapshot.val();
      //this.setState(data);

      this.setState({
        key: snapshot.key,
        bar: snapshot.child("bar").val(),
        unitPrice: snapshot.child("unitPrice").val(),
        quantity: snapshot.child("quantity").val(),
        drink: snapshot.child("drink").val(),
        brand: snapshot.child("brand").val(),
        totalPrice: snapshot.child("totalPrice").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
  }

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
      bar: this.state.bar,
      unitPrice: this.state.unitPrice,
      quantity: this.state.quantity,
      drink: this.state.drink,
      brand: this.state.brand,
      totalPrice: this.state.totalPrice,
    };

    //Update farmer module
    const key = this.state.key;
    const farmersRef = firebase.database().ref(`sales/${key}`);
    farmersRef
      .update(sale)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };


  onChangeDrink = e => {
    this.setState({
      dataValue: e.target.value,
      drink: e.target.value,
      brand: ""
    });
    console.log(e.target.value);
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  CapitalizeInitial(str) {
    return str.charAt(0).toUpperCase();
  }

  render() {
    const { data } = this.state;
    const { classes } = this.props;

    const { dataValue } = this.state;
    const options_= lookup[dataValue];

    const {
      open,
      drink,
      brand,
      bar,
      unitPrice,
      quantity,
      totalPrice
    } = this.state;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true,
      customToolbar: () => {
        return <CustomToolbarSales />;
      },

      // Update farmers
      onRowClick: rowIndex => {
        //console.log(rowIndex);
        //this.handleOpen();
      },
      // Delete farmers
      onRowsDelete: rowsDeleted => {
        // get the corresponding id in state
        const row = rowsDeleted.data[0].index;
        const id = this.state.data[row]["id"];
        console.log(id);

        // Perform sale deletion and cascade if necessary
        firebase
          .database()
          .ref("sales")
          .child(id)
          .remove();
      }
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Sales list"}
          data={data.map((sale, index) => {
            return [
              <Avatar className={classes.purpleAvatar}>
                {this.CapitalizeInitial(sale.bar) }
              </Avatar>,
              <Link
                //to={`/show/${sale.id}`}
                to={"#"}
                style={{
                  color: "darkblue",
                  textDecoration: "none"
                }}
              >
                {sale.bar}
              </Link>,
              sale.unitPrice,
              sale.quantity,
              sale.drink,
              sale.brand,
              sale.totalPrice,
    
              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateSale.bind(this, sale.id)}
              >
                <EditIcon color="primary" />
              </IconButton>
            ];
          })}
          columns={columns}
          options={options}
        />

        <Dialog
          id="myDialog"
          maxWidth="sm"
          open={open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{ backgroundColor: "navy" }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Edit Sale
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <br />

              <Typography variant="headline" align="left" color="inherit">
                Sales Record
              </Typography>
              <br />
              <br />

              <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
              <TextField
                required
                id="drink"
                select
                name="drink"
                value={drink}
                onChange={this.onChangeDrink}
                label="drink"
                fullWidth
                helperText="Please select drink"
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
                value={brand}
                onChange={this.onChange}
                label="Brand"
                fullWidth
                helperText="Please select Brand"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {options_.map(option => (
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
                value={bar}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SalesList);
