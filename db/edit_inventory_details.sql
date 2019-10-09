UPDATE TABLE
SET price = $1, quantity = $2, sku = $3, description = $4, category = $5
WHERE inventory_id = $6;