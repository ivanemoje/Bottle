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
import CustomToolbar from "../mui-datatables/CustomToolbar";
import firebase from "../common/firebase";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const columns = [
  "",
  {
    name: "Drink",
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: "Brand",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Opening",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Closing",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Sold",
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
    { id: "1", text: "Nile Special" },
    { id: "2", text: "Club" },
    { id: "3", text: "Nile Gold" },
    { id: "4", text: "Guiness" },
    { id: "5", text: "Castle Lager" }
  ],
  Soda: [
    { id: "1", text: "Mirinda Berry" },
    { id: "2", text: "Mirinda Orange" },
    { id: "3", text: "Coca Cola" },
    { id: "4", text: "Sprite" },
    { id: "5", text: "Coca Cola Zero" },
    { id: "6", text: "Pepsi" },
    { id: "7", text: "Stoney" },
    { id: "8", text: "Krest" },
    { id: "9", text: "Rock Boom" },
    { id: "10", text: "Soda 2" },
    { id: "11", text: "Soda 3" }
  ]
};




class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
      // firstname: "",
      // lastname: "",

      brand: "",
      drink: "",

      opening: "",
      closing: "",
      hectarage: "",

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
    const stockRef = firebase.database().ref("stock");

    stockRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,

          // firstname: items[item].firstname,
          // lastname: items[item].lastname,

          brand: items[item].brand,
          drink: items[item].drink,

          opening: items[item].opening,
          closing: items[item].closing,
          sold: items[item].sold
        });
      }

      //console.log(newState);

      this.setState({
        data: newState
      });

      //console.log(this.state.data);
    });
  }

  updateStock(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.handleOpen();

    const key = id;
    const stockRef = firebase.database().ref(`stock/${key}`);
    stockRef.on("value", snapshot => {
      // handle read data.
      //let data = snapshot.val();
      //traditionalAuthority: snapshot.child("traditionalAuthority").val(),
      //console.log(snapshot.child("traditionalAuthority").val());

      this.setState({
        key: snapshot.key,

        // firstname: snapshot.child("firstname").val(),
        // lastname: snapshot.child("lastname").val(),

        brand: snapshot.child("brand").val(),
        drink: snapshot.child("drink").val(),

        opening: snapshot.child("opening").val(),
        closing: snapshot.child("closing").val(),
        sold: snapshot.child("sold").val()
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

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const stock = {

      drink: this.state.drink,
      brand: this.state.brand,
      
      opening: this.state.opening,
      closing: this.state.closing,
      sold: this.state.sold
    };

    //Update stock module
    const key = this.state.key;
    const stockRef = firebase.database().ref(`stock/${key}`);
    stockRef
      .update(stock)
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
    //console.log(e.target.value);
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
    const brands = lookup[dataValue];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true,
      customToolbar: () => {
        return <CustomToolbar />;
      },

      // Update stock
      onRowClick: rowIndex => {
        //console.log(rowIndex);
        //this.handleOpen();
      },
      // Delete stock
      onRowsDelete: rowsDeleted => {
        // get the corresponding id in state
        const row = rowsDeleted.data[0].index;
        const id = this.state.data[row]["id"];
        console.log(id);

        // Perform stock deletion and all related objects(advances & procurments)
        firebase
          .database()
          .ref("stock")
          .child(id)
          .remove();

        firebase
          .database()
          .ref("advances")
          .child(id)
          .remove();

        firebase
          .database()
          .ref("procurement")
          .child(id)
          .remove();
        // Perform stock deletion and all related objects(advances & procurments)
      }
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Stock list"}
          data={data.map((stock, index) => {
            return [
              <Avatar className={classes.purpleAvatar}>
                {this.CapitalizeInitial(stock.drink) }
              </Avatar>,
              <Link
                //to={`/show/${sale.id}`}
                to={"#"}
                style={{
                  color: "darkblue",
                  textDecoration: "none"
                }}
              >
                {stock.drink}
              </Link>,

              
              stock.brand,
              stock.opening,
              stock.closing,
              stock.sold,

              <IconButton
                color="primary"
                //onClick={() => this.updateStock(index)}
                // The bind method also works
                onClick={this.updateStock.bind(this, stock.id)}
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
          open={this.state.open}
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
              Edit Stock
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <br />
              <Typography variant="headline" align="left" color="inherit">
                Autobiography
              </Typography>
              <br />
             <Grid container spacing={24}>
                 {/*  <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                    label="Firstname"
                    fullWidth
                    autoComplete="off"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    label="Lastname"
                    fullWidth
                    autoComplete="off"
                    InputLabelProps={{
                      shrink: true
                    }}
                  /> 
                </Grid> */}
                
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
                    name="brand"
                    value={this.state.brand}
                    select
                    onChange={this.onChange}
                    label="Brand"
                    fullWidth
                    helperText="Please select Brand"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {brands.map(ta => (
                      <MenuItem key={ta.id} value={ta.value}>
                        {ta.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant="headline" align="left" color="inherit">
                    Farm History and Status
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="opening"
                    name="opening"
                    value={this.state.opening}
                    onChange={this.onChange}
                    label="Opening Stock "
                    helperText="(Enter number)"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="closing"
                    name="closing"
                    value={this.state.closing}
                    onChange={this.onChange}
                    label="Closing Stock"
                    helperText="(Enter number)"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="sold"
                    name="sold"
                    value={this.state.sold}
                    onChange={this.onChange}
                    label="Sold Stock"
                    helperText="(Enter number)"
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
                    Update Stock
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

export default withStyles(styles)(StockList);
