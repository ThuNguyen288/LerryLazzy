
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
(1, 'john_doe', 'password_123', 'John', 'Doe', '123456789', 'john.doe@example.com', '123 Main St, City', 'customer'),
(2, 'jane_smith', 'pass123', 'Jane', 'Smith', '987654321', 'jane.smith@example.com', '456 Elm St, Town', 'customer'),
(3, 'michael_johnson', 'mike1234', 'Michael', 'Johnson', '555123456', 'michael.johnson@example.com', '789 Oak St, Village', 'customer'),
(4, 'emily_brown', 'emily_pass', 'Emily', 'Brown', '111222333', 'emily.brown@example.com', '101 Pine St, Hamlet', 'customer'),
(5, 'sarah_davis', 'sarah@pass', 'Sarah', 'Davis', '444555666', 'sarah.davis@example.com', '202 Cedar St, Borough', 'customer'),
(6, 'david_garcia', 'garcia123', 'David', 'Garcia', '777888999', 'david.garcia@example.com', '303 Maple St, Township', 'customer'),
(7, 'jessica_martinez', 'jess_pass', 'Jessica', 'Martinez', '999888777', 'jessica.martinez@example.com', '404 Birch St, District', 'customer'),
(8, 'matthew_rodriguez', 'matt456', 'Matthew', 'Rodriguez', '666333111', 'matthew.rodriguez@example.com', '505 Walnut St, Territory', 'customer'),
(9, 'andrew_wilson', 'andrewww', 'Andrew', 'Wilson', '222333444', 'andrew.wilson@example.com', '606 Oak St, Province', 'customer'),
(10, 'emma_anderson', 'emma_pass', 'Emma', 'Anderson', '444333222', 'emma.anderson@example.com', '707 Pine St, Sector', 'customer'),
(11, 'james_taylor', 'jamest_pass', 'James', 'Taylor', '999111444', 'james.taylor@example.com', '808 Cedar St, Division', 'customer'),
(12, 'olivia_thomas', 'olivia_pass', 'Olivia', 'Thomas', '888222555', 'olivia.thomas@example.com', '909 Elm St, Precinct', 'customer'),
(13, 'william_hernandez', 'will123', 'William', 'Hernandez', '555777999', 'william.hernandez@example.com', '123 Oak Ave, Municipality', 'customer'),
(14, 'ava_moore', 'ava456', 'Ava', 'Moore', '333777111', 'ava.moore@example.com', '456 Pine Ave, Parish', 'customer'),
(15, 'daniel_martin', 'daniel_pass', 'Daniel', 'Martin', '222444666', 'daniel.martin@example.com', '789 Elm Ave, Canton', 'customer'),
(16, 'sophia_gonzalez', 'sophia_pass', 'Sophia', 'Gonzalez', '111999333', 'sophia.gonzalez@example.com', '101 Maple Ave, Shire', 'customer'),
(17, 'benjamin_white', 'white_pass', 'Benjamin', 'White', '888444222', 'benjamin.white@example.com', '202 Birch Ave, Dominion', 'customer'),
(18, 'isabella_hall', 'hall@pass', 'Isabella', 'Hall', '777555333', 'isabella.hall@example.com', '303 Oak Ave, Commonwealth', 'customer'),
(19, 'alexander_allen', 'alex123', 'Alexander', 'Allen', '444666888', 'alexander.allen@example.com', '404 Pine Ave, Territory', 'customer'),
(20, 'mia_young', 'mia456', 'Mia', 'Young', '111222333', 'mia.young@example.com', '505 Elm Ave, Region', 'customer');

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

