import React, {useState} from 'react';
import axios from 'axios'; 

// Material UI 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import RaisedButton from '@material-ui/core/RaisedButton';

export default function Search() {
    const [saleID, setSaleID] = useState(0); 

    const searchSaleID = (props) => {
        axios.get(`/api/sales/${saleID}?warehouse_id=${props.warehouse_id}`)
            .then(response => {
                console.log(response.data) 
            })
    }; 

    return (
        <div>
        <TextField 
            floatingLabelText='Enter SaleId'
            onChange={(e) => setSaleID(e.target.value)}
        />
        <RaisedButton 
            lable='Search'
            onClick={searchSaleID}
        />
        </div>
    )
};
