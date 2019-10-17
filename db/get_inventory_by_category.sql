SELECT * FROM inventory
WHERE category = $1 AND warehouse_id = $2 AND discontinued = false;