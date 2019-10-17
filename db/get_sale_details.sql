SELECT sd.amount, inv.price, inv.sku, inv.description
FROM sale_details AS sd
JOIN inventory AS inv ON sd.inventory_id = inv.inventory_id
WHERE sd.sales_id = $1; 