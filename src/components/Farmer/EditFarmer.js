import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import MenuItem from "@material-ui/core/MenuItem";

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

class EditFarmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      // title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      traditionalAuthority: "",
      district: ""
    };
  }

  componentDidMount() {
    //const key = this.props.match.params.id;
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    //const { data } = this.state;
    //const { classes } = this.props;
    return (
      <div>
        <main>
          <CssBaseline />

          <form onSubmit={this.handleSubmit}>
            <Typography component="h1" variant="h4" align="center">
              Edit Farmer
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
              {/* <Grid item xs={6} sm={6}>
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
              </Grid> */}
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
                  id="district"
                  select
                  name="district"
                  value={this.state.district}
                  onChange={this.onChange}
                  label="District*"
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
                  onChange={this.onChange}
                  label="Traditional Authority"
                  fullWidth
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Update Farmer
                </Button>
              </Grid>
            </Grid>
          </form>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(EditFarmer);
