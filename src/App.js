import React, {Component} from "react";
import "./App.css";
import MyTable from "./MyTableBeforeManualEditDeleteOption";
import { motion } from "framer-motion";

const initialColumnProps = [
  {
      Header: "Name",
      id: "name_id",
      type:'text',
      Filter: "Search",
  },
  {
      Header: "Bori",
      id: "packages",
      type:'number',
      Filter: false,
  },
  {
      Header: "Status",
      id: "status",
      type:'select',
      Filter: "Dropdown",
      option:["hi","ds","dw"]
  },
  {
      Header: "Date",
      id: "date",
      type:'date',
      Filter: "daterange",
  },
];

const randomDate =()=> {
  let date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000))

  return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
}

const initialDataProps = [
  ["I", 4560,"Pending",randomDate()],
  ["A", 451,"Pending",randomDate()],
  ["C", 451,"Done",randomDate()],
  ["Dhavan", 451,"Done",randomDate()],
  ["E", 451,"Pending",randomDate()],
  ["F", 451,"Done",randomDate()],
  ["G", 451,"Done",randomDate()],
  ["H", 451,"Pending",randomDate()],
  ["Z", 451,"Done",randomDate()],
  ["X", 451,"Pending",randomDate()],
  ["Y", 451,"Pending",randomDate()],
  ["W", 451,"Done",randomDate()],
  ["Q", 451,"Done",randomDate()],
];


//Add Id For Delete (Ask User to provide Unique Value And Check (Data.length == columns.length-1) )
initialDataProps.forEach((item,inde) => {
  item.push(inde)
})


class App extends Component {

  

  constructor(props) {
      super(props);
      this.state = {
          dataDelete : ['as',12,'asdf'],
          dataEdit :  ['as',12,'asdf'],
      };
  }

  handleDataDelete = (data) => {
    this.setState({dataDelete : data})
  }

  handleDataEdit = (data) => {
    this.setState({dataEdit : data})
  } 

  render() {
    return (
      <div className="App">
        <motion.h1
          className="fontFamily text-info"
          initial={{ opacity: 0.2, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: "40px" }}
        >
          React Data Filter Table
        </motion.h1>


        <MyTable 
        onDataDelete={this.handleDataDelete} 
        onDataEdit={this.handleDataEdit} 
        columns={initialColumnProps}
        data={initialDataProps}
        editButton={true}
        deleteButton={true}
        />


        <div>
          <motion.p
            className="fontFamily text-info"
            initial={{ opacity: 0.2, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'initial'}}
          >
            Doc Will Be Available Soon. please share feedbacks
          </motion.p>
        </div>
        <div>Deleted : {JSON.stringify(this.state.dataDelete)}</div>
        <div>Edited : {JSON.stringify(this.state.dataEdit)}</div>
      </div>
    );
  }
}
export default App;
