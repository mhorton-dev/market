BEGIN
DROP TABLE IF EXISTS orders_products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE orders_products (
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERNCES products(product_id),
    quantity INT,
    UNIQUE (order_id, product_id)
)

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMPZ DEFAULT CURRENT_TIMESTAMP,
    note TEXT
    user_id INT
)

CREATE TABLE products (
    product_id SERIAL PRIMARY_KEY,
    title TEXT,
    product_desription TEXT,
    price NUMERIC
)

COMMIT;
--ROLLBACK;
TRUNCATE orer_products, orders, products, users RESTART IDENTIY CASCADE;