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

// const titles = [
//   {
//     value: "Beer",
//     label: "Beer"
//   },
//   {
//     value: "Soda",
//     label: "Soda"
//   }
// ];

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

const districts = [
  {
    value: "Chitipa",
    label: "Chitipa"
  },
  {
    value: "Rumphi",
    label: "Rumphi"
  }
];

const lookup = {
  Chitipa: [
    { id: "1", text: "Kameme" },
    { id: "2", text: "Mwabulambya" },
    { id: "3", text: "Mwenemisuku" },
    { id: "4", text: "Mwenewenya" },
    { id: "5", text: "Nthalire" }
  ],
  Rumphi: [
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

class CreateFarmer extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      // title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      district: "",
      traditionalAuthority: "",
      yearOpened: "",
      matureTrees: "",
      immatureTrees: "",
      hectarage: "",

      dataValue: "Chitipa"
    };
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onChangeDistrict = e => {
    this.setState({
      dataValue: e.target.value,
      district: e.target.value,
      traditionalAuthority: ""
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

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const farmer = {
      firstname: this.capitalize(this.state.firstname),
      lastname: this.capitalize(this.state.lastname),
      // title: this.state.title,
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
      hectarage: this.state.hectarage,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    console.log(farmer);

    //Save farmer module
    const farmersRef = firebase.database().ref("farmers");

    farmersRef.push(farmer);
    this.setState({
      firstname: "",
      lastname: "",
      // title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      district: "",
      traditionalAuthority: "",

      yearOpened: "",
      matureTrees: "",
      immatureTrees: "",
      hectarage: ""
    });
  };

  render() {
    const {
      firstname,
      lastname,
      // title,
      //sex,
      //maritalStatus,
      phone,
      //mmRegistered,
      //district,
      //traditionalAuthority,
      yearOpened,
      matureTrees,
      immatureTrees,
      hectarage
    } = this.state;

    const { dataValue } = this.state;
    const options = lookup[dataValue];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Typography variant="headline" align="left" color="inherit">
            Autobiography
          </Typography>

          <Grid container spacing={24}>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={this.onChange}
                label="Firstname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={this.onChange}
                label="Lastname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            {/* <Grid item xs={6} sm={6}>
              <TextField
                required
                id="title"
                select
                name="title"
                value={title}
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
            </Grid> */}
            <Grid item xs={6} sm={6}>
              <TextField
                required
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
                required
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
                required
                mask="(+265) 999 999 999"
                value={phone}
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
                required
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
                select
                name="traditionalAuthority"
                value={this.state.traditionalAuthority}
                onChange={this.onChange}
                label="Traditional Authority"
                fullWidth
                helperText="Please select Traditional Authority"
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
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="inherit">
                Stock History and Status
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="yearOpened"
                name="yearOpened"
                value={yearOpened}
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
                value={matureTrees}
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
                value={immatureTrees}
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
                value={hectarage}
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
                Save Stock
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateFarmer);
