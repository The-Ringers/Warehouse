INSERT INTO sales
(warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total)
VALUES
(4, 1, 5, 1, 'order', null, 347.5, 17.38, 364.88);
-- 5% tax

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(1, 1, 50);
-- 57.5 

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(1, 9, 50);
-- 172.5

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(1, 3, 50);
-- 117.5




INSERT INTO sales
(warehouse_id, company_id, user_id, cumstomer_id, category, payment, subtotal, tax, total)
VALUES
(4, 1, 5, 1, 'quote', null, 30275, 1513.75, 31788.75);
-- 5% tax

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(2, 2, 50);
-- 25 

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(2, 4, 50);
-- 30000

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(2, 8, 50);
-- 250




INSERT INTO sales
(warehouse_id, company_id, user_id, customer_id, category, payment, subtotal, tax, total)
VALUES
(4, 1, 5, 1, 'invoice', 'credit', 57500, 2875, 60375);
-- 5% tax

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(3, 5, 50);
-- 57500

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(3, 6, 50);
-- 5000

INSERT INTO sale_details
(sales_id, inventory_id, amount)
VALUES
(3, 7, 50);
-- 200
