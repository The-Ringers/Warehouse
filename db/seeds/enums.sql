CREATE TYPE roles AS ENUM (
  'admin',
  'owner',
  'manager',
  'employee'
);

CREATE TYPE sales_category AS ENUM (
  'order',
  'invoice',
  'quote'
);

CREATE TYPE payment_type AS ENUM (
  'crypto',
  'credit',
  'cash',
  'check'
);