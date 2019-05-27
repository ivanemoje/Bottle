import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Visualization from "../pages/Visualization";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Visualization />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
