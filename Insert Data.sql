
-- Insert data into Categories table
INSERT INTO Categories (CategoryID, Name)
VALUES (1, 'Wool'),
       (2, 'Product'),
       (3, 'Material'),
       (4, 'Set');

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
INSERT INTO Products (ProductID, Name, Description, Price, CategoryID)
VALUES (1, 'Susan Family 4', 'Susan Family 4 premium Chinese domestic wool. Wool is hygroscopic, meaning it absorbs moisture from the air...', 30000, 1),
       (2, 'Susan Family 5', 'Susan Family 5 wool is a larger version than Susan Family 4, and it is also made from premium Chinese domestic wool...', 50000, 1),
       (3, 'Cotton Milk', 'Round, smooth, colorful yarn. Suitable for knitting and crocheting toys, bags, clothes, and amigurumi...', 10000, 1),
       (4, 'Cow Milk', 'Cow milk wool is a type of wool that is quite soft, spongy, and easy to work with. It is available in a variety of colors...', 14000, 1),
       (5, 'Baby Yarn', 'Baby Yarn, also called Baby Jeans wool, is top-quality acrylic yarn that is very soft and gentle on the skin. It is perfect for knitting and crocheting clothes, blankets, and accessories for babies and toddlers...', 22000, 1),
       (6, 'Milk Cotton 125Gr', 'Cotton milk wool is used to knit scarves and crochet amigurumi, toys, and other home decor items. It is also a great choice for making baby clothes and accessories because it is soft and gentle on the skin...', 43000, 1),
       (7, 'Simply Yarn', 'Recycled Cotton suitable hanging bags, hats, tote bags, and other projects. This yarn is eco-friendly and has a beautiful, natural texture...', 30000, 1),
       (8, 'SKC Flexible Crochet Hook', 'SKC flexible crochet hook SKC flexible crochet hook hook for crocheting...', 30000, 3);
