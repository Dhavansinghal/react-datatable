import React, {Component} from "react";
import "./App.css";
import MyTable from "./MyTable";
import { motion } from "framer-motion";

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
        <MyTable onDataDelete={this.handleDataDelete} onDataEdit={this.handleDataEdit} />
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
