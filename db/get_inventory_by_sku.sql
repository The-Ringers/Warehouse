SELECT * FROM inventory
WHERE sku = $1 AND warehouse_id = $2;