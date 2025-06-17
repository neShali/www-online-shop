-- Test data for the clothing shop API
BEGIN;
TRUNCATE TABLE
    cart_items,
    carts,
    product_variants,
    reviews,
    product_promos,
    products,
    categories,
    promos,
    users
    RESTART IDENTITY CASCADE;
COMMIT;
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
(1, 'Classic Cotton T-Shirt', 'Soft and comfortable basic t-shirt for everyday wear', 24.99, true, 4, 'https://image.hm.com/assets/hm/cc/2c/cc2cc240f12a058b64f004fc142f252e3c73f860.jpg?imwidth=1536'),
(2, 'Oxford Button-Down Shirt', 'Crisp and clean button-down shirt for casual or formal occasions', 59.99, true, 4, 'https://image.hm.com/assets/hm/d5/12/d512544cab2554973536f2d31fc092edf3f4d10e.jpg?imwidth=1536'),
(3, 'Casual Polo Shirt', 'Breathable polo shirt with subtle logo detailing', 39.99, true, 4, 'https://image.hm.com/assets/hm/73/09/73091f235b4f6690c9ee227664dd937c8f253c08.jpg?imwidth=1536'),
(23, 'Classic Cotton Shirt (Men)', 'A timeless shirt made from 100% cotton with a regular fit.', 39.99, true, 4, 'https://image.hm.com/assets/hm/61/8c/618c8e2329f651d6c2b1d411155655ef135db618.jpg?imwidth=2160'),
(24, 'Casual Polo Shirt (Men)', 'Soft polo shirt with classic collar and short sleeves.', 24.99, true, 4, 'https://image.hm.com/assets/hm/4a/e8/4ae804c910cd4ef85d0dcc4854301f4420d5aea1.jpg?imwidth=2160'),


-- Men's Bottoms
(4, 'Slim Fit Jeans', 'Modern slim fit jeans with slight stretch for comfort', 69.99, true, 5, 'https://image.hm.com/assets/hm/e6/64/e664e8305e33d7437bd792442789225a0d580bc3.jpg?imwidth=1536'),
(5, 'Chino Trousers', 'Versatile chino trousers suitable for work and weekends', 49.99, true, 5, 'https://image.hm.com/assets/hm/bb/b4/bbb4cfa3dffe0fe61efb811dbc37b93283cfff22.jpg?imwidth=1536'),
(6, 'Athletic Shorts', 'Lightweight running shorts with moisture-wicking technology', 34.99, true, 5, 'https://image.hm.com/assets/hm/47/6b/476b80e4f636a6fb889c1e4e1c4e93b4784def90.jpg?imwidth=1536'),
(11, 'Linen‑Blend Pull‑on Trousers', 'Linen trousers with an elastic waistband, comfortable and stylish.', 34.99, true, 5, 'https://image.hm.com/assets/hm/d9/11/d911baf2dc0e7f13bfd8e8118abf46fd3385c89b.jpg?imwidth=1260'),

-- Men's outwear
(38, 'Classic Wool Coat', 'Tailored wool coat with button closure and side pockets.', 89.99, true, 6, 'https://image.hm.com/assets/hm/77/43/7743e913ec71502cac698dc21d9f5a8a336bab60.jpg?imwidth=2160'),
(39, 'Quilted Bomber Jacket', 'Lightweight bomber jacket with quilted design and ribbed cuffs.', 399.99, true, 6, 'https://image.hm.com/assets/hm/81/3e/813eb7f35b6a387e5f9ef8c74499d2b3f5250963.jpg?imwidth=2160'),
(40, 'Parka with Faux Fur Hood', 'Warm parka with detachable faux fur trim hood and multiple pockets.', 79.99, true, 6, 'https://image.hm.com/assets/hm/47/af/47af8f2059db36188c25a06a7f9b84d9721e681f.jpg?imwidth=2160'),
(41, 'Denim Jacket', 'Classic denim jacket with button front and chest pockets.', 44.99, true, 6, 'https://image.hm.com/assets/hm/7a/81/7a812399b1b8caa5e3c93b04d969cccb26b6f053.jpg?imwidth=2160'),


-- Women's Tops
(7, 'V-Neck Blouse', 'Elegant V-neck blouse with slight drape', 44.99, true, 7, 'https://image.hm.com/assets/hm/20/24/2024bf909c3cfbd94df7851f037c9bcd2142865e.jpg?imwidth=1536'),
(8, 'Fitted Turtleneck', 'Soft and stretchy turtleneck for layering', 29.99, true, 7, 'https://image.hm.com/assets/hm/1f/ba/1fba76215c6836a080f6109245f1c9fbdc72c665.jpg?imwidth=1536'),
(25, 'Ribbed Crop Top (Women)', 'A short, fitted top in soft ribbed jersey with short sleeves and a round neckline.', 9.99, true, 7, 'https://image.hm.com/assets/hm/3d/8b/3d8b8e75bb624b1db83753c87bd5913861d1b09d.jpg?imwidth=2160'),
(26, 'Rib-knit Button-front Top (Women)', 'A rib-knit top with a collar, front buttons and long sleeves. Slim fit.', 17.99, true, 7, 'https://image.hm.com/assets/hm/85/91/859120450190f6c6aa4272606577121b4d1ad3e3.jpg?imwidth=2160'),
(27, 'Ribbed Tank Top (Women)', 'Slim-fit tank top in soft ribbed jersey with narrow shoulder straps.', 6.99, true, 7, 'https://image.hm.com/assets/hm/54/53/54534e7ad865a884937e36582fb08473c913569e.jpg?imwidth=2160'),

-- Women's outwear 
(35, 'Belted Trench Coat', 'Classic double-breasted trench coat with waist belt and side pockets.', 69.99, true, 10, 'https://image.hm.com/assets/hm/4d/ce/4dce1219225d3fdc73234de477fbc2f88c963a11.jpg?imwidth=2160'),
(36, 'Padded Hooded Jacket', 'Warm padded jacket with a drawstring hood and zip front.', 49.99, true, 10, 'https://image.hm.com/assets/hm/0e/37/0e37c9a104f571fa852907a45d5ae2c864218f55.jpg?imwidth=2160'),
(37, 'Short Wool-Blend Coat', 'Short coat in a soft wool blend with dropped shoulders and button front.', 59.99, true, 10, 'https://image.hm.com/assets/hm/d0/83/d083ea331fdd750cb3f101a26c5b2f28414722df.jpg?imwidth=2160'),


-- Women's Dresses
(9, 'Wrap Dress', 'Flattering wrap dress for all occasions', 89.99, true, 9, 'https://image.hm.com/assets/hm/d3/35/d33516c1008617181668c1730ae9fe99460b86c5.jpg?imwidth=1536'),
(10, 'Maxi Sundress', 'Flowing long sundress with floral pattern', 79.99, true, 9, 'https://image.hm.com/assets/hm/5a/a6/5aa68858b25363e6ccaba02b693681bfc31f67f2.jpg?imwidth=1536'),
(12, 'Drawstring Maxi Dress', 'Long dress with adjustable straps and gathering.', 29.99, true, 9, 'https://image.hm.com/assets/hm/60/21/60215afa3c267e9b204862b956c01eedde5d99ec.jpg?imwidth=1260'),
(28, 'Drawstring‑Neck Dress', 'Short, loose-fit A-line dress in woven cotton with drawstring neckline and balloon sleeves.', 24.99, true, 9, 'https://image.hm.com/assets/hm/74/0f/740fff3ee6b540fe35f0f57a1ac06c7652e3c999.jpg?imwidth=2160'),
(29, 'Sequined Wrap Dress', 'Calf‑length wrap dress in sequined mesh with V‑neck, long sleeves, waist ties and jersey lining.', 84.99, true, 9, 'https://image.hm.com/assets/hm/e5/8e/e58e326503567fca8e523cdb2c6f7210bcda6f96.jpg?imwidth=2160'),

-- Women''s bottoms
(30, 'Wide‑leg Pants', 'High‑waist straight wide‑leg woven pants in white.', 34.99, true, 8, 'https://image.hm.com/assets/hm/00/43/00430c4af9f425fe4ce5c28c8643caf9c80e36fc.jpg?imwidth=2160'),
(31, 'Dress Pants', 'Loose‑fit twill dress pants with pleats in black.', 24.99, true, 8, 'https://image.hm.com/assets/hm/8b/d9/8bd91f9c0b8d7a6b133a632ffc403d09fa405b47.jpg?imwidth=2160'),
(32, 'Linen‑Blend Pants', 'Loose‑fit linen‑blend pants with drawstring waist in light beige.', 29.99, true, 8, 'https://image.hm.com/assets/hm/2f/9e/2f9e3e25e5e0d75bd1e7314dd6ae6114b317a65a.jpg?imwidth=2160'),
(33, 'Wide‑cut Pull‑on Pants', 'High‑waist pull‑on viscose pants with drawstring in light beige.', 24.99, true, 8, 'https://image.hm.com/assets/hm/51/c3/51c3be61b979a44683abf2144cc2bb4f7bf72997.jpg?imwidth=2160'),
(34, 'Wide Crinkled Pants', 'Wide‑leg crinkled pants in black for relaxed styling.', 29.99, true, 8, 'https://image.hm.com/assets/hm/9d/4f/9d4f68bca657e49eacd03f2de95ea0c5bbae59dc.jpg?imwidth=2160'),

-- Boy's
(13, 'Loose Fit Linen‑Blend Pants (Kids)', 'Kids loose-fit pants in a cotton–linen blend with elastic drawstring waist.', 14.99, true, 11, 'https://image.hm.com/assets/hm/d8/11/d8113821b8647ab6ab40348cf53c7fec690e1856.jpg?imwidth=2160'),
(19, 'Cotton T-shirt (Boys)', 'Soft cotton t-shirt with classic fit.', 14.99, true, 11, 'https://image.hm.com/assets/hm/97/96/9796d97e63fa5f0095496d6f44be99c1bb1ad8b4.jpg?imwidth=1260'),
(20, 'Cotton T-shirt (Boys)', 'Soft cotton t-shirt with classic fit.', 14.99, true, 11, 'https://image.hm.com/assets/hm/e5/d5/e5d5f85fdfaa3f6924bfbad94d7fcf7c2ce4b912.jpg?imwidth=2160'),
(21, 'Denim Shorts (Boys)', 'Classic denim shorts with adjustable waistband.', 13.99, true, 11, 'https://image.hm.com/assets/hm/6f/3e/6f3ec265ce080304a40385468857f312bed27085.jpg?imwidth=2160'),
(22, 'Hoodie with Graphic Print (Boys)', 'Cozy hoodie with cool graphic design.', 29.99, true, 11, 'https://image.hm.com/assets/hm/71/23/7123a04edc8eb9106d8a26861d771d86f4bb2c09.jpg?imwidth=2160'),



-- Girl's 
(14, 'Flared‑Skirt Printed Dress (Kids)', 'Sleeveless jersey dress with printed flared woven skirt—playful unicorn pattern.', 19.99, true, 12, 'https://image.hm.com/assets/hm/95/f8/95f86a4740444177ce5f4110b5c9e0742532451e.jpg?imwidth=1260'),
(15, 'Scalloped‑Trim Organic Cotton Dress (Kids)', 'Organic‑cotton sleeveless dress with scalloped ruffled yoke and flared skirt.', 39.99, true, 12, 'https://image.hm.com/assets/hm/09/4d/094d9f330ccb1e0c71ccfabed71a9e57496af455.jpg?imwidth=2160'),
(16, 'Ribbed Cotton Tank Top (Girls)', 'Soft ribbed cotton tank top — comfy for layering or warm days.', 7.99, true, 12, 'https://image.hm.com/assets/hm/be/6e/be6ea873aa1460f9c8e752047d5803d5b0234a96.jpg?imwidth=2160'),
(17, 'Soft Jersey Shorts (Girls)', 'Casual shorts in stretch jersey with elastic waistband.', 9.99, true, 12, 'https://image.hm.com/assets/hm/be/57/be573247f5a33a6d5cc4dab5a1e46f2f43160c2a.jpg?imwidth=2160'),
(18, 'Denim Skinny Jeans (Girls)', 'Stretch denim skinny jeans with adjustable waistband.', 24.99, true, 12, 'https://image.hm.com/assets/hm/6d/8d/6d8d17aba2cab820fdceda8cdf02a49cb55d85b7.jpg?imwidth=1260');



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

--Casual Polo Shirt variants
(3, 'S', 'Light Blue', '#ADD8E6', 10, 'CASUAL-S-LTBLUE'),
(3, 'M', 'Light Blue', '#ADD8E6', 15, 'CASUAL-M-LTBLUE'),
(3, 'L', 'Light Blue', '#ADD8E6', 20, 'CASUAL-L-LTBLUE'),
(3, 'XL', 'Light Blue', '#ADD8E6', 10, 'CASUAL-XL-LTBLUE'),
(3, 'S', 'White', '#FFFFFF', 10, 'CASUAL-S-WHITE'),
(3, 'M', 'White', '#FFFFFF', 15, 'CASUAL-M-WHITE'),
(3, 'L', 'White', '#FFFFFF', 20, 'CASUAL-L-WHITE'),
(3, 'XL', 'White', '#FFFFFF', 10, 'CASUAL-XL-WHITE'),


-- Slim Fit Jeans variants
(4, 'S', 'Blue', '#0000FF', 8, 'SLIM-30-30-BLUE'),
(4, 'M', 'Blue', '#0000FF', 10, 'SLIM-32-30-BLUE'),
(4, 'L', 'Blue', '#0000FF', 12, 'SLIM-34-30-BLUE'),
(4, 'XL', 'Blue', '#0000FF', 8, 'SLIM-36-30-BLUE'),
(4, 'S', 'Blue', '#0000FF', 8, 'SLIM-30-32-BLUE'),
(4, 'M', 'Blue', '#0000FF', 10, 'SLIM-32-32-BLUE'),
(4, 'L', 'Blue', '#0000FF', 12, 'SLIM-34-32-BLUE'),
(4, 'XL', 'Blue', '#0000FF', 8, 'SLIM-36-32-BLUE'),
(4, 'S', 'Black', '#000000', 8, 'SLIM-30-30-BLACK'),
(4, 'M', 'Black', '#000000', 10, 'SLIM-32-30-BLACK'),
(4, 'L', 'Black', '#000000', 12, 'SLIM-34-30-BLACK'),
(4, 'XL', 'Black', '#000000', 8, 'SLIM-36-30-BLACK'),

-- Chino Trousers variants
(5, 'S', 'Blue', '#0000FF', 8, 'CHINO-30-30-BLUE'),
(5, 'M', 'Blue', '#0000FF', 10, 'CHINO-32-30-BLUE'),
(5, 'L', 'Blue', '#0000FF', 12, 'CHINO-34-30-BLUE'),
(5, 'XL', 'Blue', '#0000FF', 8, 'CHINO-36-30-BLUE'),
(5, 'S', 'Blue', '#0000FF', 8, 'CHINO-30-32-BLUE'),
(5, 'M', 'Blue', '#0000FF', 10, 'CHINO-32-32-BLUE'),
(5, 'S', 'White', '#FFFFFF', 10, 'CHINO-S-WHITE'),
(5, 'M', 'White', '#FFFFFF', 15, 'CHINO-M-WHITE'),
(5, 'L', 'White', '#FFFFFF', 20, 'CHINO-L-WHITE'),
(5, 'XL', 'White', '#FFFFFF', 10, 'CHINO-XL-WHITE'),

-- Athletic Shorts variants
(6, 'XS', 'White', '#FFFFFF', 8, 'ATHLETIC-XS-WHITE'),
(6, 'S', 'White', '#FFFFFF', 12, 'ATHLETIC-S-WHITE'),
(6, 'M', 'White', '#FFFFFF', 15, 'ATHLETIC-M-WHITE'),
(6, 'L', 'White', '#FFFFFF', 12, 'ATHLETIC-L-WHITE'),
(6, 'XL', 'White', '#FFFFFF', 8, 'ATHLETIC-XL-WHITE'),
(6, 'XS', 'Blush', '#DE5D83', 8, 'ATHLETIC-XS-BLUSH'),
(6, 'S', 'Blush', '#DE5D83', 12, 'ATHLETIC-S-BLUSH'),
(6, 'M', 'Blush', '#DE5D83', 15, 'ATHLETIC-M-BLUSH'),
(6, 'L', 'Blush', '#DE5D83', 12, 'ATHLETIC-L-BLUSH'),
(6, 'XL', 'Blush', '#DE5D83', 8, 'ATHLETIC-XL-BLUSH'),

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

--Fitted Turtleneck variants
(8, 'XS', 'White', '#FFFFFF', 8, 'VNECK-XS-WHITE'),
(8, 'S', 'White', '#FFFFFF', 12, 'VNECK-S-WHITE'),
(8, 'M', 'White', '#FFFFFF', 15, 'VNECK-M-WHITE'),
(8, 'L', 'White', '#FFFFFF', 12, 'VNECK-L-WHITE'),
(8, 'XL', 'White', '#FFFFFF', 8, 'VNECK-XL-WHITE'),
(8, 'XS', 'Blush', '#DE5D83', 8, 'VNECK-XS-BLUSH'),
(8, 'S', 'Blush', '#DE5D83', 12, 'VNECK-S-BLUSH'),
(8, 'M', 'Blush', '#DE5D83', 15, 'VNECK-M-BLUSH'),
(8, 'L', 'Blush', '#DE5D83', 12, 'VNECK-L-BLUSH'),
(8, 'XL', 'Blush', '#DE5D83', 8, 'VNECK-XL-BLUSH'),

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
(9, 'XL', 'Red', '#FF0000', 5, 'WRAP-XL-RED'),
(10, 'XS', 'Black', '#000000', 5, 'MAXI-XS-BLACK'),
(10, 'S', 'Black', '#000000', 8, 'MAXI-S-BLACK'),
(10, 'M', 'Black', '#000000', 10, 'MAXI-M-BLACK'),
(10, 'L', 'Black', '#000000', 8, 'MAXI-L-BLACK'),
(10, 'XL', 'Black', '#000000', 5, 'MAXI-XL-BLACK'),
(28, 'S', 'White', '#FFFFFF', 10, 'DRWNDRESS-S-WHT'),
(28, 'M', 'White', '#FFFFFF', 8, 'DRWNDRESS-M-WHT'),
(28, 'L', 'White', '#FFFFFF', 5, 'DRWNDRESS-L-WHT'),
(28, 'S', 'Black', '#000000', 10, 'DRWNDRESS-S-WHT'),
(28, 'M', 'Black', '#000000', 8, 'DRWNDRESS-M-WHT'),
(28, 'L', 'Black', '#000000', 5, 'DRWNDRESS-L-WHT'),
(29, 'S', 'Black', '#000000', 4, 'SEQWRAP-S-BLK'),
(29, 'M', 'Black', '#000000', 3, 'SEQWRAP-M-BLK'),
(29, 'L', 'Black', '#000000', 1, 'SEQWRAP-L-BLK'),
(29, 'S', 'White', '#FFFFFF', 4, 'SEQWRAP-S-BLK'),
(29, 'M', 'White', '#FFFFFF', 3, 'SEQWRAP-M-BLK'),
(29, 'L', 'White', '#FFFFFF', 1, 'SEQWRAP-L-BLK'),

-- Men's outwear variants
(38, 'S', 'Charcoal', '#36454F', 7, 'MOUTWCL-S-CHA'),
(38, 'M', 'Charcoal', '#36454F', 5, 'MOUTWCL-M-CHA'),
(38, 'L', 'Charcoal', '#36454F', 3, 'MOUTWCL-L-CHA'),
(38, 'XL', 'Charcoal', '#36454F', 2, 'MOUTWCL-XL-CHA'),
(38, 'M', 'Navy', '#000080', 4, 'MOUTWCL-M-NAV'),
(38, 'L', 'Navy', '#000080', 3, 'MOUTWCL-L-NAV'),
(38, 'XL', 'Navy', '#000080', 2, 'MOUTWCL-XL-NAV'),
(39, 'S', 'Navy', '#000080', 6, 'MOUTBOM-S-NAV'),
(39, 'M', 'Navy', '#000080', 8, 'MOUTBOM-M-NAV'),
(39, 'L', 'Navy', '#000080', 5, 'MOUTBOM-L-NAV'),
(39, 'M', 'Black', '#000000', 7, 'MOUTBOM-M-BLK'),
(39, 'L', 'Black', '#000000', 4, 'MOUTBOM-L-BLK'),
(39, 'XL', 'Black', '#000000', 3, 'MOUTBOM-XL-BLK'),
(39, 'S', 'Olive', '#556B2F', 5, 'MOUTBOM-S-OLV'),
(39, 'M', 'Olive', '#556B2F', 6, 'MOUTBOM-M-OLV'),
(40, 'M', 'Olive', '#556B2F', 4, 'MOUTPAR-M-OLV'),
(40, 'L', 'Olive', '#556B2F', 3, 'MOUTPAR-L-OLV'),
(40, 'XL', 'Olive', '#556B2F', 2, 'MOUTPAR-XL-OLV'),
(40, 'M', 'Black', '#000000', 3, 'MOUTPAR-M-BLK'),
(40, 'L', 'Black', '#000000', 4, 'MOUTPAR-L-BLK'),
(40, 'XL', 'Black', '#000000', 1, 'MOUTPAR-XL-BLK'),
(41, 'S', 'Blue', '#1E90FF', 7, 'MOUTDEN-S-BLU'),
(41, 'M', 'Blue', '#1E90FF', 6, 'MOUTDEN-M-BLU'),
(41, 'L', 'Blue', '#1E90FF', 5, 'MOUTDEN-L-BLU'),
(41, 'S', 'Black', '#000000', 4, 'MOUTDEN-S-BLK'),
(41, 'M', 'Black', '#000000', 3, 'MOUTDEN-M-BLK'),

-- Women's bottoms variants

(30, 'S', 'White', '#FFFFFF', 8, 'WLPANTS-S-WHT'),
(30, 'M', 'White', '#FFFFFF', 5, 'WLPANTS-M-WHT'),
(30, 'L', 'White', '#FFFFFF', 0, 'WLPANTS-L-WHT'),
(31, 'S', 'Black', '#000000', 3, 'DRPANTS-S-BLK'),
(31, 'M', 'Black', '#000000', 2, 'DRPANTS-M-BLK'),
(32, 'M', 'Light Beige', '#F5F5DC', 4, 'LINPANTS-M-BEIG'),
(32, 'L', 'Light Beige', '#F5F5DC', 1, 'LINPANTS-L-BEIG'),
(33, 'S', 'Light Beige', '#F5F5DC', 6, 'PULLPANTS-S-BEIG'),
(33, 'M', 'Light Beige', '#F5F5DC', 0, 'PULLPANTS-M-BEIG'),
(33, 'L', 'Light Beige', '#F5F5DC', 2, 'PULLPANTS-L-BEIG'),
(34, 'XS', 'Black', '#000000', 4, 'CRINKPANTS-XS-BLK'),
(34, 'S', 'Black', '#000000', 0, 'CRINKPANTS-S-BLK'),
(34, 'M', 'Black', '#000000', 3, 'CRINKPANTS-M-BLK'),

-- Women's outwear variants 
(35, 'S', 'Beige', '#F5F5DC', 6, 'WOUTTR-S-BEIGE'),
(35, 'M', 'Beige', '#F5F5DC', 0, 'WOUTTR-M-BEIGE'),
(36, 'M', 'Black', '#000000', 3, 'WOUTPAD-M-BLK'),
(36, 'L', 'Black', '#000000', 4, 'WOUTPAD-L-BLK'),
(37, 'S', 'Gray', '#BEBEBE', 2, 'WOUTWBL-S-GRY'),
(37, 'M', 'Gray', '#BEBEBE', 0, 'WOUTWBL-M-GRY'),

--Linen‑Blend Pull‑on Trousers variants
(11, 'M', 'Cream', '#F5F5DC', 10, 'LINEN-M-CREAM'),
(11, 'L', 'Cream', '#F5F5DC', 8, 'LINEN-L-CREAM'),
(11, 'M', 'Navy', '#000080', 5, 'LINEN-M-NAVY'),

-- Classic Cotton Shirt (Men) variants
(23, 'S', 'White', '#FFFFFF', 10, 'MENSHIRT-S-WHITE'),
(23, 'M', 'White', '#FFFFFF', 15, 'MENSHIRT-M-WHITE'),
(23, 'L', 'White', '#FFFFFF', 12, 'MENSHIRT-L-WHITE'),
(23, 'XL', 'White', '#FFFFFF', 8, 'MENSHIRT-XL-WHITE'),
(23, 'S', 'Blue', '#0000FF', 10, 'MENSHIRT-S-BLUE'),
(23, 'M', 'Blue', '#0000FF', 15, 'MENSHIRT-M-BLUE'),
(23, 'L', 'Blue', '#0000FF', 12, 'MENSHIRT-L-BLUE'),

-- Casual Polo Shirt (Men)

(24, 'S', 'Navy', '#000080', 10, 'MENPOLO-S-NAVY'),
(24, 'M', 'Navy', '#000080', 15, 'MENPOLO-M-NAVY'),
(24, 'L', 'Navy', '#000080', 12, 'MENPOLO-L-NAVY'),
(24, 'XL', 'Navy', '#000080', 8, 'MENPOLO-XL-NAVY'),
(24, 'S', 'Gray', '#808080', 10, 'MENPOLO-S-GRAY'),
(24, 'M', 'Gray', '#808080', 15, 'MENPOLO-M-GRAY'),

-- Ribbed Crop Top (Women)

(25, 'XS', 'Black', '#000000', 10, 'WMNRIBTOP-XS-BLK'),
(25, 'S', 'Black', '#000000', 14, 'WMNRIBTOP-S-BLK'),
(25, 'M', 'Black', '#000000', 12, 'WMNRIBTOP-M-BLK'),
(25, 'L', 'Black', '#000000', 6, 'WMNRIBTOP-L-BLK'),

--Rib-knit Button-front Top (Women)

(26, 'S', 'Black', '#000000', 8, 'WMNBUTTONTOP-S-BLK'),
(26, 'M', 'Black', '#000000', 10, 'WMNBUTTONTOP-M-BLK'),
(26, 'L', 'Black', '#000000', 6, 'WMNBUTTONTOP-L-BLK'),

-- Ribbed Tank Top (Women)

(27, 'XS', 'Black', '#000000', 10, 'WMNTANKTOP-XS-BLK'),
(27, 'S', 'Black', '#000000', 10, 'WMNTANKTOP-S-BLK'),
(27, 'M', 'Black', '#000000', 12, 'WMNTANKTOP-M-BLK'),

--Drawstring Maxi Dress variants
(12, 'S', 'White/Yellow Floral', '#FFFFE0', 12, 'MAXI-S-WFLORAL'),
(12, 'M', 'White/Yellow Floral', '#FFFFE0', 5, 'MAXI-M-WFLORAL'),

-- Boy's 
(13, 'XS', 'White', '#FFFFFF', 10, 'KIDSLOOSE-XS-WHITE'),
(13, 'S', 'White', '#FFFFFF', 5, 'KIDSLOOSE-S-WHITE'),
(13, 'L', 'Black', '#000000', 7, 'KIDSLOOSE-L-BLACK'),
(19, 'XS', 'Blue', '#0000FF', 10, 'BOYS-TSHIRT-XS-BLUE'),
(19, 'S', 'Blue', '#0000FF', 15, 'BOYS-TSHIRT-S-BLUE'),
(19, 'M', 'Blue', '#0000FF', 20, 'BOYS-TSHIRT-M-BLUE'),
(20, 'L', 'Blue', '#0000FF', 12, 'BOYS-TSHIRT-L-BLUE'),
(20, 'XL', 'Blue', '#0000FF', 8, 'BOYS-TSHIRT-XL-BLUE'),
(20, 'XS', 'Green', '#008000', 10, 'BOYS-TSHIRT-XS-GREEN'),
(20, 'S', 'Green', '#008000', 15, 'BOYS-TSHIRT-S-GREEN'),
(20, 'M', 'Green', '#008000', 20, 'BOYS-TSHIRT-M-GREEN'),
(21, 'XS', 'Light Blue', '#ADD8E6', 8, 'BOYS-SHORTS-XS-LBLUE'),
(21, 'S', 'Light Blue', '#ADD8E6', 12, 'BOYS-SHORTS-S-LBLUE'),
(21, 'M', 'Light Blue', '#ADD8E6', 15, 'BOYS-SHORTS-M-LBLUE'),
(21, 'L', 'Light Blue', '#ADD8E6', 10, 'BOYS-SHORTS-L-LBLUE'),
(21, 'XL', 'Light Blue', '#ADD8E6', 5, 'BOYS-SHORTS-XL-LBLUE'),
(22, 'XS', 'Gray', '#808080', 12, 'BOYS-HOODIE-XS-GRAY'),
(22, 'S', 'Gray', '#808080', 14, 'BOYS-HOODIE-S-GRAY'),
(22, 'M', 'Gray', '#808080', 16, 'BOYS-HOODIE-M-GRAY'),
(22, 'L', 'Gray', '#808080', 10, 'BOYS-HOODIE-L-GRAY'),
(22, 'XL', 'Gray', '#808080', 6, 'BOYS-HOODIE-XL-GRAY'),

-- Girl's
(14, 'XS', 'Cream/Unicorns', NULL, 8, 'KIDSFLARE-XS-UNICS'),
(14, 'S', 'Cream/Unicorns', NULL, 4, 'KIDSFLARE-S-UNICS'),
(15, 'S', 'White', '#FFFFFF', 6, 'KIDSSC-S-WHITE'),
(15, 'M', 'White', '#FFFFFF', 3, 'KIDSSC-M-WHITE'),
(16, 'XS', 'flower', '#FFFFFF', 10, 'GIRLTANK-XS-WHT'),
(16, 'XS', 'Light Pink', '#FFB6C1', 7, 'GIRLTANK-XS-PNK'),
(17, 'XS', 'Pink', '#FFC0CB', 6, 'GIRLSHORTS-XS-PINK'),
(17, 'XS', 'Pink', '#FFC0CB', 4, 'GIRLSHORTS-XS-Pink'),
(17, 'S', 'Pink', '#FFC0CB', 6, 'GIRLSHORTS-S-PINK'),
(17, 'S', 'Pink', '#FFC0CB', 4, 'GIRLSHORTS-S-PINK'),
(18, 'XS', 'Light Blue', '#ADD8E6', 7, 'GIRLJEANS-110-LBLUE'),
(18, 'S', 'Light Blue', '#ADD8E6', 5, 'GIRLJEANS-116-LBLUE'),
(18, 'L', 'Light Blue', '#ADD8E6', 2, 'GIRLJEANS-122-LBLUE');

-- Reviews
INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
-- Men's clothing reviews
(1, 2, 4.5, 'Great quality t-shirt, very soft material.'),
(1, 3, 4.0, 'Good basic t-shirt, fits as expected.'),
(2, 2, 5.0, 'Excellent pants, very light and breathable – perfect for hot weather.'),
(2, 3, 4.0, 'Comfortable, but the cream color gets dirty quickly.'),
(2, 4, 4.5, 'Good cut and comfortable waistband, but I would like to see more colors and sizes.'),
(3, 3, 5.0, 'Excellent quality shirt, very comfortable and fits perfectly.'),
(3, 4, 4.5, 'Good material and classic style, great for office wear.'),
(4, 4, 5.0, 'Perfect fit jeans, very comfortable with some stretch.'),
(5, 2, 5.0, 'Love this top! Super cute and comfortable.'),
(5, 3, 4.5, 'Fits nicely, fabric is soft.'),
(5, 4, 4.0, 'Great value for the price.'),
(6, 3, 4.8, 'Chic and fits perfectly. Love the button detail!'),
(6, 2, 4.5, 'Elegant but casual. Very versatile.'),
(11, 2, 5.0, 'Excellent pants, very light and breathable – perfect for hot weather.'),
(11, 3, 4.0, 'Comfortable, but the cream color gets dirty quickly.'),
(11, 4, 4.5, 'Good cut and comfortable waistband, but I would like to see more colors and sizes.'),
(23, 3, 5.0, 'Excellent quality shirt, very comfortable and fits perfectly.'),
(23, 4, 4.5, 'Good material and classic style, great for office wear.'),
(23, 3, 4.0, 'Nice fabric, but sleeves are slightly long for me.'),
(24, 3, 4.5, 'Very comfortable and looks great casual or semi-formal.'),
(24, 4, 4.0, 'Nice fit, color stays vibrant after washing.'),
(24, 4, 4.0, 'Good for summer wear, breathable fabric.'),
(38, 2, 4.5, 'Very warm and stylish. Perfect for winter.'),
(38, 3, 4.0, 'Good quality but a bit tight on shoulders.'),
(39, 4, 4.0, 'Comfortable jacket for mild weather.'),
(39, 3, 4.5, 'Nice fit and great style.'),
(40, 2, 5.0, 'Extremely warm and durable.'),
(40, 4, 4.5, 'Love the faux fur detail.'),
(41, 2, 4.0, 'Classic style, perfect for casual wear.'),
(41, 3, 4.5, 'Good quality denim.'),

-- Women's clothing reviews
(7, 3, 5.0, 'Beautiful blouse, fabric is high quality and drapes nicely.'),
(8, 2, 5.0, 'Light and breezy—perfect for summer outings!'),
(8, 3, 4.0, 'Love the fit, but sleeves are a tad long for me.'),
(9, 4, 4.5, 'Perfect dress for work events, very flattering.'),
(10, 2, 4.8, 'These pants are super flattering and comfortable!'),
(10, 3, 4.2, 'Nice material, a bit long for my height.'),
(12, 2, 5.0, 'A very beautiful dress, light and summery, with a lovely drape.'),
(12, 3, 4.5, 'The fabric is thin but perfect for hot weather; it is slightly see-through.'),
(12, 4, 3.5, 'Not bad, but I would like more sizes. The S turned out to be larger than I expected.'),
(25, 2, 5.0, 'Love this top! Super cute and comfortable.'),
(25, 3, 4.5, 'Fits nicely, fabric is soft.'),
(25, 4, 4.0, 'Great value for the price.'),
(26, 3, 4.8, 'Chic and fits perfectly. Love the button detail!'),
(26, 2, 4.5, 'Elegant but casual. Very versatile.'),
(26, 3, 4.0, 'Nice but slightly tight on arms.'),
(27, 2, 5.0, 'Perfect for summer, breathable and cute.'),
(27, 3, 4.5, 'Really flattering and comfy.'),
(27, 2, 4.0, 'Great everyday tank top.'),
(28, 2, 5.0, 'Light and breezy—perfect for summer outings!'),
(28, 3, 4.0, 'Love the fit, but sleeves are a tad long for me.'),
(28, 4, 3.5, 'Comfortable overall, fabric feels a bit thin.'),
(29, 3, 5.0, 'Stunning dress, perfect for evening events.'),
(29, 4, 4.5, 'Sequins are beautiful, but slightly heavy.'),
(29, 4, 4.0, 'Nice glam wrap style—just needs a slip underneath.'),
(30, 2, 4.8, 'These pants are super flattering and comfortable!'),
(30, 3, 4.2, 'Nice material, a bit long for my height.'),
(31, 4, 4.0, 'Great fit, professional look.'),
(31, 2, 3.0, 'Fabric is nice but wish they had more sizes.'),
(32, 4, 4.5, 'Perfect for summer, breathable and stylish.'),
(32, 3, 4.0, 'Lightweight and comfy, slightly transparent though.'),
(33, 4, 4.5, 'Super easy to wear, love the color and texture.'),
(33, 2, 4.0, 'Good fit, elastic waistband is soft.'),
(34, 3, 4.5, 'Stylish and lightweight, great for travel.'),
(34, 3, 4.0, 'Love the crinkle effect, wish it came in more colors.'),
(35, 2, 5.0, 'Elegant cut and fits perfectly.'),
(35, 3, 4.5, 'Great material and true to size.'),
(36, 4, 4.0, 'Very warm but a bit bulky.'),
(36, 3, 4.5, 'Love the hood and length.'),
(37, 4, 4.5, 'Stylish and cozy, perfect for autumn.'),
(37, 2, 4.0, 'Runs slightly large.'),



-- Boy's 
(13, 2, 4.5, 'Great summer pants—breathable and cool.'),
(13, 3, 4.0, 'Nice fit but a bit long on my 6‑year‑old.'),
(13, 4, 3.5, 'Comfy but drawstring could be tighter.'),
(19, 3, 5.0, 'Perfect fit and very comfortable for my son.'),
(20, 4, 4.5, 'Good quality material and washes well.'),
(20, 3, 4.0, 'Nice colors but the fit is a bit loose.'),
(21, 3, 4.5, 'Great shorts for summer, very durable fabric.'),
(21, 4, 4.0, 'Fit is true to size, easy to wear.'),
(21, 3, 4.0, 'Good value for the price.'),
(22, 3, 5.0, 'My boy loves this hoodie, very soft and warm.'),
(22, 4, 4.5, 'Excellent quality and nice fit.'),
(22, 3, 4.5, 'Good for chilly days, great design.'),

-- Girl's 
(14, 3, 5.0, 'Adorable dress—perfect for parties.'),
(14, 4, 4.0, 'My daughter loved it, but skirt is a bit shiny.'),
(14, 2, 3.5, 'Cute, but slightly itchy on the arms.'),
(15, 4, 5.0, 'Love the scalloped trim—looks elegant.'),
(15, 3, 4.5, 'Soft organic cotton, perfect for sensitive skin.'),
(15, 2, 4.0, 'Beautiful but a bit expensive.'),
(16, 2, 5.0, 'Simple, good fit, daughter wears it all the time.'),
(16, 1, 4.0, 'Nice quality, slightly thin fabric.'),
(17, 3, 4.5, 'Super comfy for playtime.'),
(17, 4, 4.0, 'Good value, waistband is soft.'),
(18, 3, 5.0, 'Very comfortable and stretchy jeans.'),
(18, 2, 4.0, 'A bit stiff at first, but softens after wearing.'),
(18, 4, 3.0, 'Waistband could be more comfortable.');


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