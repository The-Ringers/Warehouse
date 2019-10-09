SELECT * FROM inventory
WHERE sku LIKE %$1% OR description LIKE %$1% AND warehouse_id = $2;