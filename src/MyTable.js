import React, {Component} from "react";
// import { Table, Row } from "reactstrap";

import {motion, AnimatePresence} from "framer-motion";

import withStyles from "@material-ui/core/styles/withStyles";


import { Input,InputLabel,MenuItem ,FormControl,
        ListItemText,Select,Checkbox,TextField,
        Button,IconButton
    } from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import PrintIcon from "@material-ui/icons/Print";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

//Style For Select Tag
const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 135,
        maxWidth: 150,
        float: "left",
    },
    row : {
        '& > * ':{
            width:'fit-content'
        }
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
    {
        Header: "Date",
        id: "date",
        Filter: "daterange",
    },
];

initialColumnProps.push({
    Header: "Edit",
    id:'edit_button'
})


initialColumnProps.push({
    Header: "Delete",
    id:'delete_button'
})




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
    item.push(false)
})

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
            canNextPage:true,

            //FilterArray
            filterValues: new Array(initialColumnProps.length).fill(null),
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

    //Delete A Row 
    deleteRow = (event) => {
        let index = parseInt(event.target.value)
        var {filterData} = this.state
        filterData = filterData.filter((row) => { 
            if (row[row.length-2] !== index){
                return true
            }
            else {
                this.props.onDataDelete(row.slice(0,-1));
                return false 
            }
        })
        this.setState({filterData})
    }

    //Edit Table Row 
    editRow = (event) => {
        var index = parseInt(event.target.value)
        var childnodes = event.target.parentElement.parentElement.children 
        var {filterData} = this.state
        
        event.target.parentElement.parentElement.style.backgroundColor = 'antiquewhite'
        
        filterData.forEach((row) => { 
            if (row[row.length-2] === index){
                row[row.length-1] = true
            }
        })
        this.setState({filterData})
        // var x = document.createElement('button'); 
        // x.classList.add('btn')
        // x.classList.add('btn-outline-success')
        // x.setAttribute('value', event.target.value)
        // x.addEventListener('click', this.editSaveButton)
        // x.innerHTML = 'Save';

        // var y = document.createElement('span'); 
        // y.innerHTML = ' | '

        // var z = document.createElement('button'); 
        // z.classList.add('btn')
        // z.classList.add('btn-outline-warning')
        // z.setAttribute('value', event.target.value)
        // z.addEventListener('click', this.editCancelButton)
        // z.innerHTML = 'Cancel';
       
        // event.target.parentElement.appendChild(x)
        // event.target.parentElement.appendChild(y)
        // event.target.parentElement.appendChild(z)
        // event.target.parentElement.removeChild(event.target.parentElement.childNodes[0])

        for (var i = 0; i < childnodes.length - 2; i++) {
            var tableChild = childnodes[i];
            tableChild.setAttribute('contenteditable', true)
            tableChild.addEventListener('keydown', this.editTableInput)
        }
    }

    editSaveButton  = (event) => { 
        console.log("Hello MF", event)
    }
    editCancelButton  = (event) => { 
        console.log("Bye MF", event.target.value)
    }
    editTableInput = (event) => { 
        console.log("Bye MF", event.target.innerText)
    }

    //Sorting Functions
    getSortByToggleProps = (event) => {

        const colIndex = event.target.getAttribute('column-index');
        const {filterData,columns,initalTableData} = this.state;

        columns.forEach((col,key) => {
            col.sortIconShow = (key === Number(colIndex)); 
            
        });

        if(columns[colIndex] && columns[colIndex].SortedDircDesc){
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

        if(columns[colIndex]){
            columns[colIndex].SortedDircDesc = !columns[colIndex].SortedDircDesc;
        }
        
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
        switch(name.toString().toLowerCase()){
            case "search": 
                return this.getSearchFilter(colIndex);
            case "dropdown": 
                return this.getDropdownFilter(colIndex);
            case "daterange": 
                return this.getDateRangeFilter(colIndex);
            default:
                return "Unknown Filter"
        }
    }
    getSearchFilter = (colIndex)=>{
        let {filterValues} = this.state;
        const { classes} =this.props;

        return (
            <div className={classes.formControl}>
                <TextField 
                    defaultValue={""}
                    onChange={e => {
                        filterValues[colIndex] = e.target.value
                        this.setState({filterValues});
                        this.applyFilterSets();
                    }}
                    label={`Search By ${this.state.columns[colIndex].Header} `} 
                />
            </div>
        )
    }
    getDropdownFilter = (colIndex)=>{
        var {initalTableData,filterValues} = this.state;
        const {classes} = this.props;
        var distinctValues = [];
        initalTableData.forEach(row => {
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
                    defaultValue={" "} 
                    onChange={(e)=>{
                        filterValues[colIndex] = e.target.value
                        this.setState({filterValues});
                        this.applyFilterSets();
                    }}
                    >
                    <MenuItem value={" "} style={{color:'#0000008a'}}>No Filter</MenuItem>
                    {distinctValues.map((colValue,index) => ( 
                        <MenuItem key={colValue} value={colValue}>
                            {colValue}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }   
    getDateRangeFilter = (colIndex)=>{
        var {initalTableData,filterValues} = this.state;
        const {classes} = this.props;
        
        if(!filterValues[colIndex]){
            filterValues[colIndex] = [null,null]
        }

        let min = initalTableData.length ? initalTableData[0][colIndex] : new Date()
        let max = initalTableData.length ? initalTableData[0][colIndex] : new Date()

        initalTableData.forEach(row => {
            if (new Date(row[colIndex]).getTime() < new Date(min).getTime()) {
                min = row[colIndex]
            }
            else if (new Date(row[colIndex]).getTime() > new Date(max).getTime()) {
                max = row[colIndex]
            }
        })

        return (
            <div
                style={{
                    display: 'flex',
                    float: "left"
                }}
            >
                <TextField
                    id="minValue"
                    label={"Min Value " + min}
                    type="date"
                    color="primary"
                    defaultValue={min || ''}
                    className={classes.textField}
                    onChange={e => {
                        filterValues[colIndex][0] = e.target.value
                        this.setState({filterValues});
                        this.applyFilterSets();
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="maxvalue"
                    label={"Max Value " + max}
                    type="date"
                    color="primary"
                    defaultValue={max || ''}
                    className={classes.textField}
                    onChange={e => {
                        filterValues[colIndex][1] = e.target.value
                        this.setState({filterValues});
                        this.applyFilterSets();
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
    
        )
    }   

    applyFilterSets = () =>{
        const {columns,filterValues,initalTableData} =this.state;
        var resultData = initalTableData;
        filterValues.forEach((filterValue,key) => {
            if(filterValue){
                switch(columns[key].Filter.toString().toLowerCase()){
                    case "search": 
                        let searchvalue = filterValue.toString().toLowerCase();
                        resultData = resultData.filter( row => row[key].toString().toLowerCase().includes(searchvalue) )
                        break;
                    case "dropdown": 
                        if(filterValue !== " "){
                            let selectValue = filterValue.toString().toLowerCase();
                            resultData = resultData.filter( row => row[key].toString().toLowerCase() === selectValue )
                        }
                        break;
                    case "daterange": 
                        //For Min Value
                        if(filterValue[0]){
                            resultData = resultData.filter(function(row) {
                                return new Date(row[key]).getTime() >= new Date(filterValue[0]).getTime()
                            })
                        }
                        //For Max Value
                        if(filterValue[1]){
                            resultData = resultData.filter(function(row) {
                                return new Date(row[key]).getTime() <= new Date(filterValue[1]).getTime()
                            })
                        }
                        break;
                    default:
                        console.log("Unknown Filter");
                }
            }
        })

        this.setState({filterData:resultData,pageCount:Math.ceil(resultData.length/this.state.pageRow),},()=>{
            this.gotoPage(0);
        })
    }


    render() {
        const {classes} = this.props;
        const {columns, filterData,pageNumber,pageRow,pageCount} = this.state;
        
        const {canNextPage, canPreviousPage} = this.state;
        const rowDataLength = filterData[0].length;
        
        
        return (
            <div className="container-fluid" id="OuterMostDataDilterTableDiv">
                {/* Data Filter Options */}
                <div
                    id="FilterOptionOuterMostDataFilterTableDiv"
                    className="row MyTable-row-2" 
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    
                    {/* Show Hide Dropdown */}
                    <div className="FilterOptionDataFilterTableDiv">
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
                            <div key={key} className="FilterOptionDataFilterTableDiv">
                                <span>{this.checkFilterName(column.Filter, key) }</span>
                            </div>
                        ) : null
                    )}

                    {/* Print Function */}
                    <div className="FilterOptionDataFilterTableDiv">
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
                <div id="DataFilterTableDiv">
                    <div id="printarea" className="table-responsive" >
                        {filterData.length 
                        ? 
                        <table id="DataFilterTableTable" className="table table-hover" style={{tableLayout:"fixed"}}>
                            <thead id="DataFilterTableThead">
                                <tr>
                                    {columns.map((column,i) => (
                                        <th style={{borderBottom:'2px solid #c8ced3',cursor: 'pointer',display:column.showHideCheck ? "":"none"}} key={i}>
                                            <div onClick={this.getSortByToggleProps} column-index={i}>
                                                <span column-index={i}>
                                                    {column.Header+ " " }
                                                    {/* Add a sort direction indicator */}
                                                    {column.sortIconShow
                                                        ? column.SortedDircDesc
                                                            ?<ArrowDownwardIcon  style={{width:'1em'}} column-index={i} />
                                                            :<ArrowUpwardIcon style={{width:'1em'}} column-index={i} />
                                                        : ""}
                                                 </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody id="DataFilterTableTbody">
                                <AnimatePresence>
                                    {this.state.filterData.slice(pageNumber*pageRow,pageNumber*pageRow +pageRow).map((row,i) => {
                                        return (
                                            <motion.tr key={i} 
                                                initial={{opacity: 0.4,y:-10}} 
                                                animate={{opacity: 1,y:0}} 
                                                exit={{ opacity: 0, y:-10 }}
                                            >
                                                {row.slice(0,rowDataLength-2).map((cell,i) => {
                                                    return (
                                                        <motion.td 
                                                            key={i} 
                                                            style={{borderTop:'1px solid #c8ced3',display:columns[i].showHideCheck ? "":"none" }}
                                                            initial={{opacity: 0,y:-10}} 
                                                            animate={{opacity: 1,y:0}} 
                                                            exit={{ opacity: 0.4, y:-10 }}
                                                        >
                                                            {cell}
                                                        </motion.td>
                                                    );
                                                })}
                                                {
                                                    row[rowDataLength-1] ? 
                                                    <motion.td 
                                                    style={{borderTop:'1px solid #c8ced3',display:columns[columns.length-1].showHideCheck ? "":"none" }}
                                                    initial={{opacity: 0,y:-10}} 
                                                    animate={{opacity: 1,y:0}} 
                                                    exit={{ opacity: 0.4, y:-10 }}
                                                    >
                                                        <button className="btn btn-outline-success" onClick={this.editSaveButton} value={row[rowDataLength-2]} >
                                                            <i className="fa fa-edit"></i>&nbsp;Save
                                                        </button>  
                                                        &nbsp; | &nbsp; 
                                                        <button className="btn btn-outline-warning" onClick={this.editCancelButton} value={row[rowDataLength-2]} >
                                                            <i className="fa fa-edit"></i>&nbsp;Cancel
                                                        </button>                                       
                                                    </motion.td>
                                                    :
                                                    
                                                    <motion.td 
                                                    style={{borderTop:'1px solid #c8ced3',display:columns[columns.length-1].showHideCheck ? "":"none" }}
                                                    initial={{opacity: 0,y:-10}} 
                                                    animate={{opacity: 1,y:0}} 
                                                    exit={{ opacity: 0.4, y:-10 }}
                                                    >
                                                        <button className="btn btn-outline-warning" onClick={this.editRow} value={row[rowDataLength-2]} >
                                                            <i className="fa fa-edit"></i>&nbsp;Edit
                                                        </button>                                       
                                                    </motion.td>
                                                }
                                                <motion.td 
                                                    style={{borderTop:'1px solid #c8ced3',display:columns[columns.length-1].showHideCheck ? "":"none" }}
                                                    initial={{opacity: 0,y:-10}} 
                                                    animate={{opacity: 1,y:0}} 
                                                    exit={{ opacity: 0.4, y:-10 }}
                                                >
                                                    <button className="btn btn-outline-danger" onClick={this.deleteRow} value={row[rowDataLength-2]} >
                                                        <i className="fa fa-trash"></i>&nbsp;Delete
                                                    </button>                                       
                                                </motion.td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                            <tfoot id="DataFilterTableTfoot">
                                {/* Show Footer If True */}
                            </tfoot>
                         

                        </table>
                          
                        :
                        <div id="NoRecordsFound"><ErrorOutlineIcon />No Records Found</div>
                        }
                    </div>
                    
                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                            <input type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">Message:</label>
                                            <textarea className="form-control" id="message-text"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Send message</button>
                                </div>
                                </div>
                            </div>
                        </div>


                </div>
                {/* Pagination Start From Here */}
                <div
                    id="PaginationDataFilterTableDiv"
                    className="pagination row  MyTable-row-2" 
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
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
                            Page:<strong> {pageNumber + 1} of {pageCount}</strong><br/>
                            Record: <strong>{filterData.length > pageRow ? pageRow : filterData.length} of {filterData.length}</strong>
                        {" "}
                    </span>
                    <span >
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
