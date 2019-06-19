  componentDidMount() {

    const {totalPriceOne} = this.state;
    

    // const query_bar_one = firebase
    // .database()
    // .ref("sales")
    // .orderByChild("bar")
    // .equalTo('Bar 1');

    const query = firebase
    .database()
    .ref("sales")
    .orderByKey();

    let barOneCounter = 10;
    let barTwoCounter = 10;
    let barThreeCounter = 10;

    query.on("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      // Get values
      childSnapshot.forEach(grandChildSnapshot => {
        const barOne =
          grandChildSnapshot.child("bar").val() === "Bar 1";
          // console.log (barOne);

        const barTwo =
          grandChildSnapshot.child("bar").val() ===  "Bar 2";

        const barThree =
          grandChildSnapshot.child("bar").val() === "Bar 3";

  
          if (barOne) {
            barOneCounter = grandChildSnapshot.child("totalPrice").val();
            console.log(barOneCounter);
          } else if (barTwo) {
            barOneCounter = grandChildSnapshot.child("totalPrice").val();
          } else if (barThree) {
            barOneCounter = grandChildSnapshot.child("totalPrice").val();
          } 
      });
    });
    this.setState({
      chartOptions: {
        series: [
          {
            data: [

              barOneCounter,
              barTwoCounter,
              barThreeCounter
            ]
          }
        ]
      }
    });
  });
 