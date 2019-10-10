SELECT w.company_id, w.branch_name, w.address, w.city, w.state, w.zip FROM warehouses AS w
WHERE w.company_id IN (
    SELECT c.company_id FROM companies AS c
    WHERE c.owner_id = $1   
)