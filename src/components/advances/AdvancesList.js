import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import firebase from "../common/firebase";

import deepOrange from "@material-ui/core/colors/deepOrange";

const columns = [
  {
    name: "Fullname",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Advances Type",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Advances Amount",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Commodity Advanced",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Payment mode",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Price per kg",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Total coffee weight",
    options: {
      filter: true,
      sort: true
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

class AdvancesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advancesData: []
    };
  }

  componentDidMount() {
    // Get listings advances provided
    const query = firebase
      .database()
      .ref("advances")
      .orderByKey();
    query.on("value", snapshot => {
      let advanceInfo = {};
      let newState = [];

      let firstname = "";
      let lastname = "";
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const farmersRef = firebase.database().ref(`farmers/${key}`);

        farmersRef.on("value", farmerSnapshot => {
          firstname = farmerSnapshot.child("firstname").val();
          lastname = farmerSnapshot.child("lastname").val();

          childSnapshot.forEach(grandChildSnapshot => {
            var a = grandChildSnapshot.val();

            advanceInfo = {
              advanceID: childSnapshot.key,
              advanceType: a.advanceType,
              advanceAmount: a.advanceAmount,
              commodityAdvanced: a.commodityAdvanced,
              paymentMode: a.paymentMode,
              pricePerKg: a.pricePerKg,
              totalCoffeeWeight: a.totalCoffeeWeight,
              firstname: firstname,
              lastname: lastname
            };

            // Add advance object to array
            newState.push(advanceInfo);
          });
        });
      });
      this.setState({
        advancesData: newState
      });
      console.log(this.state.advancesData);
    });
  }

  CapitalizeInitial(str) {
    return str.charAt(0).toUpperCase();
  }

  render() {
    const { advancesData } = this.state;

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title={"Price list"}
          data={advancesData.map((row, index) => {
            return [
              <Link
                to={`/show/${row.advanceID}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none"
                }}
              >
                {row.firstname + " " + row.lastname}
              </Link>,
              //row.lastname,
              //row.firstname,
              row.advanceType,
              row.advanceAmount,
              row.commodityAdvanced,
              row.paymentMode,
              row.pricePerKg,
              row.totalCoffeeWeight
            ];
          })}
          columns={columns}
          options={options}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdvancesList);
