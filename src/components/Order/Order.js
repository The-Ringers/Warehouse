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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme ({
  overrides: {
    MuiTypography: {
      body1: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    },
    MuiButton: {
      Label: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    },
    MuiInputBase: {
      input: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    }, 
    MuiMenuItem: {
      root: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    },
    MuiFormLabel: {
      root: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    },
    MuiStepLabel: {
      label: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    },
    MuiTableCell: {
      root: {
      fontFamily: 'Alegreya Sans SC, sans-serif'}
    },
    typography: {
      fontFamily: 'Alegreya Sans SC, sans-serif',
    },
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#640d0d',
        },
        '&$active': {
          color: '#947C7C',
        },
      },
      text: {
      fontFamily: 'Alegreya Sans SC, sans-serif',
      }
    },
    PrivateRadioButtonIcon: {
      root: {
        '&$checked': {
          color: '#640d0d',
        },
        '&$unchecked': {
          color: '#947C7C',
        },
      }
    }
  }
})
const useStyles = makeStyles(theme => ({
  paper: {
    width: 'calc(100% - 300px)',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    float: 'right',
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
    background: '#640D0D',
    margin: '15px',
    fontFamily: 'Alegreya Sans SC, sans-serif',
    color: 'white'
  },
  submitButton: {
    width: '100px',
    background: '#640D0D',
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: '10px',
    marginTop: '40px',
    marginBottom: '10px',
    fontFamily: 'Alegreya Sans SC, sans-serif'
  },
  taxField: {
    width: '60px',
    fontFamily: 'Alegreya Sans SC, sans-serif'
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
  },
  modalpaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
  },
  instructions: {
    margin: '10px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  modalInputs: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column'
    
  },
  root: {
    width: '100%',
  },
  backButton: {
    width: '150px',
    alignSelf: 'center',
    fontFamily: 'Alegreya Sans SC, sans-serif'
  },
  modalInput: {
    width: '500px',
    margin: '10px',
  },
  nextButton: {
    width: '150px',
    background: '#640D0D',
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Alegreya Sans SC, sans-serif'
  },
  stepper: {
    background: '#640D0D'
  },
  MenuItem: {
    fontFamily: 'Alegreya Sans SC, sans-serif'
  }
  
}));


const calculateSubtotal = (items) => {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
};

export default function Invoice(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState('')
  
  const [sku, setSku] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [itemList, setItemList] = useState([]);
  
  // Sale Data 
  const [selectedValue, setSelectedValue] = useState('a')
  const [category] = useState('order')
  const subtotal = calculateSubtotal(itemList);
  const tax = (taxRate/100) * subtotal;
  const total = tax + subtotal;
  const [paymentType, setPaymentType] = useState('');

  // Shipping Data
  const [address, setAddress] = useState(''); 
  const [city, setCity] = useState(''); 
  const [state, setStates] = useState(''); 
  const [zip, setZip] = useState(''); 

  // Customer Info 
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [company_name, setCompany_name] = useState(''); 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');  

// Redux 
  const warehouse_id = useSelector(state => state.warehouse_id);
  const company_id = useSelector(state => state.companies[0].company_id);
  const user_id = useSelector(state => state.companies[0].user_id)

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
      console.log(itemList)
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

  const submitSale = () => {
    const newDate = Date.now().setHours(0,0,0,0);
    const date = new Date(newDate).getTime()/1000;  
    const shipping_type = selectedValue; 

    const saleObject = {
      warehouse_id,
      user_id,
      company_id, 
      category, 
      subtotal,
      tax, 
      total, 
      paymentType,
      date
      // pdf
    }; 

    const shippingInfo = {
      shipping_type,
      address,
      city,
      state,
      zip 
    };

    const customerInfo = {
      first_name,
      last_name,
      company_name, 
      email,
      phone
    }; 

    const sale_details = itemList; 

    axios.post('/api/sales', {saleObject, sale_details, shippingInfo, customerInfo})
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err))
  }; 


  const handleChange = event => {
    setSelectedValue(event.target.value);
  };
  const handleClick = event => {
    setValues(event.target.value)
    }

  function getSteps() {
    return ['Customer Information', 'Payment/Process', 'Shipping/Delivery'];
  }
  
  const case0 = () => {
    return  <div className={classes.modalInputs}>
              <TextField onChange={(e) => setFirst_name(e.target.value)} className={classes.modalInput} label='First Name' variant='filled' ></TextField>
              <TextField onChange={(e) => setLast_name(e.target.value)} className={classes.modalInput} label='Last Name' variant='filled' ></TextField>
              <TextField onChange={(e) => setCompany_name(e.target.value)} className={classes.modalInput} label='Company' variant='filled' ></TextField>
              <TextField onChange={(e) => setEmail(e.target.value)} className={classes.modalInput} label='Email' variant='filled' ></TextField>
              <TextField onChange={(e) => setPhone(e.target.value)} className={classes.modalInput} label='Phone #' variant='filled' ></TextField>
            </div>
  }
  const case1 = () => {
    return  <div className={classes.modalInputs}>
              <InputLabel>Payment Type</InputLabel>
              <Select onChange={(e) => setPaymentType(e.target.value)} value={values} onChange={handleClick} inputProps={{ name: 'payment',}} placeholder='Payment Type'>
                <MenuItem className='menuItem' value='Credit'>Credit</MenuItem>
                <MenuItem className='menuItem' value='Cash'>Cash</MenuItem>
                <MenuItem className='menuItem' value='Check'>Check</MenuItem>
              </Select>
            </div>
  }
  const case2 = () => {
    return  <div className={classes.modalInputs}>
              <TextField onChange={(e) => setAddress(e.target.value)} className={classes.modalInput} label='Address' variant='filled' ></TextField>
              <TextField onChange={(e) => setCity(e.target.value)} className={classes.modalInput} label='City' variant='filled' ></TextField>
              <TextField onChange={(e) => setStates(e.target.value)} className={classes.modalInput} label='State' variant='filled' ></TextField>
              <TextField onChange={(e) => setZip(e.target.value)} className={classes.modalInput} label='Zipcode' variant='filled' ></TextField>
              <FormControlLabel checked={selectedValue === 'Delivery'} onChange={handleChange} value="Delivery" label='Delivery' control={<Radio color="primary" />} labelPlacement="start"/>
              <FormControlLabel checked={selectedValue === 'Shipping'} onChange={handleChange} value="Shipping" label='Shipping' control={<Radio color="primary" />} labelPlacement="start"/>
            </div>
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return case0();
      case 1:
        return case1();
      case 2:
        return case2();
      default:
        return case0();
    }
  }
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if(activeStep === steps.length -1)
    return 
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  
  const handleSubmit = () => {
    setOpen(false);
    setActiveStep(0);
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
    <Paper className={classes.paper}>
      <TextField onChange={e => setSku(e.target.value)} label='Search Inventory...' type='search' id='filled-search' className={classes.TextField}></TextField>
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
      <Button className={classes.submitButton} onClick={handleOpen}>Next</Button>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalpaper}>
          <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>h
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
              <Button className={classes.nextButton} variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
          </div>
        </Fade>
      </Modal>
    </div>
    </Paper>
    </ThemeProvider>
  );
};