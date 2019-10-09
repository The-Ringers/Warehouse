const getSingleSales = async (req, res) => {
    const db = req.app.get('db');
    const { sales_id } = req.params; 

    const singleSale = await db.get_sale([sales_id]); 
    res.status(200).send(singleSale); 
}; 

// TODO: we don't need a get all sales at this time. 
// const getAllSales = async (req, res) => {
//     const db = req.app.get('db');
// };

const createSales = async (req, res) => {
    const db = req.app.get('db');
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