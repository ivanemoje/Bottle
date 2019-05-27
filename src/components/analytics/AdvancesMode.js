import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ByMode from "./ByMode";

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 160,
    height: 160,
    border: "3px solid black"
  },
  media: {
    height: 100
  },
  margin: {
    margin: theme.spacing.unit * 3
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  avatar: {
    margin: 10
  }
});

function AdvancesMode(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <ByMode />
        </Grid>
      </Grid>
      <br />
      <br />

      <br />
    </div>
  );
}

AdvancesMode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancesMode);
