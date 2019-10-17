INSERT INTO sales
(warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total, sales_id