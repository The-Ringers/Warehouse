INSERT INTO inventory
(warehouse_id, price, quantity, sku, description, category)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING warehouse_id, price, quantity, sku, description, category;