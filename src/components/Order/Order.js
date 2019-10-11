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
    margin: '15px'
  },
  Button: {
    width: '100px',
    background: 'rgb(500,200,200)',
    margin: '15px',
    fontFamily: 'Alegreya Sans SC, sans-serif'
  },
  taxField: {
    width: '50px'
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

export default function SpanningTable() {
  const classes = useStyles();
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = useState('');
  const [tax, setTax] = useState('');

  
  const getInventory = () => {
    axios.get(`/api/inventory?search=${search}`).then((response) => {
      setInventory(response.data)
      const {sku, description, price} = response.data
      rows.push(createRow(sku, description, price))
    })
  }
  const TAX_RATE = (e) => {
    setTax(e.target.value)
  }
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <Paper className={classes.paper}>
      <TextField onChange={e => setSearch(e.target.value)} label='Search...' type='search' id='filled-search' className={classes.TextField}></TextField>
      <Button className={classes.Button} onClick={getInventory}>Add Item</Button>
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
            <TableCell className={classes.Taxbox} align='center' colSpan={2}></TableCell>
            <TextField onkeypress={(e => (e.target.value))} onChange={(e => (e.target.value))} label='Tax' id="filled-number"type="decimal" className={classes.taxField} InputLabelProps={{shrink: true,}} marginTop="normal" variant='filled'/>
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