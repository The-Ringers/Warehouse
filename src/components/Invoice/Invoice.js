import React, {useState, useEffect} from 'react';
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
import { connect } from 'react-redux'


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

function createRow(edit, sku, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return {edit, sku, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('edit', 'this is a sku', 'Paperclips (Box)', 100, 1.15),
  
];


const invoiceSubtotal = subtotal(rows);

function SpanningTable(props) {
  const classes = useStyles();
  const [sku, setSku] = useState('');
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = useState('');
  const [tax, setTax] = useState('');

  useEffect(() => {
    console.log(props.match.params.id)
  })
  const getInventory = () => {
    // const selectedWarehouseId = props.
    axios.get(`/api/inventory/${sku}?warehouse_id={props.warehouses[]}`).then((response) => {
      setInventory(response.data)
      const {sku, description, price} = response.data
      rows.push(createRow(sku, description, price))
    })
  }

  const invoiceTaxes = tax * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const onDelete = (props) => {
    axios.delete(`/api/inventory/id`).then(() => {
        props.history.push('/invoice')
    })
  }
  
  return (
    <Paper className={classes.paper}>
      <TextField onChange={e => setSearch(e.target.value)} label='Search...' type='search' id='filled-search' className={classes.TextField}></TextField>
      <Button className={classes.Button} onClick={getInventory}>Add Item</Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <Button onClick={onDelete} align='left'></Button>
            <TableCell onClick={e => setSearch(e.target.value)} align='left'>SKU</TableCell>
            <TableCell align='left'>Desciption</TableCell>
            <TableCell>Qty.</TableCell>
            <TableCell>Unit Price</TableCell>
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
            <TextField onChange={(e => setTax(e.target.value))} label='Tax' id="filled-number"type="decimal" className={classes.taxField} InputLabelProps={{shrink: true,}} marginTop="normal" variant='filled'/>
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
};
function mapStateToProps(state) {
  return state;
};
export default connect(mapStateToProps)(SpanningTable)