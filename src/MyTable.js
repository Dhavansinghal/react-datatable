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
        Filter: "Search",
    },
    {
        Header: "Bori",
        id: "packages",
        Filter: false,
    },
    {
        Header: "Status",
        id: "status",
        Filter: "Dropdown",
    },
];
const initialDataProps = [
    ["I", 4560,"Pending"],
    ["B", 451,"Pending"],
    ["C", 451,"Done"],
    ["Dhavan", 451,"Done"],
    ["E", 451,"Pending"],
    ["F", 451,"Done"],
    ["G", 451,"Done"],
    ["H", 451,"Pending"],
    ["Z", 451,"Done"],
    ["X", 451,"Pending"],
    ["Y", 451,"Pending"],
    ["W", 451,"Done"],
    ["Q", 451,"Done"],
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
        const {columns} = this.state;
        columns.forEach(col => {
            col['showHideCheck'] = true;
            col['SortedDircDesc'] = false;
            col['sortIconShow'] = false;
        });
        this.setState({columns})
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

    //Sorting Functions
    getSortByToggleProps = (event) => {

        const colIndex = event.target.getAttribute('column-index');
        const {filterData,columns,initalTableData} = this.state;

        columns.forEach((col,key) => {
            col.sortIconShow = (key === Number(colIndex)); 
            
        });

        if(columns[colIndex].SortedDircDesc){
            filterData.sort(function( a, b )  {
                if ( a[colIndex] === b[colIndex] ) return 0;
                return a[colIndex] > b[colIndex] ? -1 : 1;
            });

            initalTableData.sort(function( a, b )  {
                if ( a[colIndex] === b[colIndex] ) return 0;
                return a[colIndex] > b[colIndex] ? -1 : 1;
            });
        }
        else {
            filterData.sort( function( a, b )  {
                if ( a[colIndex] === b[colIndex] ) return 0;
                return a[colIndex] < b[colIndex] ? -1 : 1;
            });

            initalTableData.sort(function( a, b )  {
                if ( a[colIndex] === b[colIndex] ) return 0;
                return a[colIndex] < b[colIndex] ? -1 : 1;
            });
        }

      
        columns[colIndex].SortedDircDesc = !columns[colIndex].SortedDircDesc;

        this.setState({filterData,columns});
        this.setState({initalTableData})
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
    showHideColumn = (e) => {
        let {columns} = this.state;
        const colIndex = e.target.value[0];
        columns[colIndex].showHideCheck = !columns[colIndex].showHideCheck;

        this.setState({columns});

    }

    //Set Different Fillters
    checkFilterName = (name,colIndex) => {
        switch(name){
            case "Search": 
                return this.getSearchFilter(colIndex);
            case "Dropdown": 
                return this.getDropdownFilter(colIndex);
            default:
                return "Unknown Filter"
        }
    }

    getSearchFilter = (colIndex)=>{
        let {initalTableData} = this.state;

        return (
            <TextField 
                defaultValue={""}
                onChange={e => {
                    if (e.target.value){
                        let searchvalue = e.target.value.toString().toLowerCase();
                        const results = initalTableData.filter( row => row[colIndex].toString().toLowerCase().includes(searchvalue) )
                        this.setState({filterData:results,pageCount:Math.ceil(results.length/this.state.pageRow),},()=>{
                            this.gotoPage(0);
                        })
                    }
                    else {
                        this.setState({filterData:initalTableData,pageCount:Math.ceil(initalTableData.length/this.state.pageRow)});
                    }
                }}
                label={`Search By ${this.state.columns[colIndex].Header} `} 
            />
        )
    }

    getDropdownFilter = (colIndex)=>{
        var {filterData} = this.state;
        const {classes} = this.props;
        var distinctValues = [];
        filterData.forEach(row => {
            if (!distinctValues.includes(row[colIndex])){
                distinctValues.push(row[colIndex]);
            }
        });

        return (
            <FormControl className={classes.formControl}>
                <InputLabel >
                    Filter By {this.state.columns[colIndex].Header}
                </InputLabel>
                <Select
                    defaultValue={""} 
                    onChange={(e)=>{
                        console.log("HelloBrother",e.target.value)
                    }}
                    >
                    {distinctValues.map((colValue,index) => (
                        <MenuItem key={colValue} value={colValue}>
                            {colValue}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
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
                                {columns.map((column,index) => (
                                    <MenuItem key={column.id} value={index}>
                                        <Checkbox checked={column.showHideCheck} />
                                        <ListItemText primary={column.Header} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {columns.map((column, key) =>
                        column.Filter ? (
                            <div key={key}>
                                <span>{this.checkFilterName(column.Filter, key) }</span>
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
                        <table className="table table-hover" style={{tableLayout:"fixed"}}>
                            <thead>
                                <tr>
                                    {columns.map((column,i) => (
                                        <th style={{borderBottom:'2px solid #c8ced3',cursor: 'pointer',display:column.showHideCheck ? "":"none"}} key={i}>
                                            <div onClick={this.getSortByToggleProps} column-index={i}>
                                                <span column-index={i}>
                                                    {column.Header+ " " }
                                                    {/* Add a sort direction indicator */}
                                                    {column.sortIconShow
                                                        ? column.SortedDircDesc
                                                            ? <ArrowDownwardIcon style={{width:'1em'}} column-index={i} />
                                                            : <ArrowUpwardIcon style={{width:'1em'}} column-index={i} />
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
                                                        <td key={i} style={{borderTop:'1px solid #c8ced3',display:columns[i].showHideCheck ? "":"none" }}>
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
                        <InputLabel>
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
