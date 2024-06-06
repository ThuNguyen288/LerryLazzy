USE woolshop
-- Create Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50),
    Password VARCHAR(50),
    Firstname VARCHAR(50),
    Lastname VARCHAR(50),
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Address VARCHAR(255),
    Role VARCHAR(50)
);

-- Create Coupons table
CREATE TABLE Coupons (
    CouponID INT PRIMARY KEY,
    Code VARCHAR(50),
    Discount DECIMAL(5, 2),
    ExpiryDate DATE
);

-- Create Orders table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    UserID INT,
    OrderDate DATETIME,
    ShippingAddress VARCHAR(255),
    PaymentMethod VARCHAR(100),
    TotalPrice DECIMAL(10, 2),
    CouponID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CouponID) REFERENCES Coupons(CouponID)
);

-- Create Status table
CREATE TABLE OrderStatus (
    StatusID INT PRIMARY KEY,
    StatusName VARCHAR(50)
);

-- Create OrderStatus table
CREATE TABLE OrderStatusHistory (
    OrderStatusID INT PRIMARY KEY,
    OrderID INT,
    StatusID INT,
    StatusDate DATETIME,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (StatusID) REFERENCES OrderStatus(StatusID)
);

-- Create Categories table
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    Name VARCHAR(100)
);

-- Create Subcategories table
CREATE TABLE Subcategories (
    SubcategoryID INT PRIMARY KEY,
    Name VARCHAR(100)
);

-- Create Products table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Name VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10, 2),
    CategoryID INT,
    SubcategoryID INT,
    Image VARBINARY(MAX),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (SubcategoryID) REFERENCES Subcategories(SubcategoryID)
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create Reviews table
CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY,
    UserID INT,
    ProductID INT,
    Rating INT,
    Comment TEXT,
    ReviewDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create Cart table
CREATE TABLE Cart (
    CartID INT PRIMARY KEY,
    UserID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create Favorite table
CREATE TABLE Favorite (
    FavoriteID INT PRIMARY KEY,
    UserID INT,
    ProductID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
