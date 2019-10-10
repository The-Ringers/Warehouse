UPDATE inventory
SET quantity = $1
WHERE inventory_id = $2;