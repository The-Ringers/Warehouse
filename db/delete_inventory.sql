UPDATE inventory
SET discontinued = true
WHERE inventory_id = $1;