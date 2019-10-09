INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
($1, $2, $3)
RETURNING sales_id, inventory_id, amount;