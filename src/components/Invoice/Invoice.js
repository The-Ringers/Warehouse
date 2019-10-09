import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'

const TAX_RATE = 0.07;

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
      width: '100%',
      
  },
  textField: {
    width: '400px',
    height: '100px',
  }
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(sku, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return {sku, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('this is a sku', 'Paperclips (Box)', 100, 1.15),
  
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  const classes = useStyles();
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = useState('');

  
  const getInventory = () => {
    axios.get(`/api/inventory?search=${search}`).then((response) => {
      setInventory(response.data)
      const {sku, description, price} = response.data
      rows.push(createRow(sku, description, price))
    })
  }

  

  return (
    <Paper className={classes.paper}>
      <TextField onChange={e => setSearch(e.target.value)} label='Search...' type='search' id='filled-search' className={classes.textField}></TextField>
      <Button onClick={getInventory}>Add Item</Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell onChange={setSku} align='left'>SKU</TableCell>
            <TableCell onChange={setDesc} align='left'>Desciption</TableCell>
            <TableCell>Qty.</TableCell>
            <TableCell onChange={setPrice}>Unit Price</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.desc}>
              <TableCell>{row.sku}</TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.qty}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell align='center' colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' colSpan={3}>Tax</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}