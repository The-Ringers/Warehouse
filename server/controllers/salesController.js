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
    const { warehouse_id, customer_id, user_id, company_id, category, payment, subtotal, tax, total } = req.body.saleObject; 
    const { sales_details } = req.body; 
    const db = req.app.get('db');
    await sales_details.map()
    await db.create_sale([warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total]);
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