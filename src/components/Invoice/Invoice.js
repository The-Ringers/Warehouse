import React, {useState, useEffect} from 'react';
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
import { connect } from 'react-redux';


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
    width: '50px'
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

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow( sku, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { sku, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function SpanningTable(props) {
  const classes = useStyles();
  // const [search, setSearch] = useState('');
  const [sku, setSku] = useState('');
  // const [inventory, setInventory] = useState([]);
  const [tax, setTax] = useState('');
  const [row, setRow] = useState([]);

const invoiceSubtotal = subtotal(rows);


  
  const getInventory = () => {
    const {warehouse_id} = props
    console.log(sku)
    console.log(warehouse_id)
    axios.get(`/api/inventory/${sku}?warehouse_id=${warehouse_id}`)
      .then((response) => {
        console.log(response.data)
      const {sku, description, qty} = response.data[0]
      const unit = +response.data[0].price
      let newInventory = row.slice().push(response.data);
      setRow(newInventory)
      let newArray = row.splice()
      newArray.push(createRow(sku, description, qty, unit))
      setRow(newArray)

    })
    .catch((error) => {
      console.log(error)
    })
  }

  const invoiceTaxes = tax * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const onDelete = (index) => {
    let newArray = row.slice()
    newArray.splice(index, 1)
    setRow(newArray)
  }
  const editQty = (e,i) => {
    let newArray = row.slice()
    let newRow = newArray[i]
    newRow.qty = e.target.value
    newRow.price = newRow.qty * newRow.unit
    setRow(newArray)
  }
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
          {row.map((r, i) => (
            <TableRow key={r.desc}>
              <div className={classes.icons} align='center'>
              <DeleteIcon align='right' onClick={() => onDelete(i)} className={classes.icon}></DeleteIcon>
              </div>
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
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow className={classes.Taxbox}>
            <TableCell className={classes.Taxbox} align='center' colSpan={2}></TableCell>
            <TextField onChange={(e => setTax(e.target.value))} label='Tax' id="filled-number"type="decimal" className={classes.taxField} InputLabelProps={{shrink: true,}} marginTop="normal" variant='filled'/>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow className={classes.Taxbox}>
            <TableCell align='center' colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button className={classes.Button1} onClick={''}>Submit</Button>
    </Paper>
  );
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(SpanningTable)