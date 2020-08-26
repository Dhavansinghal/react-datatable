import React, {Component} from "react";
// import { Table, Row } from "reactstrap";

// import {motion, AnimatePresence} from "framer-motion";

import withStyles from "@material-ui/core/styles/withStyles";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import PrintIcon from "@material-ui/icons/Print";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


//Style For Select Tag
const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        float: "left",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const initialColumnProps = [
    // {
    //     Header: "Delete",
    //     Cell: ({ row }) => (
    //         <Button block color="ghost-danger" value={row.original.id} onClick={this.deleteRow}>
    //             <i className="fa fa-trash "></i>&nbsp;Delete
    //         </Button>
    //     ),
    //     Filter: false
    // },
    {
        Header: "Name",
        id: "name_id",
        Filter: "search",
    },
    {
        Header: "Bori",
        id: "packages",
        Filter: false,
    },
];
const initialDataProps = [
    ["I", 4560],
    ["B", 451],
    ["C", 451],
    ["D", 451],
    ["E", 451],
    ["F", 451],
    ["G", 451],
    ["H", 451],
    ["Z", 451],
    ["X", 451],
    ["Y", 451],
    ["W", 451],
    ["Q", 451],
];




class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: initialColumnProps,
            initalTableData: initialDataProps,
            filterData: initialDataProps,

            //PaginationVariables
            pageRow: 5,
            pageNumber: 0,
            pageCount:Math.ceil(initialDataProps.length/5),
            canPreviousPage:false,
            canNextPage:true
        };
    }

    componentDidMount(){
        
    }

    print = () => {
        var content = document.getElementById("printarea");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        const orderHtml =
            '<html><head><title></title><link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></head><body>' +
            content.innerHTML +
            "</body></html>";
        pri.document.open();
        pri.document.write(orderHtml);
        pri.document.close();
        pri.focus();
        setTimeout(function () {
            pri.print();
        }, 1000);
    };

    //Sorting Function
    getSortByToggleProps = (event) => {

        const colIndex = event.target.getAttribute('column-index');
        const {filterData,columns} = this.state;

        columns[colIndex]['sortIconShow'] = true;

        if(columns[colIndex].SortedDircDesc){
            filterData.sort(function( a, b )  {
                if ( a[colIndex] === b[colIndex] ) return 0;
                return a[colIndex] > b[colIndex] ? -1 : 1;
            });
        }
        else {
            filterData.sort( function( a, b )  {
                if ( a[colIndex] === b[colIndex] ) return 0;
                return a[colIndex] < b[colIndex] ? -1 : 1;
            });
        }

        columns[colIndex].SortedDircDesc = !columns[colIndex].SortedDircDesc;

        this.setState({filterData,columns});
    };


    //Pagination Functions
    checkCanNextPreviousPage = () => {
        let {pageNumber,pageCount,canNextPage,canPreviousPage} = this.state;

        canNextPage = (pageNumber+1 < pageCount);
        canPreviousPage = (pageNumber > 0);

        this.setState({canNextPage,canPreviousPage});
    }
    gotoPage = (pageNum) => {
        if(pageNum+1 <= this.state.pageCount){
            this.setState({pageNumber:pageNum},()=>{
                this.checkCanNextPreviousPage();
            });
        }
    }
    nextPage =() => {
        this.setState({pageNumber:this.state.pageNumber+1},()=>{
            this.checkCanNextPreviousPage();
        });
    }
    previousPage =() => {
        this.setState({pageNumber:this.state.pageNumber-1},()=>{
            this.checkCanNextPreviousPage();
        });
    }
    changePageRow = (e) => {
    
        const pageCount = Math.ceil(this.state.filterData.length / (Number(e.target.value)));
        this.setState({
            pageRow:(Number(e.target.value)),
            pageCount:pageCount,
            pageNumber:0
        },()=>{
            this.checkCanNextPreviousPage();
        });
    }

    //ShowHideColumn Functions
    showHideColumn = () => {

    }

    render() {
        const {classes} = this.props;
        const {columns, filterData,pageNumber,pageRow,pageCount} = this.state;
        
        const {canNextPage, canPreviousPage} = this.state;
        
        return (
            <div style={{width:'80rem',margin:'auto'}}>
                {/* Data Filter Options */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        float: "right",
                        padding: "0.5rem",
                    }}>
                    {/* Show Hide Dropdown */}
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink>
                                Show/Hide Column
                            </InputLabel>
                            <Select
                                multiple
                                value={[]}
                                input={<Input />}
                                MenuProps={MenuProps}
                                onChange={this.showHideColumn}
                                >
                                {columns.map((column) => (
                                    <MenuItem key={column.id} value={column.id}>
                                        <Checkbox checked={true} />
                                        <ListItemText primary={column.Header} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {columns.map((column, key) =>
                        column.Filter ? (
                            <div key={key}>
                                <span>{column.Filter}</span>
                            </div>
                        ) : null
                    )}

                    {/* Print Function */}
                    <div>
                        <iframe
                            id="ifmcontentstoprint"
                            title="ptint"
                            style={{
                                height: "0px",
                                width: "0px",
                                position: "absolute",
                            }}></iframe>
                        <Button
                            variant="outlined"
                            className={classes.button}
                            startIcon={<PrintIcon />}
                            color="primary"
                            onClick={this.print}>
                            Print
                        </Button>
                    </div>
                </div>

                {/* Table Start From Here */}
                <div>
                    <div id="printarea" >
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    {columns.map((column,i) => (
                                        <th style={{borderBottom:'2px solid #c8ced3',cursor: 'pointer'}} key={i}>
                                            <div onClick={this.getSortByToggleProps} column-index={i}>
                                                <span column-index={i}>
                                                    {column.Header+ " " }
                                                    {/* Add a sort direction indicator */}
                                                    {column.sortIconShow
                                                        ? column.SortedDircDesc
                                                            ? <ArrowDownwardIcon column-index={i} />
                                                            : <ArrowUpwardIcon column-index={i} />
                                                        : ""}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                    {filterData.slice(pageNumber*pageRow,pageNumber*pageRow +pageRow).map((row,i) => {
                                        return (
                                            <tr key={i}>
                                                {row.map((cell,i) => {
                                                    return (
                                                        <td key={i} style={{borderTop:'1px solid #c8ced3'}}>
                                                            {cell}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                            <tfoot>
                                {/* Show Footer If True */}
                            </tfoot>
                        </table>
                   
                    </div>
                </div>
                {/* Pagination Start From Here */}
                <div
                    className="pagination"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        float: "right",
                    }}
                >
                    <IconButton
                        color="primary"
                        onClick={() => this.gotoPage(0)}
                        disabled={!canPreviousPage}
                        component="span"
                    >
                        <FastRewindIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => this.previousPage()}
                        disabled={!canPreviousPage}
                        component="span"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => this.nextPage()}
                        disabled={!canNextPage}
                        component="span"
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => this.gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        component="span"
                    >
                        <FastForwardIcon />
                    </IconButton>
                    <span style={{paddingRight: "15px"}}>
                        {" "}
                        <strong>
                            {pageNumber + 1} of {pageCount}
                        </strong>{" "}
                    </span>
                    <span>
                        {"   "}
                        <TextField
                            type="text"
                            color="primary"
                            label="Go To Page"
                            defaultValue={pageNumber+1}
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                this.gotoPage(page);
                            }}
                            style={{width: "80px"}}
                        />
                    </span>{" "}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Result Per Page
                        </InputLabel>
                        <Select
                            color="primary"
                            value={pageRow}
                            onChange={this.changePageRow}
                        >
                            {[5,10, 50,100].map((pageSize) => {
                                if(pageSize < filterData.length){
                                    return (
                                        <MenuItem key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </MenuItem>
                                    )
                                }
                                return false
                            })}
                            <MenuItem value={filterData.length}>
                                All
                            </MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                   
            </div>
        );
    }
}
export default withStyles(styles)(MyTable);
