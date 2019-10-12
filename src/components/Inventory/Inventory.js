import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';

// Material UI
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTable from 'material-table';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    width: 'calc(100% - 300px)',
    marginLeft: '300px'
  },
  tabs: {
    width: '200px',
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
  }
}));

function Inventory(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [inventory, setInventory] = React.useState([]);

  const mappedCategories = props.categories.map((element, index) => {
    return <Tab id={index === value ? 'dark' : null} key={index} label={element.category} {...a11yProps(index)} />
  })

  const mappedInventory = inventory.map((element, index)=> {
    return (
      <TabPanel className={classes.panel} key={index} value={value} index={value}>
        <section className={index % 2 === 0 ? 'inventory-table-even' : 'inventory-table-odd'}>
          <p className={classes.cell2}>{element.sku}</p>
          <p className={classes.cell3}>{element.description}</p>
          <p className={classes.cell4}>{element.quantity}</p>
          <p className={classes.cell5}>{element.price}</p>
          <div className={classes.cell1}>
            <EditIcon />
            <DeleteIcon />
          </div>
        </section>
      </TabPanel>
    )
  })
  
  useEffect(() => {
    if(props.categories.length >= 1){
      axios(`/api/inventory?category=${props.categories[value].category}&warehouse_id=${props.warehouse_id}`)
        .then(res => {
          setInventory(res.data)
        })
    }
  }, [value])

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <div>
        <section className='inventory-header'>
          <p className={classes.cell2}>SKU</p>
          <p className={classes.cell3}>Description</p>
          <p className={classes.cell4}>Qty.</p>
          <p className={classes.cell5}>Unit Price</p>
          <p className={classes.cell1} />
        </section>
        <section className='inventory-margin' />
        {inventory ? mappedInventory : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Inventory)