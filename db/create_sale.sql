INSERT INTO sales
(warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total, pdf)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total, pdf