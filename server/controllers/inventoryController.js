const getCategories = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');

    const categories = await db.get_categories([id]);

    res.status(200).send(categories)
}

const searchInventory = async (req, res) => {
    const { category, warehouse_id } = req.query; 
    const db = req.app.get('db'); 
    

    if(category !== undefined) {
        const categoryInventory = await db.get_inventory_by_category([category, warehouse_id]); 
        res.status(200).send(categoryInventory); 
    }

    // TODO: changing backend to only have single search for now 
    // else if(search !== undefined) {
    //     const searchInventory = await db.get_inventory_by_search([search, warehouse_id]);
    //     res.status(200).send(searchInventory); 
    // }

};

const getSingleInventory = async (req, res) => {
    const db = req.app.get('db');     
    const { sku } = req.params; 
    const { warehouse_id } = req.query; 

    const singleInventory = await db.get_inventory_by_id([sku, warehouse_id]); 
    res.status(200).send(singleInventory); 
};

const addInventory = async (req, res) => {
    const db = req.app.get('db'); 
    const { price, quantity, sku, description, category, warehouse_id } = req.body;
    const { role } = req.session; 

    if(role === 'owner' || role === 'manager' || role === 'admin') {
        await db.add_inventory([warehouse_id, price, quantity, sku, description, category]); 
        res.status(200).send('Inventory added'); 
    }

    else {
        res.status(401).send('Invalid permissions');
    }
};

const editInventory = async (req, res) => {
    const db = req.app.get('db'); 
    const { price, quantity, sku, description, category, inventory_id } = req.body;

    if(role === 'owner' || role === 'manager' || role === 'admin') {
        await db.edit_inventory_details([price, quantity, sku, description, category, inventory_id]);
        res.status(200).send('')
    }

    else {
        res.status(401).send('Invalid permissions');
    }
}; 

const deleteInventory = async (req, res) => {
    const db = req.app.get('db'); 
    const inventory_id = +req.params.invetory_id; 
    const { role } = req.session; 

    if(role === 'owner' || role === 'manager' || role === 'admin') {
        await db.delete_inventory([inventory_id])
        res.status(200).send('Inventory deleted'); 
    }

    else {
        res.status(401).send('Invalid permissions');
    }
}; 

module.exports = {
    getCategories,
    searchInventory,
    getSingleInventory, 
    addInventory,
    editInventory, 
    deleteInventory
}; 