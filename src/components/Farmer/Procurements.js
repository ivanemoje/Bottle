import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Switch, Route } from "react-router-dom";

import CreateProcurement from "../procurement/CreateProcurement";

const styles = theme => ({
  root: {},
  avatar: {},
  bigAvatar: {
    width: 70,
    height: 70
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Procurements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      open: false
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.key
    });
    console.log(this.props.id);
  }

  handleOpen = () => {
    this.setState({ open: true });
    console.log();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <br />

        <Fab
          color="primary"
          variant="extended"
          aria-label="Add"
          className={classes.fab}
          //onClick={this.handleOpen}
          onClick={this.handleOpen.bind(this, this.state.id)}
        >
          <AddIcon className={classes.extendedIcon} />
          Create Procurement
        </Fab>
        <Typography variant="h5" component="h3" color="default" align="center">
          Procurements
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/procurement.png"
                    className={classes.bigAvatar}
                  />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Otim Tony"
                subheader="September 14, 2018"
              />
            </Card>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/procurement.png"
                    className={classes.bigAvatar}
                  />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Diego Angemi"
                subheader="September 14, 2016"
              />
            </Card>
          </Grid>
          <br />
          <Grid item xs={6} sm={6}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/procurement.png"
                    className={classes.bigAvatar}
                  />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Nathan Baleeta"
                subheader="September 14, 2018"
              />
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} />
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
            <CreateProcurement />
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

export default withStyles(styles)(Procurements);
