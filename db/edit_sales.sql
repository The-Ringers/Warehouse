UPDATE sales
SET category = $1, payment = $2, subtotal = $3, tax = $4, total = $5, pdf = $6
WHERE sales_id = $7;