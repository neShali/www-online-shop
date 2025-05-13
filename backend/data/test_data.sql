-- Test data for the clothing shop API

-- Users
-- Default password is 'password' (hashed with bcrypt)
INSERT INTO users (email, username, hashed_password, is_active, is_superuser) VALUES
                                                                                  ('admin@example.com', 'admin', '$2b$12$Vsh9Bq11GTpSXR/PvXAcUu7oD7vEhXJGYP/QJvYnZKKBs91kD4tMS', true, true),
                                                                                  ('user@example.com', 'user', '$2b$12$Vsh9Bq11GTpSXR/PvXAcUu7oD7vEhXJGYP/QJvYnZKKBs91kD4tMS', true, false),
                                                                                  ('john@example.com', 'john', '$2b$12$Vsh9Bq11GTpSXR/PvXAcUu7oD7vEhXJGYP/QJvYnZKKBs91kD4tMS', true, false),
                                                                                  ('jane@example.com', 'jane', '$2b$12$Vsh9Bq11GTpSXR/PvXAcUu7oD7vEhXJGYP/QJvYnZKKBs91kD4tMS', true, false);

-- Categories (with hierarchy)
INSERT INTO categories (id, name, description, parent_id) VALUES
                                                              (1, 'Men', 'Men''s clothing section', NULL),
                                                              (2, 'Women', 'Women''s clothing section', NULL),
                                                              (3, 'Kids', 'Kids clothing section', NULL),
                                                              (4, 'Tops', 'Men''s tops', 1),
                                                              (5, 'Bottoms', 'Men''s bottoms', 1),
                                                              (6, 'Outerwear', 'Men''s outerwear', 1),
                                                              (7, 'Tops', 'Women''s tops', 2),
                                                              (8, 'Bottoms', 'Women''s bottoms', 2),
                                                              (9, 'Dresses', 'Women''s dresses', 2),
                                                              (10, 'Outerwear', 'Women''s outerwear', 2),
                                                              (11, 'Boys', 'Boys clothing', 3),
                                                              (12, 'Girls', 'Girls clothing', 3),
                                                              (13, 'Accessories', 'Fashion accessories', NULL),
                                                              (14, 'Shoes', 'Footwear', NULL),
                                                              (15, 'Men''s Shoes', 'Men''s footwear', 14),
                                                              (16, 'Women''s Shoes', 'Women''s footwear', 14),
                                                              (17, 'Kids'' Shoes', 'Kids footwear', 14);

-- Reset sequence for categories
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- Products
INSERT INTO products (id, name, description, price, is_active, category_id, image_url) VALUES
-- Men's Tops
(1, 'Classic Cotton T-Shirt', 'Soft and comfortable basic t-shirt for everyday wear', 24.99, true, 4, 'https://example.com/mens-tshirt.jpg'),
(2, 'Oxford Button-Down Shirt', 'Crisp and clean button-down shirt for casual or formal occasions', 59.99, true, 4, 'https://example.com/mens-buttondown.jpg'),
(3, 'Casual Polo Shirt', 'Breathable polo shirt with subtle logo detailing', 39.99, true, 4, 'https://example.com/mens-polo.jpg'),

-- Men's Bottoms
(4, 'Slim Fit Jeans', 'Modern slim fit jeans with slight stretch for comfort', 69.99, true, 5, 'https://example.com/mens-slim-jeans.jpg'),
(5, 'Chino Trousers', 'Versatile chino trousers suitable for work and weekends', 49.99, true, 5, 'https://example.com/mens-chinos.jpg'),
(6, 'Athletic Shorts', 'Lightweight running shorts with moisture-wicking technology', 34.99, true, 5, 'https://example.com/mens-shorts.jpg'),

-- Women's Tops
(7, 'V-Neck Blouse', 'Elegant V-neck blouse with slight drape', 44.99, true, 7, 'https://example.com/womens-blouse.jpg'),
(8, 'Fitted Turtleneck', 'Soft and stretchy turtleneck for layering', 29.99, true, 7, 'https://example.com/womens-turtleneck.jpg'),

-- Women's Dresses
(9, 'Wrap Dress', 'Flattering wrap dress for all occasions', 89.99, true, 9, 'https://example.com/womens-wrap-dress.jpg'),
(10, 'Maxi Sundress', 'Flowing long sundress with floral pattern', 79.99, true, 9, 'https://example.com/womens-maxi-dress.jpg');

-- Reset sequence for products
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));

-- Product Variants
INSERT INTO product_variants (product_id, size, color, color_hex, stock, sku) VALUES
-- Classic Cotton T-Shirt variants
(1, 'S', 'White', '#FFFFFF', 20, 'TSHIRT-S-WHITE'),
(1, 'M', 'White', '#FFFFFF', 25, 'TSHIRT-M-WHITE'),
(1, 'L', 'White', '#FFFFFF', 30, 'TSHIRT-L-WHITE'),
(1, 'XL', 'White', '#FFFFFF', 15, 'TSHIRT-XL-WHITE'),
(1, 'S', 'Black', '#000000', 20, 'TSHIRT-S-BLACK'),
(1, 'M', 'Black', '#000000', 25, 'TSHIRT-M-BLACK'),
(1, 'L', 'Black', '#000000', 30, 'TSHIRT-L-BLACK'),
(1, 'XL', 'Black', '#000000', 15, 'TSHIRT-XL-BLACK'),
(1, 'S', 'Navy', '#000080', 10, 'TSHIRT-S-NAVY'),
(1, 'M', 'Navy', '#000080', 15, 'TSHIRT-M-NAVY'),
(1, 'L', 'Navy', '#000080', 20, 'TSHIRT-L-NAVY'),
(1, 'XL', 'Navy', '#000080', 10, 'TSHIRT-XL-NAVY'),

-- Oxford Button-Down Shirt variants
(2, 'S', 'Light Blue', '#ADD8E6', 10, 'OXFORD-S-LTBLUE'),
(2, 'M', 'Light Blue', '#ADD8E6', 15, 'OXFORD-M-LTBLUE'),
(2, 'L', 'Light Blue', '#ADD8E6', 20, 'OXFORD-L-LTBLUE'),
(2, 'XL', 'Light Blue', '#ADD8E6', 10, 'OXFORD-XL-LTBLUE'),
(2, 'S', 'White', '#FFFFFF', 10, 'OXFORD-S-WHITE'),
(2, 'M', 'White', '#FFFFFF', 15, 'OXFORD-M-WHITE'),
(2, 'L', 'White', '#FFFFFF', 20, 'OXFORD-L-WHITE'),
(2, 'XL', 'White', '#FFFFFF', 10, 'OXFORD-XL-WHITE'),

-- Slim Fit Jeans variants
(4, '30x30', 'Blue', '#0000FF', 8, 'SLIM-30-30-BLUE'),
(4, '32x30', 'Blue', '#0000FF', 10, 'SLIM-32-30-BLUE'),
(4, '34x30', 'Blue', '#0000FF', 12, 'SLIM-34-30-BLUE'),
(4, '36x30', 'Blue', '#0000FF', 8, 'SLIM-36-30-BLUE'),
(4, '30x32', 'Blue', '#0000FF', 8, 'SLIM-30-32-BLUE'),
(4, '32x32', 'Blue', '#0000FF', 10, 'SLIM-32-32-BLUE'),
(4, '34x32', 'Blue', '#0000FF', 12, 'SLIM-34-32-BLUE'),
(4, '36x32', 'Blue', '#0000FF', 8, 'SLIM-36-32-BLUE'),
(4, '30x30', 'Black', '#000000', 8, 'SLIM-30-30-BLACK'),
(4, '32x30', 'Black', '#000000', 10, 'SLIM-32-30-BLACK'),
(4, '34x30', 'Black', '#000000', 12, 'SLIM-34-30-BLACK'),
(4, '36x30', 'Black', '#000000', 8, 'SLIM-36-30-BLACK'),

-- V-Neck Blouse variants
(7, 'XS', 'White', '#FFFFFF', 8, 'VNECK-XS-WHITE'),
(7, 'S', 'White', '#FFFFFF', 12, 'VNECK-S-WHITE'),
(7, 'M', 'White', '#FFFFFF', 15, 'VNECK-M-WHITE'),
(7, 'L', 'White', '#FFFFFF', 12, 'VNECK-L-WHITE'),
(7, 'XL', 'White', '#FFFFFF', 8, 'VNECK-XL-WHITE'),
(7, 'XS', 'Blush', '#DE5D83', 8, 'VNECK-XS-BLUSH'),
(7, 'S', 'Blush', '#DE5D83', 12, 'VNECK-S-BLUSH'),
(7, 'M', 'Blush', '#DE5D83', 15, 'VNECK-M-BLUSH'),
(7, 'L', 'Blush', '#DE5D83', 12, 'VNECK-L-BLUSH'),
(7, 'XL', 'Blush', '#DE5D83', 8, 'VNECK-XL-BLUSH'),

-- Wrap Dress variants
(9, 'XS', 'Black', '#000000', 5, 'WRAP-XS-BLACK'),
(9, 'S', 'Black', '#000000', 8, 'WRAP-S-BLACK'),
(9, 'M', 'Black', '#000000', 10, 'WRAP-M-BLACK'),
(9, 'L', 'Black', '#000000', 8, 'WRAP-L-BLACK'),
(9, 'XL', 'Black', '#000000', 5, 'WRAP-XL-BLACK'),
(9, 'XS', 'Red', '#FF0000', 5, 'WRAP-XS-RED'),
(9, 'S', 'Red', '#FF0000', 8, 'WRAP-S-RED'),
(9, 'M', 'Red', '#FF0000', 10, 'WRAP-M-RED'),
(9, 'L', 'Red', '#FF0000', 8, 'WRAP-L-RED'),
(9, 'XL', 'Red', '#FF0000', 5, 'WRAP-XL-RED');

-- Reviews
INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
-- Men's clothing reviews
(1, 2, 4.5, 'Great quality t-shirt, very soft material.'),
(1, 3, 4.0, 'Good basic t-shirt, fits as expected.'),
(4, 4, 5.0, 'Perfect fit jeans, very comfortable with some stretch.'),

-- Women's clothing reviews
(7, 3, 5.0, 'Beautiful blouse, fabric is high quality and drapes nicely.'),
(9, 4, 4.8, 'Perfect dress for work events, very flattering.');

-- Active carts
INSERT INTO carts (user_id, is_active) VALUES
                                           (2, true),
                                           (3, true),
                                           (4, true);

-- Cart items (updated to include variant_id)
INSERT INTO cart_items (cart_id, product_id, variant_id, quantity, unit_price) VALUES
-- User's cart: M White T-shirt and 32x30 Blue Jeans
(1, 1, 2, 2, 24.99),  -- Classic Cotton T-Shirt, M, White
(1, 4, 19, 1, 69.99),   -- Slim Fit Jeans, 32x30, Blue

-- John's cart: M Blush Blouse
(2, 7, 33, 1, 44.99), -- V-Neck Blouse, M, Blush

-- Jane's cart: M Red Wrap Dress
(3, 9, 48, 1, 89.99);  -- Wrap Dress, M, Red

-- Promos
INSERT INTO promos (code, discount_percent, discount_amount, min_purchase_amount, is_active, start_date, end_date) VALUES
                                                                                                                       ('WELCOME10', 10, NULL, 50, true, '2025-01-01', '2025-12-31'),
                                                                                                                       ('SUMMER25', 25, NULL, 100, true, '2025-06-01', '2025-08-31'),
                                                                                                                       ('FLASH50', 50, NULL, 200, false, '2025-04-01', '2025-04-05'),
                                                                                                                       ('FREESHIP', NULL, 15, 75, true, '2025-01-01', '2025-12-31');

-- Product promos
INSERT INTO product_promos (product_id, promo_id) VALUES
-- SUMMER25 applies to selected summer clothing
(3, 2),  -- Casual Polo Shirt
(6, 2),  -- Athletic Shorts
(10, 2); -- Maxi Sundress