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





class EditStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      brand: "",
      drink: ""
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
              Edit Stock
            </Typography>
            <br />

            <Grid container spacing={24}>
             
              <Grid item xs={6} sm={6}>
                <TextField
                  id="drink"
                  select
                  name="drink"
                  value={this.state.drink}
                  onChange={this.onChange}
                  label="Drink*"
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
                  onChange={this.onChange}
                  label="Brand"
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
                  Update Stock
                </Button>
              </Grid>
            </Grid>
          </form>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(EditStock);
