const getSingleSales = async (req, res) => {
    const db = req.app.get('db');
    const sales_id = req.params.id; 
    const warehouse_id = +req.query.warehouse_id;

    const singleSale = await db.get_sale([sales_id]); 
    console.log(singleSale)
    const sale_warehouse_id = singleSale[0].warehouse_id;
    const customer_id = singleSale[0].customer_id;

    if(warehouse_id === sale_warehouse_id) {
        const sale_details = await db.get_sale_details([sales_id])
        const customer_info = await db.get_customer_info([customer_id])
        res.status(200).send({singleSale, sale_details, customer_info}); 
    }
    else {
        res.status(403).send('Acess denied.'); 
    }
}; 

// TODO: we don't need a get all sales at this time. 
// const getAllSales = async (req, res) => {
//     const db = req.app.get('db');
// };

const createSales = async (req, res) => {
    const db = req.app.get('db');
    
    const { warehouse_id, user_id, company_id, category, paymentType, decimal_subtotal, decimal_tax, decimal_total } = req.body.saleObject; 

    const { first_name, last_name, company_name, email, phone} = req.body.customerInfo; 

    // Adding customer information to the DB 
    const customerCreation = await db.create_customers([first_name, last_name, company_name, email, phone])
    
    // Adding sale information to the DB
    const { customer_id } = customerCreation[0]; 
    const salesCreation = await db.create_sale([warehouse_id, company_id, user_id, customer_id, category, paymentType, decimal_subtotal, decimal_tax, decimal_total]);
    
    // Mapping over sale_details array to store info into the DB 
    const { sale_details } = req.body; 
    const { sales_id }= salesCreation[0]; 
    const saleMapping = await sale_details.map(sales => {
        const { inventory_id, qty, sku } = sales; 
        db.create_sale_details([sales_id, inventory_id, qty])

        if(category === 'invoice') {
            const updateQuantity = async () => {
                const getOldQuanity = await db.get_inventory_by_sku([sku, warehouse_id])
                const { quantity } = getOldQuanity[0]; 
                newQuantity = quantity - qty; 
                db.edit_inventory_quantity([newQuantity, sku])
            }; 

            updateQuantity(); 
        }
    }); 
    
    // Storing shipping information 
    const { shipping_type, address, city, state, zip } = req.body.shippingInfo;  
    const addingShipping = await db.add_shipping_delivery([first_name, last_name, address, city, state, zip, sales_id, shipping_type]); 

    res.status(200).send({sales_id})
};

const editSales = async (req, res) => {
    const db = req.app.get('db');
    const { sales_id } = req.params;
};

// TODO: we don't need a delete at this time. 
// const deleteSales = async (req, res) => {
//     const db = req.app.get('db');
// };

module.exports = {
    getSingleSales,
    // getAllSales,
    createSales,
    editSales
    // deleteSales
};