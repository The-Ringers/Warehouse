import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; 
import './Search.css';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'sku', label: 'SKU', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'amount', label: 'Quantity', minWidth: 170, align: 'right', format: value => value.toLocaleString()},
    { id: 'price', label: 'Unit Price', minWidth: 100 },
    { id: 'itemTotalCalc', label: 'Total Amount', minWidth: 170, align: 'right', format: value => value.toLocaleString()}
]
  
function createData(sku, description, amount, price) {
    const itemTotalCalc = parseFloat(price * amount).toFixed(2); 
    return { sku, description, amount, price, itemTotalCalc };
}
  
const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    tableWrapper: {
    },
    date: {
        display: 'flex',
        flexDirection: 'column',
        width: '250px'
    },
    setDate: {
        width: '250px'
    },
    document: {
        display: 'flex',
        flexDirection: 'column'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
    }
})

export default function Search() {
    // Hooks
    const [saleID, setSaleID] = useState(null); 
    const [renderSale, setRenderSale] = useState(false);
    const [saleDetails, setSaleDetails] = useState([]);
    const [saleCategoryInfo, setCategoryInfo] = useState({}); 
    const [customerInfo, setCustomerInfo] = useState({});

    const classes = useStyles();

    // Redux 
    const warehouse_id = useSelector(state => state.warehouse_id)

    const searchSaleID = () => {
        axios.get(`/api/sales/${saleID}?warehouse_id=${warehouse_id}`)
            .then(response => {
                const newSaleDetails = response.data.sale_details.map(sale => {
                    return createData(sale.sku, sale.description, sale.amount, sale.price)
                })
                setRenderSale(true);
                setSaleDetails(newSaleDetails);
                setCategoryInfo(response.data.singleSale[0]); 
                setCustomerInfo(response.data.customer_info[0])
                console.log(response.data);
            })
            .catch(err => console.log(err))
    }; 

    return (
       <div className='outer-container'>
            <div className='sale-search-box'>
                <input
                    className='saleId-input-box'
                    placeholder='Enter SaleID'
                    type='number'
                    onChange={(e) => setSaleID(+e.target.value)}
                /> 
                <button className='search-button' onClick={searchSaleID}>Search</button>
            </div>
            {!renderSale 
            ? (<div></div> )
            : 
            <>
                <div>
                    <p>Name: {customerInfo.first_name} {customerInfo.last_name}</p>
                    <p>Company Name: {customerInfo.company_name}</p>
                    <p>Email: {customerInfo.email}</p>
                    <p>Phone: {customerInfo.phone}</p>
                    <p>Address: {customerInfo.address} {customerInfo.city} {customerInfo.state} {customerInfo.zip}</p>
                </div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            {columns.map(column => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {saleDetails.map(row => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map(column => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                        {}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{saleCategoryInfo.subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${((saleCategoryInfo.tax / saleCategoryInfo.total) * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{saleCategoryInfo.tax}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{saleCategoryInfo.total}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </div>
                </Paper>
            </>
            }
       </div>
    )
};