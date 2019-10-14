import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  paper: {
    width: 'calc(100% - 300px)',
    display: 'flex',
    flexWrap: 'wrap',
    float: 'right',
    marginRight: '5px',
  },
  
  table: {
    minWidth: 700,
  },

  Taxbox: {
      width: '22%',
  },
  TextField: {
    width: '500px',
    height: '60px',
    fontSize: 12,
    margin: '15px',
    fontFamily: 'Alegreya Sans SC, sans-serif'

  },
  Button: {
    width: '100px',
    background: 'rgb(500,200,200)',
    margin: '15px',
    fontFamily: 'Alegreya Sans SC, sans-serif'
  },
  Button1: {
    width: '500px',
    background: 'rgb(500,200,200)',
    fontFamily: 'Alegreya Sans SC, sans-serif'
  },
  taxField: {
    width: '60px'
  },
  icon: {
    width: '30px',
    height: '30px',
    marginTop: '12px'
  },
  qty: {
    width: '60px',
  },
  TableRow: {
    fontFamily: 'Alegreya Sans SC, sans-serif'

  }
  
}));

const calculateSubtotal = (items) => {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
};

export default function Invoice(props) {
  const classes = useStyles();
  const [sku, setSku] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [itemList, setItemList] = useState([]);
  const subtotal = calculateSubtotal(itemList);
  const tax = (taxRate/100) * subtotal;
  const total = tax + subtotal;

// Redux 
  const warehouse_id = useSelector(state => state.warehouse_id);
  const company_id = useSelector(state => state.company.company_id);
  const user_id = useSelector(state => state.company.user_id)

  const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  };
  
  const priceItem = (qty, unit) => {
    return qty * unit;
  };

  const addItem = ( sku, desc, qty, unit) => {
    // the if statement sets the price to 0 if the qty is undefined
    if(!qty) {
      const price = priceItem(0, unit);
      return { sku, desc, qty, unit, price };
    }
    else {
      const price = priceItem(qty, unit);
      return { sku, desc, qty, unit, price };
    }
  };

  const getInventory = () => {
    // const {warehouse_id} = props;
    axios.get(`/api/inventory/${sku}?warehouse_id=${warehouse_id}`)
      .then((response) => {
      const {sku, description, qty} = response.data[0];
      const unit = +response.data[0].price;
      let newArray = itemList.slice();
      newArray.push(addItem(sku, description, qty, unit));
      setItemList(newArray);
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const onDelete = (index) => {
    let newArray = itemList.slice()
    newArray.splice(index, 1)
    setItemList(newArray)
  };

  const editQty = (e,i) => {
    let newArray = itemList.slice()
    let newitemList = newArray[i]
    newitemList.qty = e.target.value
    newitemList.price = newitemList.qty * newitemList.unit
    setItemList(newArray)
  };

  // const submitInvoice = () => {
  //   const invoiceObject = {
  //     warehouse_id,
  //     company_id, 
  //     // user_id, being pulled off the session. 

  //     // FIXME: not sure where to get customer_id from
  //     // customer_id, 
  //     category: 'invoice', 
  //     subtotal,
  //     tax, 
  //     total, 
  //     // payment, 
  //     // pdf
  //   }; 

  //   const sale_details = itemList; 

  //   axios.post('/api/sales', {invoiceObject, sale_details})
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(err => console.log(err))
  // }; 

  return (
    <Paper className={classes.paper}>
      <TextField onChange={e => setSku(e.target.value)} label='Search...' type='search' id='filled-search' className={classes.TextField}></TextField>
      <Button className={classes.Button} onClick={getInventory}>Add Item</Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.TableRow}>
            <TableCell align='right'></TableCell>
            <TableCell align=''>SKU</TableCell>
            <TableCell>Desciption</TableCell>
            <TableCell className={classes.qty}>Qty.</TableCell>
            <TableCell classname={classes.qty}>Unit Price</TableCell>
            <TableCell className={classes.qty}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((r, i) => (
            <TableRow key={r.desc}>
              <section className={classes.icons} align='center'>
              <DeleteIcon align='right' onClick={() => onDelete(i)} className={classes.icon}></DeleteIcon>
              </section>
              <TableCell>{r.sku}</TableCell>
              <TableCell>{r.desc}</TableCell>
              <TextField className={classes.qty} marginTop='none' variant='filled' onChange={(e) => editQty(e,i)} >{r.qty}</TextField>
              <TableCell>{r.unit}</TableCell>
              <TableCell>{ccyFormat(r.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow className={classes.Taxbox}>
            <TableCell rowSpan={3} />
            <TableCell align='center' colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(subtotal)}</TableCell>
          </TableRow>
          <TableRow className={classes.Taxbox}>
            <TableCell className={classes.Taxbox} align='center' colSpan={2}></TableCell>
            <TextField onChange={(e => setTaxRate(e.target.value))} label='Tax (%)' id="filled-number"type="decimal" className={classes.taxField} InputLabelProps={{shrink: true,}} marginTop="normal" variant='filled'/>
            <TableCell align="right">{ccyFormat(tax)}</TableCell>
          </TableRow>
          <TableRow className={classes.Taxbox}>
            <TableCell align='center' colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button className={classes.Button1} onClick={''}>Submit</Button>
    </Paper>
  );
};