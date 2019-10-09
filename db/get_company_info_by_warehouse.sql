SELECT c.name, c.address, c.city, c.state, c.zip, c.owner_id FROM companies AS w
JOIN warehouses AS w ON w.company_id = c.company_id
WHERE w.company_id = $1;