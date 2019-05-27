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
      chartOptions: {
        xAxis: {
          title: {
            text: "Commodities"
          },
          categories: [
            "Money",
            "Seedlings",
            "Fertilizers",
            "Chemicals",
            "Polythene"
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
          text: "Mode of Advances"
        },
        series: [{ data: [] }]
      }
    };
  }

  componentDidMount() {
    // Get value of advances provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let seedlingCounter = 0;
      let fertilizerCounter = 0;
      let chemicalCounter = 0;
      let polytheneCounter = 0;
      let moneyCounter = 0;

      snapshot.forEach(childSnapshot => {
        // Get values
        childSnapshot.forEach(grandChildSnapshot => {
          const isSeedling =
            grandChildSnapshot.child("commodityAdvanced").val() === "Seedlings";

          const isFertilizer =
            grandChildSnapshot.child("commodityAdvanced").val() ===
            "Fertilizer";

          const isChemicals =
            grandChildSnapshot.child("commodityAdvanced").val() === "Chemicals";

          const isPolythene =
            grandChildSnapshot.child("commodityAdvanced").val() ===
            "Polythene tubes";

          const isMoney =
            grandChildSnapshot.child("commodityAdvanced").val() === "";

          if (isSeedling) {
            seedlingCounter += 1;
          } else if (isFertilizer) {
            fertilizerCounter += 1;
          } else if (isChemicals) {
            chemicalCounter += 1;
          } else if (isPolythene) {
            polytheneCounter += 1;
          } else if (isMoney) {
            moneyCounter += 1;
          }
        });
      });
      this.setState({
        chartOptions: {
          series: [
            {
              data: [
                moneyCounter,
                seedlingCounter,
                fertilizerCounter,
                chemicalCounter,
                polytheneCounter
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
