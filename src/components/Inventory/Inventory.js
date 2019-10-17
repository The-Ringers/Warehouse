import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';

// Sweet Alerts 
import swal from 'sweetalert';

// Material UI
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// Stylesheets
import './Inventory.css';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box id='mui-box' width='100%' p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const columns = [
    { id: 'id', label: 'ID', minWidth: '5%'},
    { id: 'sku', label: 'SKU', minWidth: '10%' },
    { id: 'description', label: 'Description', minWidth: '65%' },
    { id: 'quantity', label: 'Qty.', minWidth: '7.5%', align: 'right', format: value => value.toLocaleString() },
    { id: 'price', label: 'Unit Price', minWidth: '7.5%', align: 'right', format: value => value.toLocaleString()},
    { id: 'icons', label: 'Actions', minWidth: '5%', align: 'right'}
];

function createData(id, sku, description, quantity, price) {
    return { id, sku, description, quantity, price };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    width: 'calc(100% - 300px)',
    marginLeft: '300px'
  },
  root2: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  tableWrapper: {
    maxHeight: '100vh',
    overflow: 'auto',
  },
  tabs: {
    minWidth: '200px',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panel: {
    height: '50px',
    width: 'calc(100vw - 500px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell1: {
    width: '5%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '18px'
  },
  cell2: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '18px'
  },
  cell3: {
    width: '55%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '18px'
  },
  cell4: {
    width: '12.5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '18px'
  },
  cell5: {
    width: '12.5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '18px'
  },
  iconContainer: {
      height: '100%',
      width: '5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `1px solid ${theme.palette.divider}`,
      boxSizing: 'border-box'
  },
  icons: {
    '&:hover': {
        cursor: 'pointer'
    }
  },
  hide: {
      display: 'none'
  }
}));

function Inventory(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [inventory, setInventory] = React.useState([]);
  const [newItem, setNewItem] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editItem, setEditItem] = React.useState(false);
  const [addItem, setAddItem] = React.useState(false);
  const [row, setRow] = React.useState(0);
  const [inventoryID, setInventoryID] = React.useState(0)
  const [sku, setSku] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');

  const mappedCategories = props.categories.map((element, index) => {
    return <Tab id={index === value ? 'dark' : null} key={index} label={element.category} {...a11yProps(index)} />
  })
  
  useEffect(() => {
    if(props.categories.length >= 1){
      axios(`/api/inventory?category=${props.categories[value].category}&warehouse_id=${props.warehouse_id}`)
        .then(res => {
          console.log(res.data)
          const newData = res.data.map(element => {
              return createData(element.inventory_id, element.sku, element.description, element.quantity, element.price)
          })
          setInventory(newData)
        })
    }
  }, [value])

  console.log(inventory)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const editInventory = (id) => {
      setEditItem(!editItem)
      setRow(id)
      setInventoryID(inventory[id].id)
      setSku(inventory[id].sku)
      setDescription(inventory[id].description)
      setQuantity(inventory[id].quantity)
      setPrice(inventory[id].price)
  };

  const setNewInventory = () => {
      const { category } = props.categories[value]
      const body = {sku, description, quantity, price, category, inventory_id: inventoryID}
      inventory[row] = {id: inventoryID, sku, description, quantity, price}
      setEditItem(!editItem)
      axios.put('/api/inventory/edit', body)
  };

  const addNewItem = () => {
      const { category } = props.categories[value]
      const warehouse_id = props.match.params.id
      const body = {sku, description, quantity, price, category, warehouse_id}
      inventory.push({sku, description, quantity, price})
      setAddItem(false)
      axios.post('/api/inventory', body)
  };

  const deleteItem = (i) => {
    swal("Are you sure that you want to delete this item?", {
      buttons: {
        delete: {
          text: "Delete", 
          value: "Delete"
        },
        cancel: "Cancel"
      }
    })
    .then((value) => {
      switch(value) {
        case 'Delete': 
        const newInventory = inventory.filter((element, index) => {
          if(index !== i){
            return element
          }
        })
        setInventory(newInventory)
        axios.delete(`/api/inventory/${inventory[i].id}`)
        .then(() => {
          swal({
            icon: "success",
            title: "Item Deleted"
          })
        });
        break; 

        default: 
        console.log('cancel');
      }
    })
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
          {props.categories ? mappedCategories : null}
      </Tabs>
      <Paper className={classes.root2}>
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
                    {inventory.length > 0 ? inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.sku}>
                        {columns.map(column => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                {column.id === 'icons' ? <div> <EditIcon className={classes.icons} onClick={() => editInventory(index)} /> <DeleteIcon className={classes.icons} onClick={() => deleteItem(index)}/> </div> : null}
                            </TableCell>
                            );
                        })}
                        </TableRow> 
                    );
                    }) : null}
                </TableBody>
                {editItem
                    ?
                    // Edit Inventory Modal 
                    <div className='inventoryModal'>
                      <h2 className='modal-header'>Edit Inventory</h2>
                        <div className='input-container'>
                          <input value={sku} onChange={e => setSku(e.target.value)}/>
                          <input value={description} onChange={e => setDescription(e.target.value)}/>
                          <input value={quantity} onChange={e => setQuantity(e.target.value)}/>
                          <input value={price} onChange={e => setPrice(e.target.value)}/>
                        </div>
                        <div className='btn-container'>
                          <button className='submit-btn' onClick={setNewInventory}>Submit</button>
                          <button className='cancel-btn' onClick={() => setEditItem(!editItem)}>Cancel</button>
                        </div>
                    </div>
                    :
                    null
                }
                <div>
                    <AddBoxIcon onClick={() => setAddItem(!addItem)}/>
                </div>
                {addItem
                    ?
                    // Add Inventory Modal 
                    <div className='inventoryModal'>
                        <h2 className='modal-header'>Add Inventory</h2>
                        <div className='header-container'>
                          <p>Category: {props.categories[value].category}</p>
                          <p>ID: {props.match.params.id}</p>
                        </div>
                        <div className='input-container'>
                          <input placeholder='SKU'onChange={e => setSku(e.target.value)}/>
                          <input placeholder='Description' onChange={e => setDescription(e.target.value)}/>
                          <input placeholder='Qty' onChange={e => setQuantity(e.target.value)}/>
                          <input placeholder='Price' onChange={e => setPrice(e.target.value)}/>
                        </div>
                        <div className='btn-container'>
                          <button className='submit-btn' onClick={addNewItem}>Submit</button>
                          <button className='cancel-btn' onClick={() => setAddItem(!addItem)}>Cancel</button>
                        </div>
                    </div>
                    :
                    null
                }
            </Table>
        </div>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={inventory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
            'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
            'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Inventory)