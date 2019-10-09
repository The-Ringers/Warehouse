SELECT * FROM companies
JOIN warehouses ON warehouses.company_id = companies.company_id
WHERE warehouses.company_id = $1;