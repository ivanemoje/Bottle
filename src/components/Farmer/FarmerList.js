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
    name: "Fullname",
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: "Title",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Sex",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Marital Status",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Traditional Authority",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "District",
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

const titles = [
  {
    value: "Prof",
    label: "Prof"
  },
  {
    value: "Dr",
    label: "Dr"
  },
  {
    value: "Mr",
    label: "Mr"
  },
  {
    value: "Ms",
    label: "Ms"
  },
  {
    value: "Mrs",
    label: "Mrs"
  },
  {
    value: "Col",
    label: "Col"
  },
  {
    value: "Capt",
    label: "Capt"
  }
];

const genders = [
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Female",
    label: "Female"
  }
];

const maritalStatuses = [
  {
    value: "Married",
    label: "Married"
  },
  {
    value: "Single",
    label: "Single"
  },
  {
    value: "Widowed",
    label: "Widowed"
  },
  {
    value: "Separated",
    label: "Separated"
  }
];

const districts = [
  {
    value: "Chitipa",
    label: "Chitipa"
  },
  {
    value: "Rumphi",
    label: "Rumphi"
  },
  {
    value: "Nkhatabay",
    label: "Nkhatabay"
  },
  {
    value: "Mzimba",
    label: "Mzimba"
  },
  {
    value: "Ntchisi",
    label: "Ntchisi"
  }
];

const lookup = {
  Chitipa: [
    { id: "1", value: "Kameme", label: "Kameme" },
    { id: "2", value: "Mwabulambya", label: "Mwabulambya" },
    { id: "3", value: "Mwenemisuku", label: "Mwenemisuku" },
    { id: "4", value: "Mwenewenya", label: "Mwenewenya" },
    { id: "5", value: "Nthalire", label: "Nthalire" }
  ],
  Mzimba: [
    { id: "1", value: "Chasefu", label: "Chasefu" },
    { id: "2", value: "Chibanja", label: "Chibanja" },
    { id: "3", value: "Chindi", label: "Chindi" },
    { id: "4", value: "Chiputula", label: "Chiputula" },
    { id: "5", value: "Jaravikuba Munthali", label: "Jaravikuba Munthali" },
    { id: "6", value: "Jombo", label: "Jombo" },
    { id: "7", value: "Kampingo Sibande", label: "Kampingo Sibande" },
    { id: "8", value: "Kaning'ina", label: "Kaning'ina" },
    { id: "9", value: "Katawa", label: "Katawa" },
    { id: "10", value: "Katoto", label: "Katoto" },
    { id: "11", value: "Khosolo Gwaza Jere", label: "Khosolo Gwaza Jere" },
    { id: "12", value: "Lupaso", label: "Lupaso" },
    { id: "13", value: "M'Mbelwa", label: "M'Mbelwa" },
    { id: "14", value: "Mabulabo", label: "Mabulabo" },
    { id: "15", value: "Masasa", label: "Masasa" },
    { id: "16", value: "Mchengautuwa", label: "Mchengautuwa" },
    { id: "17", value: "Msongwe", label: "Msongwe" },
    { id: "18", value: "Mtwalo", label: "Mtwalo" },
    { id: "19", value: "Mzilawaingwe", label: "Mzilawaingwe" },
    { id: "20", value: "Mzimba Boma", label: "Mzimba Boma" },
    { id: "21", value: "Mzukuzuku", label: "Mzukuzuku" },
    { id: "22", value: "Mzuzu City", label: "Mzuzu City" },
    { id: "23", value: "New Aiport Site", label: "New Aiport Site" },
    { id: "24", value: "Nkhorongo", label: "Nkhorongo" },
    { id: "25", value: "Viphya", label: "Viphya" },
    { id: "26", value: "Vwaza Marsh", label: "Vwaza Marsh" },
    { id: "27", value: "Zolozolo", label: "Zolozolo" }
  ],
  Ntchisi: [
    { id: "1", value: "Chikho", label: "Chikho" },
    { id: "2", value: "Chilooko", label: "Chilooko" },
    { id: "3", value: "Kalumo", label: "Kalumo" },
    { id: "4", value: "Kasakula", label: "Kasakula" },
    { id: "5", value: "Ntchisi Boma", label: "Ntchisi Boma" },
    { id: "6", value: "Nthondo", label: "Nthondo" }
  ],
  Nkhatabay: [
    { id: "1", value: "Boghoyo", label: "Boghoyo" },
    { id: "2", value: "Fukamalaza", label: "Fukamalaza" },
    { id: "3", value: "Fukamapiri", label: "Fukamapiri" },
    { id: "4", value: "Kabuduli", label: "Kabuduli" },
    { id: "5", value: "Malanda", label: "Malanda" },
    { id: "6", value: "Malenga Mzoma", label: "Malenga Mzoma" },
    { id: "7", value: "Mankhambira", label: "Mankhambira" },
    { id: "8", value: "Mkondowe", label: "Mkondowe" },
    { id: "9", value: "Mkumbira", label: "Mkumbira" },
    { id: "10", value: "Musisya", label: "Musisya" },
    { id: "11", value: "Nkhatabay Boma", label: "Nkhatabay Boma" },
    { id: "12", value: "Nyaluwanga", label: "Nyaluwanga" },
    { id: "13", value: "Timbiri", label: "Timbiri" },
    { id: "14", value: "Zilakoma", label: "Zilakoma" }
  ],

  Rumphi: [
    { id: "1", value: "Chikulamayembe", label: "Chikulamayembe" },
    { id: "2", value: "Chipinduka", label: "Chipinduka" },
    { id: "3", value: "Kachulu", label: "Kachulu" },
    { id: "4", value: "Mwahenga", label: "Mwahenga" },
    { id: "5", value: "Mwalweni", label: "Mwalweni" },
    { id: "6", value: "Mwamlowe", label: "Mwamlowe" },
    { id: "7", value: "Mwankhunikira", label: "Mwankhunikira" },
    { id: "8", value: "Nyika National Park", label: "Nyika National Park" },
    { id: "9", value: "Rumphi Boma", label: "Rumphi Boma" },
    { id: "10", value: "Vwaza Game Reserve", label: "Vwaza Game Reserve" },
    { id: "11", value: "Zolokere", label: "Zolokere" }
  ]
};

const mmOptions = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];

const mmPayments = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];
class FarmerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
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

      dataValue: "Chitipa"
    };

    this.handleOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
  }

  componentDidMount() {
    const farmersRef = firebase.database().ref("farmers");

    farmersRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          firstname: items[item].firstname,
          lastname: items[item].lastname,
          title: items[item].title,
          sex: items[item].sex,
          maritalStatus: items[item].maritalStatus,
          mmRegistered: items[item].mmRegistered,
          mmPayment: items[item].mmPayment,
          phone: items[item].phone,
          traditionalAuthority: items[item].traditionalAuthority,
          district: items[item].district,

          yearOpened: items[item].yearOpened,
          matureTrees: items[item].matureTrees,
          immatureTrees: items[item].immatureTrees,
          hectarage: items[item].hectarage
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
      //console.log(this.state.data);
    });
  }

  updateFarmer(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.handleOpen();

    const key = id;
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef.on("value", snapshot => {
      // handle read data.
      //let data = snapshot.val();
      //traditionalAuthority: snapshot.child("traditionalAuthority").val(),
      //console.log(snapshot.child("traditionalAuthority").val());

      this.setState({
        key: snapshot.key,
        firstname: snapshot.child("firstname").val(),
        lastname: snapshot.child("lastname").val(),
        sex: snapshot.child("sex").val(),
        title: snapshot.child("title").val(),
        maritalStatus: snapshot.child("maritalStatus").val(),
        phone: snapshot.child("phone").val(),
        mmRegistered: snapshot.child("mmRegistered").val(),
        mmPayment: snapshot.child("mmPayment").val(),
        traditionalAuthority: snapshot.child("traditionalAuthority").val(),
        district: snapshot.child("district").val(),

        yearOpened: snapshot.child("yearOpened").val(),
        matureTrees: snapshot.child("matureTrees").val(),
        immatureTrees: snapshot.child("immatureTrees").val(),
        hectarage: snapshot.child("hectarage").val()
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
    const farmer = {
      firstname: this.capitalize(this.state.firstname),
      lastname: this.capitalize(this.state.lastname),
      title: this.state.title,
      sex: this.state.sex,
      maritalStatus: this.state.maritalStatus,
      phone: this.state.phone,
      mmRegistered: this.state.mmRegistered,
      mmPayment: this.state.mmPayment,
      district: this.state.district,
      traditionalAuthority: this.state.traditionalAuthority,

      yearOpened: this.state.yearOpened,
      matureTrees: this.state.matureTrees,
      immatureTrees: this.state.immatureTrees,
      hectarage: this.state.hectarage
    };

    //Update farmer module
    const key = this.state.key;
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef
      .update(farmer)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  onChangeDistrict = e => {
    this.setState({
      dataValue: e.target.value,
      district: e.target.value,
      traditionalAuthority: ""
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
    const tradAuthorities = lookup[dataValue];

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

        // Perform farmer deletion and all related objects(advances & procurments)
        firebase
          .database()
          .ref("farmers")
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
        // Perform farmer deletion and all related objects(advances & procurments)
      }
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Stock list"}
          data={data.map((farmer, index) => {
            return [
              <Avatar className={classes.purpleAvatar}>
                {this.CapitalizeInitial(farmer.firstname) +
                  this.CapitalizeInitial(farmer.lastname)}
              </Avatar>,
              <Link
                to={`/show/${farmer.id}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none"
                }}
              >
                {farmer.firstname + " " + farmer.lastname}
              </Link>,
              farmer.title,
              farmer.sex,
              farmer.maritalStatus,
              farmer.traditionalAuthority,
              farmer.district,

              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateFarmer.bind(this, farmer.id)}
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
              Edit Farmer
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
                <Grid item xs={6} sm={6}>
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
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="title"
                    select
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    label="Title*"
                    fullWidth
                    helperText="Please select title"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {titles.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="sex"
                    select
                    name="sex"
                    value={this.state.sex}
                    onChange={this.onChange}
                    label="Sex*"
                    fullWidth
                    helperText="Please select gender"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {genders.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    id="maritalStatus"
                    select
                    name="maritalStatus"
                    value={this.state.maritalStatus}
                    onChange={this.onChange}
                    label="Marital Status*"
                    fullWidth
                    helperText="Please select marital status"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {maritalStatuses.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <InputMask
                    mask="(+265) 999 999 999"
                    value={this.state.phone}
                    onChange={this.onChange}
                  >
                    {() => (
                      <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        helperText="For example: 772 123 456"
                        autoComplete="phone"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  </InputMask>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    id="mmRegistered"
                    select
                    name="mmRegistered"
                    value={this.state.mmRegistered}
                    onChange={this.onChange}
                    label="Mobile Money Registered*"
                    fullWidth
                    helperText="Please select option"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {mmOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="mmPayment"
                    select
                    name="mmPayment"
                    value={this.state.mmPayment}
                    onChange={this.onChange}
                    label="Receive payments on MM*"
                    fullWidth
                    helperText="Please select option"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {mmPayments.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="district"
                    select
                    name="district"
                    value={this.state.district}
                    onChange={this.onChangeDistrict}
                    label="District"
                    fullWidth
                    helperText="Please select district"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {districts.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="traditionalAuthority"
                    name="traditionalAuthority"
                    value={this.state.traditionalAuthority}
                    select
                    onChange={this.onChange}
                    label="Traditional Authority"
                    fullWidth
                    helperText="Please select Traditional Authority"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {tradAuthorities.map(ta => (
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
                    id="yearOpened"
                    name="yearOpened"
                    value={this.state.yearOpened}
                    onChange={this.onChange}
                    label="Year farm opened"
                    type="date"
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
                    id="matureTrees"
                    name="matureTrees"
                    value={this.state.matureTrees}
                    onChange={this.onChange}
                    label="Number of mature trees"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="immatureTrees"
                    name="immatureTrees"
                    value={this.state.immatureTrees}
                    onChange={this.onChange}
                    label="Number of immature trees"
                    helperText="(below 3 years)"
                    type="number"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="hectarage"
                    name="hectarage"
                    value={this.state.hectarage}
                    onChange={this.onChange}
                    label="Hectarage under cultivation"
                    helperText="(Enter in Acres)"
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
                    Update Farmer
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

export default withStyles(styles)(FarmerList);
