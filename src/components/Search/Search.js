import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; 
import './Search.css';


export default function Search() {
    const [saleID, setSaleID] = useState(0); 
    const [renderSale, setRenderSale] = useState(false);
    const [saleDetails, setSaleDetails] = useState([]);

    // Redux 
    const warehouse_id = useSelector(state => state.warehouse_id)

    const searchSaleID = () => {
        axios.get(`/api/sales/${saleID}?warehouse_id=${warehouse_id}`)
            .then(response => {
                setRenderSale(true);
                setSaleDetails(response.data.sale_details);
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
                    {mappedSales}
                </div>)
                }
            </div>
       </div>
    )
};