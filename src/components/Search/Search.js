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
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

export default function Search() {
    // Hooks
    const [saleID, setSaleID] = useState(0); 
    const [renderSale, setRenderSale] = useState(false);
    const [saleDetails, setSaleDetails] = useState([]);
    const [saleCategoryInfo, setCategoryInfo] = useState({}); 
    const [customerInfo, setCustomerInfo] = useState({}); 


    // Redux 
    const warehouse_id = useSelector(state => state.warehouse_id)

    const searchSaleID = () => {
        axios.get(`/api/sales/${saleID}?warehouse_id=${warehouse_id}`)
            .then(response => {
                setRenderSale(true);
                setSaleDetails(response.data.sale_details);
                setCategoryInfo(response.data.singleSale[0]); 
                setCustomerInfo(response.data.customer_info[0])
                console.log(response.data);
            })
            .catch(err => console.log(err))
    }; 

    const mappedSales = saleDetails.map((sale, index) => {
        const itemTotalCalc = parseFloat(sale.price * sale.amount).toFixed(2); 
        return(
            <div key={index} className='item-list'>
                <p>Item: {sale.description}</p>
                <p>Total: ${itemTotalCalc}</p>
                <p>Qty: {sale.amount}</p>
                <p>Sku: {sale.sku}</p>
            </div>
        )
    }); 

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
            <div className='sale-info-container'>
                {!renderSale 
                ? (<div></div> )
                : 
                (<div>
                    <div>
                        <p>Category: {saleCategoryInfo.category}</p>
                        <p>Payment Type: {saleCategoryInfo.payment}</p>
                        <p>Subtotal: ${saleCategoryInfo.subtotal}</p>
                        <p>Tax: ${saleCategoryInfo.tax}</p>
                        <p>Total: ${saleCategoryInfo.total}</p>
                    </div>
                    <div>
                        <p>Name: {customerInfo.first_name} {customerInfo.last_name}</p>
                        <p>Company Name: {customerInfo.company_name}</p>
                        <p>Email: {customerInfo.email}</p>
                        <p>Phone: {customerInfo.phone}</p>
                        <p>Address: {customerInfo.address} {customerInfo.city} {customerInfo.state} {customerInfo.zip}</p>
                    </div>
                    {mappedSales}
                    <div>
                    </div>
                </div>)
                }
            </div>
       </div>
    )
};