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
      totalPriceOne: 0,
      totalPriceTwo: 0,
      totalPriceThree: 0,
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

    const query_bar_one = firebase
    .database()
    .ref("sales")
    .orderByChild("bar")
    .equalTo('Bar 1');

    query_bar_one.on("value", snapshot => {
      let totalPriceOne = 0;
      snapshot.forEach(function(childSnapshot) {
        const totalPriceValue1 =  childSnapshot.child("totalPrice").val();
        totalPriceOne = totalPriceValue1;
      });
      this.setState({
        totalPriceOne: totalPriceOne
  
      }          , function () {
        console.log("total One: "+this.state.totalPriceOne);
    });
    });

    const query_bar_two = firebase
    .database()
    .ref("sales")
    .orderByChild("bar")
    .equalTo('Bar 2');

    query_bar_two.on("value", snapshot => {
      let totalPriceTwo = 0;
      snapshot.forEach(function(childSnapshot) {
        const totalPriceValue2 =  childSnapshot.child("totalPrice").val();
        totalPriceTwo = totalPriceValue2;
      });
      this.setState({
        totalPriceTwo: totalPriceTwo
  
      }          , function () {
        console.log("total Two: "+this.state.totalPriceTwo);
    });
    });

    const query_bar_three = firebase
    .database()
    .ref("sales")
    .orderByChild("bar")
    .equalTo('Bar 3');

    query_bar_three.on("value", snapshot => {
      let totalPriceThree = 0;
      snapshot.forEach(function(childSnapshot) {
        const totalPriceValue3 =  childSnapshot.child("totalPrice").val();
        totalPriceThree = totalPriceValue3;
      });
      this.setState({
        totalPriceThree: totalPriceThree
      }
          , function () {
      console.log("total Three: "+this.state.totalPriceThree);
  }
      );
    });


    // this.setState ({
    //   chartOptions: {
    //     series: [
    //       {
    //         data: [
    //           totalPriceOne,
    //           totalPriceTwo,
    //           totalPriceThree
    //         ]
    //       }
    //     ]
    //   }
    // });

  

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
