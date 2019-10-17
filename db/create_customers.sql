INSERT INTO customers 
(first_name, last_name, company_name, email, phone)
VALUES 
($1, $2, $3, $4, $5)
RETURNING customer_id 