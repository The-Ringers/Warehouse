const getSingleSales = async (req, res) => {
    const db = req.app.get('db');
    const { sales_id } = req.params; 
    const { warehouse_id } = req.query;

    const singleSale = await db.get_sale([sales_id]); 
    const sale_warehouse_id = singleSale.warehouse_id;

    if(warehouse_id === sale_warehouse_id) {
        res.status(200).send(singleSale); 
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
    const { warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total, pdf } = req.body; 
    const db = req.app.get('db');
    await db.create_sale([warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total, pdf]);
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