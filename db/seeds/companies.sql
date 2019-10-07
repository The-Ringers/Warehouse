CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  address VARCHAR(120),
  city VARCHAR(40),
  state VARCHAR(2),
  zip VARCHAR(20),
  owner INTEGER NOT NULL REFERENCES users
);