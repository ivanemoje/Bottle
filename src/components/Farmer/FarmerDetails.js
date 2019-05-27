import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import firebase from "../common/firebase";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PollIcon from "@material-ui/icons/Poll";

import CreateProcurement from "../procurement/CreateProcurement";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CreateAdvance from "../advances/CreateAdvance";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,

    flexGrow: 1
  },

  bigAvatar: {
    width: 60,
    height: 60
  },
  fab: {
    margin: theme.spacing.unit
  },

  tableRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class FarmerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      traditionalAuthority: "",
      district: "",
      yearOpened: "",
      matureTrees: "",
      immatureTrees: "",
      hectarage: "",

      // Dashboard registration summary
      value: 0,
      males: 0,
      females: 0,

      // Procurement create
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      weight: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",

      // Procurement edit & listing
      procurementData: [],
      advanceCounter: "",

      // Advances edit & listing
      advancesData: [],

      // Advance dialog settings
      isVisible: false
    };
  }

  componentDidMount() {
    const key = this.props.match.params.id;
    //console.log(key);
    /********************** Retrieve advance balance *********************/
    const advanceRef = firebase
      .database()
      .ref(`advances/${key}`)
      .orderByKey();
    advanceRef.on("value", snapshot => {
      let advanceCounter = 0;
      //console.log(advanceCounter);
      snapshot.forEach(function(childSnapshot) {
        // Mature trees counter; convert string to int
        advanceCounter =
          advanceCounter + parseInt(childSnapshot.child("advanceAmount").val());
        //console.log(advanceCounter);
      });
      this.setState({
        advanceCounter: advanceCounter
      });

      console.log(this.state.advanceCounter);
    });
    /********************** Retrieve advance balance *********************/

    // Farmer procurement data.
    const procurementRef = firebase.database().ref(`procurement/${key}`);
    procurementRef.on("value", snapshot => {
      let procurementInfo = {};
      let newState = [];
      let advanceBalance = this.state.advanceCounter;
      snapshot.forEach(function(childSnapshot) {
        // handle read data.
        var p = childSnapshot.val();
        //console.log(childSnapshot.key);

        procurementInfo = {
          id: childSnapshot.key,
          advanceBalance: advanceBalance,
          cashAvailabletoday: p.cashAvailabletoday,
          coffeeType: p.coffeeType,
          pricePerKg: p.pricePerKg,
          todayValueSale: p.todayValueSale,
          valueOfSaleLiability: p.valueOfSaleLiability,
          weight: p.weight,
          payNow: p.payNow,
          amountPaid: p.amountPaid,
          outstandingBalance: p.outstandingBalance
        };
        // Add procurement objecet to array
        newState.push(procurementInfo);
      });
      this.setState({
        procurementData: newState
      });

      //console.log(this.state.procurementData);
    });

    // Farmer advances data.
    const advancesRef = firebase.database().ref(`advances/${key}`);
    advancesRef.on("value", snapshot => {
      let advanceInfo = {};
      let newState = [];
      snapshot.forEach(function(childSnapshot) {
        // handle read data.
        var a = childSnapshot.val();
        //console.log(childSnapshot.key);

        advanceInfo = {
          advanceID: childSnapshot.key,
          advanceType: a.advanceType,
          advanceAmount: a.advanceAmount,
          commodityAdvanced: a.commodityAdvanced,
          paymentMode: a.paymentMode,
          pricePerKg: a.pricePerKg,
          totalCoffeeWeight: a.totalCoffeeWeight
        };
        // Add advance object to array
        newState.push(advanceInfo);
      });
      this.setState({
        advancesData: newState
      });

      //console.log(this.state.advancesData);
    });

    // Farmer registration data.
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef.on("value", snapshot => {
      // handle read data.
      const firstname = snapshot.child("firstname").val();
      const lastname = snapshot.child("lastname").val();
      const title = snapshot.child("title").val();
      const sex = snapshot.child("sex").val();
      const maritalStatus = snapshot.child("maritalStatus").val();

      const phone = snapshot.child("phone").val();
      const mmRegistered = snapshot.child("mmRegistered").val();
      const mmPayment = snapshot.child("mmPayment").val();

      const traditionalAuthority = snapshot.child("traditionalAuthority").val();
      const district = snapshot.child("district").val();

      const yearOpened = snapshot.child("yearOpened").val();
      const matureTrees = snapshot.child("matureTrees").val();
      const immatureTrees = snapshot.child("immatureTrees").val();
      const hectarage = snapshot.child("hectarage").val();

      this.setState({
        id: key,
        firstname: firstname,
        lastname: lastname,
        title: title,
        sex: sex,
        maritalStatus: maritalStatus,
        phone: phone,
        mmRegistered: mmRegistered,
        mmPayment: mmPayment,
        traditionalAuthority: traditionalAuthority,
        district: district,
        yearOpened: yearOpened,
        matureTrees: matureTrees,
        immatureTrees: immatureTrees,
        hectarage: hectarage,

        //Dialog box
        open: false
      });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleVisible = () => {
    this.setState({ isVisible: true });
  };

  handleInVisible = () => {
    this.setState({ isVisible: false });
  };
  handleClose = () => {
    this.setState({
      open: false,

      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      weight: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: ""
    });
  };

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeTodayValueSale = () => {
    this.setState({
      todayValueSale: this.state.pricePerKg * this.state.weight
    });
  };

  handleSubmit = event => {};

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={3} sm={3}>
            <Link to="/farmers" className={classes.link}>
              <Fab
                color="primary"
                size="small"
                align="center"
                aria-label="Add"
                className={classes.fab}
              >
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography variant="display1" component="h4">
              Stock Details
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={3} sm={3}>
            <Card className={classes.card}>
              <CardHeader />
              <CardContent align="center">
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/profile.jpeg"
                  className={classes.bigAvatar}
                />

                <Typography
                  variant="h6"
                  component="h4"
                  style={{ fontWeight: "bold" }}
                >
                  {this.state.title}.{" "}
                  {this.state.firstname + " " + this.state.lastname}
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Lives in {this.state.traditionalAuthority},{" "}
                  {this.state.district}
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Farm opened in <b>{this.state.yearOpened}</b>
                </Typography>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="title" gutterBottom align="center">
                      Hectarage
                    </Typography>
                    <Typography
                      variant="title"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {this.state.hectarage}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="title" gutterBottom align="center">
                      Mature
                    </Typography>
                    <Typography
                      variant="title"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {this.state.matureTrees}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="title" gutterBottom align="center">
                      Immature
                    </Typography>
                    <Typography
                      variant="title"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {this.state.immatureTrees}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <br />
            <Paper className={classes.root} elevation={1} align="center">
              <Fab
                color="primary"
                size="medium"
                align="center"
                aria-label="Add"
                className={classes.fab}
              >
                <PersonIcon />
              </Fab>
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={5} sm={5}>
                  <Typography variant="body1" gutterBottom align="left">
                    Gender:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Marital status:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Mobile:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    MM Registered?:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Payments via MM?:
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7}>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.sex}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.maritalStatus}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.phone}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.mmRegistered}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.mmPayment}
                  </Typography>
                </Grid>
              </Grid>
              <br />

              <br />
            </Paper>
            <br />
          </Grid>
          <Grid item xs={9} sm={9}>
            <Paper square className={classes.root} elevation="0">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab icon={<PhoneIcon />} label="PROCUREMENTS" />
                <Tab icon={<FavoriteIcon />} label="ADVANCES" />
                <Tab icon={<PollIcon />} label="REPORTS" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Fab
                    color="primary"
                    variant="extended"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleOpen.bind(this)}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Procurement
                  </Fab>
                  <br />
                  <br />
                  <br />
                  {/* Procurement details for farmer*/}
                  <Paper className={classes.tableRoot}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Advance balance</TableCell>
                          <TableCell align="left">
                            Cash available today
                          </TableCell>
                          <TableCell align="left">Coffee type</TableCell>
                          <TableCell align="left">Price per Kg</TableCell>
                          <TableCell align="left">Total value sale</TableCell>
                          <TableCell align="left">Pay now</TableCell>
                          <TableCell align="left">Amount paid</TableCell>
                          <TableCell align="left">
                            Outstanding balance
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.procurementData.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.advanceBalance}
                            </TableCell>
                            <TableCell align="left">
                              {row.cashAvailabletoday}
                            </TableCell>

                            <TableCell align="left">{row.coffeeType}</TableCell>
                            <TableCell align="left">{row.pricePerKg}</TableCell>
                            <TableCell align="left">
                              {row.totalValueSale}
                            </TableCell>
                            <TableCell align="left">{row.payNow}</TableCell>
                            <TableCell align="left">{row.amountPaid}</TableCell>
                            <TableCell align="left">
                              {row.outstandingBalance}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>

                  {/* Procurement details for farmer*/}
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Fab
                    color="primary"
                    variant="extended"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleVisible.bind(this)}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Advance
                  </Fab>
                  <br />

                  {/* Farmer Advances listings */}
                  <Paper className={classes.tableRoot}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Advance type</TableCell>
                          <TableCell align="left">Advance amount</TableCell>
                          <TableCell align="left">Commodity</TableCell>
                          <TableCell align="left">Mode of payment</TableCell>
                          <TableCell align="left">Price per kg</TableCell>
                          <TableCell align="left">
                            Total Coffee Weight
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.advancesData.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.advanceType}
                            </TableCell>
                            <TableCell align="left">
                              {row.advanceAmount}
                            </TableCell>
                            <TableCell align="left">
                              {row.commodityAdvanced}
                            </TableCell>
                            <TableCell align="left">
                              {row.paymentMode}
                            </TableCell>
                            <TableCell align="left">{row.pricePerKg}</TableCell>
                            <TableCell align="left">
                              {row.totalCoffeeWeight}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                  {/* Farmer Advances listings*/}
                  <br />
                </TabContainer>
              )}
              {value === 2 && <TabContainer />}
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          id="myDialog"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{
              backgroundColor: "navy"
            }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Add Procurement
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateProcurement id={this.state.id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          id="advanceDialog"
          open={this.state.isVisible}
          aria-labelledby="form-dialog-title"
          onClose={this.handleInVisible}
        >
          <DialogTitle
            id="simple-dialog-title1"
            color="default"
            style={{
              backgroundColor: "navy"
            }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Create Advance
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateAdvance id={this.state.id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleInVisible} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FarmerDetails);
