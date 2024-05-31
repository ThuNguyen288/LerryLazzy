
-- Insert data into Categories table
INSERT INTO Categories (CategoryID, Name)
VALUES (1, 'Wool'),
       (2, 'Product'),
       (3, 'Material'),
       (4, 'Tool');

-- Insert data into Subcategories table
INSERT INTO Subcategories (SubcategoryID, Name)
VALUES (1, 'Animal'),
       (2, 'Plant'),
       (3, 'Food'),
       (4, 'Cloth'),
       (5, 'Accessory'),
       (6, 'Mochi'),
       (7, 'Other');

-- Insert data into Status table
INSERT INTO OrderStatus (StatusID, StatusName)
VALUES 	(1, 'Pending Confirmation'),
		(2, 'Pending Pickup'),
		(3, 'Pending Delivery'),
		(4, 'Delivered'),
		(5, 'Cancelled');

-- Insert data into Users table
INSERT INTO Users (UserID, Username, Password, Firstname, Lastname, Phone, Email, Address, Role)
VALUES
(1, 'tramyvu6603', '123456789', 'Tra My', 'Vu', '334280050', 'tramyvu6603@example.com', '123 Hoang Huu Nam Street', 'admin'),
(2, 'thuthu', '987654321', 'Kim Thu', 'Nguyen Thi', '123456789', 'thuthu@example.com', '456 Demo Street', 'admin'),
(3, 'john_doe', 'password_123', 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St, City', 'customer'),
(4, 'jane_smith', 'pass123', 'Jane', 'Smith', '987654321', 'jane.smith@example.com', '456 Elm St, Town', 'customer'),
(5, 'michael_johnson', 'mike1234', 'Michael', 'Johnson', '555123456', 'michael.johnson@example.com', '789 Oak St, Village', 'customer'),
(6, 'emily_brown', 'emily_pass', 'Emily', 'Brown', '111222333', 'emily.brown@example.com', '101 Pine St, Hamlet', 'customer'),
(7, 'sarah_davis', 'sarah@pass', 'Sarah', 'Davis', '444555666', 'sarah.davis@example.com', '202 Cedar St, Borough', 'customer'),
(8, 'david_garcia', 'garcia123', 'David', 'Garcia', '777888999', 'david.garcia@example.com', '303 Maple St, Township', 'customer'),
(9, 'jessica_martinez', 'jess_pass', 'Jessica', 'Martinez', '999888777', 'jessica.martinez@example.com', '404 Birch St, District', 'customer'),
(10, 'matthew_rodriguez', 'matt456', 'Matthew', 'Rodriguez', '666333111', 'matthew.rodriguez@example.com', '505 Walnut St, Territory', 'customer'),
(11, 'andrew_wilson', 'andrewww', 'Andrew', 'Wilson', '222333444', 'andrew.wilson@example.com', '606 Oak St, Province', 'customer'),
(12, 'emma_anderson', 'emma_pass', 'Emma', 'Anderson', '444333222', 'emma.anderson@example.com', '707 Pine St, Sector', 'customer'),
(13, 'james_taylor', 'jamest_pass', 'James', 'Taylor', '999111444', 'james.taylor@example.com', '808 Cedar St, Division', 'customer'),
(14, 'olivia_thomas', 'olivia_pass', 'Olivia', 'Thomas', '888222555', 'olivia.thomas@example.com', '909 Elm St, Precinct', 'customer'),
(15, 'william_hernandez', 'will123', 'William', 'Hernandez', '555777999', 'william.hernandez@example.com', '123 Oak Ave, Municipality', 'customer'),
(16, 'ava_moore', 'ava456', 'Ava', 'Moore', '333777111', 'ava.moore@example.com', '456 Pine Ave, Parish', 'customer'),
(17, 'daniel_martin', 'daniel_pass', 'Daniel', 'Martin', '222444666', 'daniel.martin@example.com', '789 Elm Ave, Canton', 'customer'),
(18, 'sophia_gonzalez', 'sophia_pass', 'Sophia', 'Gonzalez', '111999333', 'sophia.gonzalez@example.com', '101 Maple Ave, Shire', 'customer'),
(19, 'benjamin_white', 'white_pass', 'Benjamin', 'White', '888444222', 'benjamin.white@example.com', '202 Birch Ave, Dominion', 'customer'),
(20, 'isabella_hall', 'hall@pass', 'Isabella', 'Hall', '777555333', 'isabella.hall@example.com', '303 Oak Ave, Commonwealth', 'customer'),
(21, 'alexander_allen', 'alex123', 'Alexander', 'Allen', '444666888', 'alexander.allen@example.com', '404 Pine Ave, Territory', 'customer'),
(22, 'mia_young', 'mia456', 'Mia', 'Young', '111222333', 'mia.young@example.com', '505 Elm Ave, Region', 'customer');

-- Update password in Users table
UPDATE Users
SET Password = CASE
    WHEN UserID = 1 THEN '$2a$10$bSaVn63wFVdIVSaH51VSLuSf5NpgOdJIgFd76bVxlKroMU5M1T0o2'
    WHEN UserID = 2 THEN '$2a$10$RORFmVhtnkEsvwn7pTXGw.rxYhi7X/p3NL3iRS17/0x8waCIMs3hW'
    WHEN UserID = 3 THEN '$$2a$10$UrO3mazeO/ybqV/PuzmrLeG2BvPZ2NFtodssVdSzklSTtcDztDUze'
    WHEN UserID = 4 THEN '$2a$10$C656qBpPGpFK1bxG0N652eP.nXtp.JCvtYf/P3/2SBvF05ZHR4Gi6'
    WHEN UserID = 5 THEN '$2a$10$fQhRZ1ACYV1286Z7zW.32.PHkqoXw3c6NLsKh.uRefcMM/mBsLO3m'
    WHEN UserID = 6 THEN '$2a$10$D88kxH61rpw3BG1Serrdyurz0gIjVnFlBIKB1BQZtDMA8I9lehwVe'
    WHEN UserID = 7 THEN '$2a$10$/WmXf56q824RhQF2zuhUoOvP6NIOZ/RS9iaIa7lMJ1gIL3.AMdjU2'
    WHEN UserID = 8 THEN '$2a$10$IfaNMbTz9mnqe56Z4JkzEOf.7yAU0SG4eGE2uWyZ8NxXBsogmguse'
    WHEN UserID = 9 THEN '$2a$10$zTDLfi5GL3FEfvvhSIrMZuWFc1ap5L4HLy0miV8yXnNPQ5vSimSfG'
    WHEN UserID = 10 THEN '$2a$10$myfqPKRROgsgUhcxGx5HvOh1cnjQTbmyywkdOJmnU0kmipmqQ.ZVq'
    WHEN UserID = 11 THEN '$2a$10$BiTDt5XIqxJpdh3ftFabE.7JbUSBmPpiqAnzJbiWg6vKcob6gXcJ6'
    WHEN UserID = 12 THEN '$2a$10$m93iSfc0dcmeApzbQK4XiuIYAQGPkP1vkq/2Hm4r.P60WlIkAovOy'
    WHEN UserID = 13 THEN '$2a$10$6c/h04MyL.yXp2FnOZ9KcelpwaxHddwRK/YPAdQhZjKGp0z.VMaA.'
    WHEN UserID = 14 THEN '$2a$10$1ZrGAadI.SFaeR0e7nCq.OvrBUHvdNN623hI.RXXT.d1feP/EunPu'
    WHEN UserID = 15 THEN '$2a$10$a8b7vZAa0MsD./o22zPb1.F.lY4BsrSEeNfecvRpO.J6k9731ltm.'
    WHEN UserID = 16 THEN '$2a$10$2p6TwNbk886Uh/NZS1WbEudHk7TqJSqcP1ib9pHCcMmPlH9H7ACau'
    WHEN UserID = 17 THEN '$2a$10$SGlWxFtr0xqP37Dcw46sQ.6Fa/vDoaaV7RaegO9MU/EdoI/jYcmR2'
    WHEN UserID = 18 THEN '$2a$10$CIuKrP065Ibcr8elZJ4FF.bQL8VuuHWuiCVcjsnzn4.40DKLqmdy2'
    WHEN UserID = 19 THEN '$2a$10$KCQ/M0f6bNv0uDNkt120s.LkHgZmD6Qz0/7RIVeBZQov/odJq/ylK'
    WHEN UserID = 20 THEN '$2a$10$axSPLGthlV0Dm2Qr0LNUbe0Peweg5QizNae3MJcYIwNZwnZy7ZYzy'
    WHEN UserID = 21 THEN '$2a$10$WodCyotaJCiT1Le120048.aNtJ6I8/LMC6gU9x2zxVeTk1p12bxyy'
    WHEN UserID = 22 THEN '$2a$10$Fa8xUR3xPNVKrQcMfmpYVeYmKmV4banLMWX9X7LkbWWkKf.4Nmq.W'
    ELSE Password 
END;

-- Insert data into Coupons table
INSERT INTO Coupons (CouponID, Code, Discount, ExpiryDate)
VALUES
(1, 'SAVE10', 10.00, '2024-06-30'),
(2, 'GET15OFF', 15.00, '2024-07-15'),
(3, 'SPRING20', 20.00, '2024-05-31'),
(4, 'FREESHIP', 0.00, '2024-06-15'),
(5, 'HALFOFF', 50.00, '2024-06-30'),
(6, 'SUMMER25', 25.00, '2024-08-31'),
(7, 'WELCOME5', 5.00, '2024-07-31'),
(8, 'SALE20', 20.00, '2024-06-30'),
(9, 'JULY10', 10.00, '2024-07-31'),
(10, 'LABORDAY', 30.00, '2024-09-05');

-- Insert data into Products table
INSERT INTO Products (Name, Description, Price, CategoryID, SubcategoryID, Image) 
VALUES
    ('Susan Family 4', 'Susan Family 4 premium Chinese domestic wool. Wool is hygroscopic, meaning it absorbs moisture from the air...', 30000, 1, NULL, '/images/wools/susan-family-4.png'),
    ('Susan Family 5', 'Susan Family 5 wool is a larger version than Susan Family 4, and it is also made from premium Chinese domestic wool...', 50000, 1, NULL, '/images/wools/susan-family-5.png'),
    ('Cotton Milk', 'Round, smooth, colorful yarn. Suitable for knitting and crocheting toys, bags, clothes, and amigurumi...', 10000, 1, NULL, '/images/wools/cotton-milk.png'),
    ('Milk Cotton Poly (Cow Milk)', 'Cow milk wool is a type of wool that is quite soft, spongy, and easy to work with. It is available in a variety of colors...', 14000, 1, NULL, '/images/wools/cow-milk.png'),
    ('Baby Yarn', 'Baby Yarn, also called Baby Jeans wool, is top-quality acrylic yarn that is very soft and gentle on the skin. It is perfect for knitting and crocheting clothes, blankets, and accessories for babies and toddlers...', 22000, 1, NULL, '/images/wools/baby-yarn.png'),
    ('Milk Cotton 125Gr', 'Cotton milk wool is used to knit scarves and crochet amigurumi, toys, and other home decor items. It is also a great choice for making baby clothes and accessories because it is soft and gentle on the skin...', 43000, 1, NULL, '/images/wools/milk-cotton-125gr.png'),
    ('Simply Yarn', 'Recycled Cotton suitable hanging bags, hats, tote bags, and other projects. This yarn is eco-friendly and has a beautiful, natural texture...', 30000, 1, NULL, '/images/wools/simply-yarn.png'),
    ('Liliarge Cotton', 'Korean milk cotton wool, 25 gram super soft Korean baby wool roll for knitting beginners...', 15000, 1, NULL, '/images/wools/liliarge-cotton.png'),
    ('Capybara Wearing Orange', '...', 60000, 2, 1, '/images/products/animal/capybara-wear-orange.png'),
    ('Penguin Wearing Flower Hat', '...', 70000, 2, 1, '/images/products/animal/penguin-wear-flower-hat.png'),
    ('Black Cat Cute', '...', 55000, 2, 1, '/images/products/animal/back-cat.png'),
    ('Mini Cute Bear', '...', 50000, 2, 1, '/images/products/animal/mini-bear.png'),
    ('Tulip', '...', 25000, 2, 2, '/images/products/flower/tulip.png'),
    ('Red Rose', '...', 30000, 2, 2, '/images/products/flower/red-rose.png'),
    ('Cactus', '...', 30000, 2, 2, '/images/products/flower/cactus.png'),
    ('Carrot Garden', '...', 70000, 2, 2, '/images/products/flower/carrot-garden.png'),
    ('Thai Pineapple Fried Rice', '...', 50000, 2, 3, '/images/products/food/thai-pinapple-fried-rice.png'),
    ('Mango Cake Roll', '...', 60000, 2, 3, '/images/products/food/mango-cake-roll.png'),
    ('Sea Salt Oreo Cake Roll', '...', 60000, 2, 3, '/images/products/food/oreo-cake-roll.png'),
    ('Matcha Strawberry Cake Roll', '...', 60000, 2, 3, '/images/products/food/matcha-strawberry-cake-roll.png'),
    ('Crop-top With Floral Appliqué', '...', 250000, 2, 4, '/images/products/cloth/croptop-floral.png'),
    ('Rose Halter Top', '...', 280000, 2, 4, '/images/products/cloth/rose-halter-top.png'),
    ('Bear Face Hamburger Dress Set', '...', 600000, 2, 4, '/images/products/cloth/hamburger-dress-set.png'),
    ('Vintage Cardigan', '...', 450000, 2, 4, '/images/products/cloth/vintage-cardigan.png'),
    ('Capybara Hair Clip', '...', 20000, 2, 5, '/images/products/accessory/capybara-hair-clip.png'),
    ('Hangyodon Hair Clip', '...', 20000, 2, 5, '/images/products/accessory/hangyodon-hair-clip.png'),
    ('Milky Woven Bag', '...', 150000, 2, 5, '/images/products/accessory/milky-woven-bag.png'),
    ('Bear Oatmeal Milk Satchel', '...', 120000, 2, 5, '/images/products/accessory/bear-oatmeal-milk-satchel.png'),
    ('Christmas Dumpling', '...', 75000, 2, 6, '/images/products/mochi/christmas-dumpling.png'),
    ('Christmas Hat Candy Dumpling', '...', 65000, 2, 6, '/images/products/mochi/christmas-hat-candy-dumpling.png'),
    ('Christmas Tree Dumpling', '...', 80000, 2, 6, '/images/products/mochi/christmas-tree-dumpling.png'),
    ('Christmas Tree Dumpling (Ver2)', '...', 65000, 2, 6, '/images/products/mochi/christmas-tree-dumpling-ver2.png'),
    ('Christmas Tree Dumpling (Ver3)', '...', 60000, 2, 6, '/images/products/mochi/christmas-tree-dumpling-ver3.png'),
    ('Christmas Wreath Dumpling', '...', 60000, 2, 6, '/images/products/mochi/christmas-wreath-dumpling.png'),
    ('Elk Dumpling', '...', 55000, 2, 6, '/images/products/mochi/elk-dumpling.png'),
    ('Fortune Boy Dumpling', '...', 65000, 2, 6, '/images/products/mochi/fortune-boy-dumpling.png'),
    ('Frog Dumpling', '...', 55000, 2, 6, '/images/products/mochi/frog-dumpling.png'),
    ('God Of Wealth Dumpling', '...', 50000, 2, 6, '/images/products/mochi/god-of-wealth-dumpling.png'),
    ('Lantern Dumpling', '...', 50000, 2, 6, '/images/products/mochi/lantern-dumpling.png'),
    ('Lion-Dance Head Dumpling', '...', 80000, 2, 6, '/images/products/mochi/lion-dance-head-dumpling.png'),
    ('Lucky Bag Dumpling', '...', 60000, 2, 6, '/images/products/mochi/lucky-bag-dumpling.png'),
    ('New Year Dragon Dumpling', '...', 95000, 2, 6, '/images/products/mochi/new-year-dragon-dumpling.png'),
    ('New Year Dumpling', '...', 50000, 2, 6, '/images/products/mochi/new-year-dumpling.png'),
    ('Peach Dumpling', '...', 50000, 2, 6, '/images/products/mochi/peach-dumpling.png'),
    ('Poppy Dumpling', '...', 70000, 2, 6, '/images/products/mochi/poppy-dumpling.png'),
    ('Sailor Moon Dumpling', '...', 55000, 2, 6, '/images/products/mochi/sailor-moon-dumpling.png'),
    ('Santa Claus Dumpling', '...', 70000, 2, 6, '/images/products/mochi/santa-claus-dumpling.png'),
    ('Santa Claus Dumpling (Ver2)', '...', 60000, 2, 6, '/images/products/mochi/santa-claus-dumpling-ver2.png'),
    ('Snowman Dumpling', '...', 60000, 2, 6, '/images/products/mochi/snowman-dumpling.png'),
    ('Spend Money Bag Dumpling', '...', 60000, 2, 6, '/images/products/mochi/spend-money-bag-dumpling.png'),
    ('Spend Money Flower Dumpling', '...', 70000, 2, 6, '/images/products/mochi/spend-money-flower-dumpling.png'),
    ('Tuxedo Mask Dumpling', '...', 60000, 2, 6, '/images/products/mochi/tuxedo-mask-dumpling.png'),
    ('Phone Case With Floral Pattern', '...', 80000, 2, 7, '/images/products/other/phone-case-flower.png'),
    ('Flower Shaped Coaster', '...', 25000, 2, 7, '/images/products/other/flower-shaped-coaster.png'),
    ('Toilet Paper Keychain', '...', 15000, 2, 7, '/images/products/other/toilet-paper-keychain.png'),
    ('Angel And Devil Heart', '...', 40000, 2, 7, '/images/products/other/angel-devil-heart.png'),
    ('Wool Sewing Needle', 'Used to hide excess wool inside the product.', 2000, 3, NULL, '/images/materials/wool-sewing.png'),
    ('Silver Teardrop Clip', 'Silver teardrop clip is often used in fashion accessories, handmade products.', 10000, 3, NULL, '/images/materials/teardrop-clip.png'),
    ('Tape Needle Mark', 'Tape-shaped wool felt with plastic material, colorful eye-catching. Used to mark stitches and rows when hooking.', 5000, 3, NULL, '/images/materials/tape-needle-mark.png'),
    ('Animal Eyes With Safety Latch (10 Pairs Including Latch)', 'Animal eyes are made of plastic material, which is used to make crocheted animal eyes very convenient.', 10000, 3, NULL, '/images/materials/animal-eye.png'),
    ('SKC Flexible Crochet Hook', 'SKC flexible crochet hook SKC flexible crochet hook hook for crocheting...', 30000, 4, NULL, '/images/tools/skc-crochet-hook.png'),
    ('Clover Japanese Domestic Hook', 'Clover Japanese domestic crochet hooks are designed standardly and accurately from needle to handle to help prevent hand fatigue and slipping when crocheting continuously.', 180000, 4, NULL, '/images/tools/clover-crochet-hook.png'),
    ('Tulip Rose Etimo Hook', 'Tulip imitation crochet hook set There are two types of Tulip imitation crochet hook set : a dark pink set for crocheting wool, and a light pink set for crocheting yarn.', 160000, 4, NULL, '/images/tools/tulip-crochet-hook.png'),
    ('That Cham Phuong Domestic Hook', 'Tulip imitation crochet hook set There are two types of Tulip imitation crochet hook set : a dark pink set for crocheting wool, and a light pink set for crocheting yarn.', 160000, 4, NULL, '/images/tools/tcp-crochet-hook.png');

-- Insert data into Reviews table
INSERT INTO Reviews (ReviewID, UserID, ProductID, Rating, Comment, ReviewDate) 
VALUES
(1, 7, 14, 5, 'Great product, highly recommended!', '2024-05-31 08:00:00'),
(2, 10, 33, 4, 'Good quality but a bit expensive.', '2024-05-30 12:00:00'),
(3, 15, 42, 4, 'Works well, worth the price.', '2024-05-29 15:00:00'),
(4, 18, 19, 3, 'Average product, nothing special.', '2024-05-28 10:00:00'),
(5, 6, 52, 5, 'Love it! Best purchase ever.', '2024-05-27 09:00:00'),
(6, 9, 1, 2, 'Disappointed with the quality.', '2024-05-26 11:00:00'),
(7, 4, 26, 5, 'Absolutely fantastic!', '2024-05-25 14:00:00'),
(8, 11, 37, 4, 'Great value for money.', '2024-05-24 13:00:00'),
(9, 6, 8, 3, 'Decent product, could be better.', '2024-05-23 16:00:00'),
(10, 8, 30, 5, 'Excellent product, highly recommended!', '2024-05-22 17:00:00'),
(11, 20, 40, 4, 'Satisfied with the purchase.', '2024-05-09 19:00:00'),
(12, 13, 55, 3, 'Not bad, but could be improved.', '2024-05-08 20:00:00'),
(13, 12, 2, 4, 'Impressed with the quality.', '2024-05-07 21:00:00'),
(14, 19, 49, 5, 'Highly recommend!', '2024-05-06 22:00:00'),
(15, 5, 63, 2, 'Not satisfied with the product.', '2024-05-05 23:00:00');

-- Example data for orders
INSERT INTO Orders (OrderID, UserID, OrderDate, ShippingAddress, PaymentMethod, TotalPrice, CouponID) VALUES
(1, 1, '2024-05-20 10:00:00', '123 Main St, City A', 'Credit Card', 80000, NULL),
(2, 2, '2024-05-21 11:30:00', '456 Oak St, City B', 'PayPal', 150000, 1),
(3, 3, '2024-05-22 14:45:00', '789 Pine St, City C', 'Credit Card', 110000, NULL),
(4, 4, '2024-05-23 16:00:00', '321 Maple St, City D', 'Debit Card', 60000, 2),
(5, 5, '2024-05-24 17:20:00', '654 Birch St, City E', 'Credit Card', 120000, NULL);

-- Example data for order items
INSERT INTO OrderItems (OrderItemID, OrderID, ProductID, Quantity, Price) VALUES
(1, 1, 1, 1, 30000),  -- Susan Family 4
(2, 1, 3, 2, 10000),  -- Cotton Milk
(3, 2, 21, 1, 250000),  -- Crop-top With Floral Appliqué
(4, 3, 6, 2, 43000),  -- Milk Cotton 125Gr
(5, 3, 7, 1, 30000),  -- Simply Yarn
(6, 4, 9, 1, 60000),  -- Capybara Wearing Orange
(7, 5, 27, 1, 120000), -- Bear Oatmeal Milk Satchel
(8, 5, 10, 1, 70000), -- Penguin Wearing Flower Hat
(9, 5, 12, 2, 50000), -- Mini Cute Bear
(10, 5, 5, 1, 22000); -- Baby Yarn



