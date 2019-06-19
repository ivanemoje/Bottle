import React from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import firebase from "../common/firebase";

import HighchartsReact from "highcharts-react-official";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class ByMode extends React.Component {
  constructor() {
    super();
    this.state = {
      // totalPriceOne: 10,
      // totalPriceTwo: 10,
      // totalPriceThree: 10,
      chartOptions: {
        xAxis: {
          title: {
            text: "Bars"
          },
          categories: [
            "Bar 1",
            "Bar 2",
            "Bar 3"
          ]
        },
        chart: {
          type: "column"
        },

        yAxis: {
          title: {
            text: "Totals"
          }
        },
        title: {
          text: "Bar Performance"
        },
        series: [{ data: [] }]
      }
    };
  }

  componentDidMount() {

 
    const query = firebase
    .database()
    .ref("sales")
    .orderByKey();
  query.on("value", snapshot => {
    let bar1 = 0;
    let bar2 = 0;
    let bar3 = 0;

    snapshot.forEach(childSnapshot => {
      // Get values
      const isBar1 =
      childSnapshot.child("bar").val() === "Bar 1";
        console.log(isBar1);
        const isBar2 =
        childSnapshot.child("bar").val() === "Bar 2";

        const isBar3 =
        childSnapshot.child("bar").val() === "Bar 3";

        if (isBar1) {
          bar1 = bar1 + childSnapshot.child("totalPrice").val();
        } else if (isBar2) {
          bar2 = bar2 + childSnapshot.child("totalPrice").val();
        } else if (isBar3) {
          bar3 = bar3 + childSnapshot.child("totalPrice").val();
        }
      
    });
    this.setState({
      chartOptions: {
        series: [
          {
            data: [
              bar1,
              bar2,
              bar3
            ]
          }
        ]
      }
    });
  });

  }

  render() {
    const { classes } = this.props;
    const { chartOptions } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

ByMode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ByMode);
