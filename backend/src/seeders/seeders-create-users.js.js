'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    await queryInterface.bulkInsert('Users', [
      { 
        Username: 'tramyvu6603',
        Password: '123456789',
        Firstname: 'Tra My',
        Lastname: 'Vu',
        Phone: '334280050',
        Email: 'tramyvu6603@gmail.com',
        Address: '123 Hoang Huu Nam Street',
        Role: 'admin',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'thuthu',
        Password: '987654321',
        Firstname: 'Kim Thu',
        Lastname: 'Nguyen Thi',
        Phone: '123456789',
        Email: 'thuthu@example.com',
        Address: '456 Demo Street',
        Role: 'admin',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'john_doe',
        Password: 'password_123',
        Firstname: 'John',
        Lastname: 'Doe',
        Phone: '123456789',
        Email: 'john.doe@example.com',
        Address: '123 Main St, City',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'jane_smith',
        Password: 'pass123',
        Firstname: 'Jane',
        Lastname: 'Smith',
        Phone: '987654321',
        Email: 'jane.smith@example.com',
        Address: '456 Elm St, Town',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'michael_johnson',
        Password: 'mike1234',
        Firstname: 'Michael',
        Lastname: 'Johnson',
        Phone: '555123456',
        Email: 'michael.johnson@example.com',
        Address: '789 Oak St, Village',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        Username: 'emily_brown',
        Password: 'emily_pass',
        Firstname: 'Emily',
        Lastname: 'Brown',
        Phone: '111222333',
        Email: 'emily.brown@example.com',
        Address: '101 Pine St, Hamlet',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'sarah_davis',
        Password: 'sarah@pass',
        Firstname: 'Sarah',
        Lastname: 'Davis',
        Phone: '444555666',
        Email: 'sarah.davis@example.com',
        Address: '202 Cedar St, Borough',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        Username: 'david_garcia',
        Password: 'garcia123',
        Firstname: 'David',
        Lastname: 'Garcia',
        Phone: '777888999',
        Email: 'david.garcia@example.com',
        Address: '303 Maple St, Township',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'jessica_martinez',
        Password: 'jess_pass',
        Firstname: 'Jessica',
        Lastname: 'Martinez',
        Phone: '999888777',
        Email: 'jessica.martinez@example.com',
        Address: '404 Birch St, District',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'matthew_rodriguez',
        Password: 'matt456',
        Firstname: 'Matthew',
        Lastname: 'Rodriguez',
        Phone: '666333111',
        Email: 'matthew.rodriguez@example.com',
        Address: '505 Walnut St, Territory',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'andrew_wilson',
        Password: 'andrewww',
        Firstname: 'Andrew',
        Lastname: 'Wilson',
        Phone: '222333444',
        Email: 'andrew.wilson@example.com',
        Address: '606 Oak St, Province',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        Username: 'emma_anderson',
        Password: 'emma_pass',
        Firstname: 'Emma',
        Lastname: 'Anderson',
        Phone: '444333222',
        Email: 'emma.anderson@example.com',
        Address: '707 Pine St, Sector',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'james_taylor',
        Password: 'jamest_pass',
        Firstname: 'James',
        Lastname: 'Taylor',
        Phone: '999111444',
        Email: 'james.taylor@example.com',
        Address: '808 Cedar St, Division',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'olivia_thomas',
        Password: 'olivia_pass',
        Firstname: 'Olivia',
        Lastname: 'Thomas',
        Phone: '888222555',
        Email: 'olivia.thomas@example.com',
        Address: '909 Elm St, Precinct',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'william_hernandez',
        Password: 'will123',
        Firstname: 'William',
        Lastname: 'Hernandez',
        Phone: '555777999',
        Email: 'william.hernandez@example.com',
        Address: '123 Oak Ave, Municipality',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'ava_moore',
        Password: 'ava456',
        Firstname: 'Ava',
        Lastname: 'Moore',
        Phone: '333777111',
        Email: 'ava.moore@example.com',
        Address: '456 Pine Ave, Parish',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'daniel_martin',
        Password: 'daniel_pass',
        Firstname: 'Daniel',
        Lastname: 'Martin',
        Phone: '222444666',
        Email: 'daniel.martin@example.com',
        Address: '789 Elm Ave, Canton',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'sophia_gonzalez',
        Password: 'sophia_pass',
        Firstname: 'Sophia',
        Lastname: 'Gonzalez',
        Phone: '111999333',
        Email: 'sophia.gonzalez@example.com',
        Address: '101 Maple Ave, Shire',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'benjamin_white',
        Password: 'white_pass',
        Firstname: 'Benjamin',
        Lastname: 'White',
        Phone: '888444222',
        Email: 'benjamin.white@example.com',
        Address: '202 Birch Ave, Dominion',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'isabella_hall',
        Password: 'hall@pass',
        Firstname: 'Isabella',
        Lastname: 'Hall',
        Phone: '777555333',
        Email: 'isabella.hall@example.com',
        Address: '303 Oak Ave, Commonwealth',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'alexander_allen',
        Password: 'alex123',
        Firstname: 'Alexander',
        Lastname: 'Allen',
        Phone: '444666888',
        Email: 'alexander.allen@example.com',
        Address: '404 Pine Ave, Territory',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      { 
        Username: 'mia_young',
        Password: 'mia456',
        Firstname: 'Mia',
        Lastname: 'Young',
        Phone: '111222333',
        Email: 'mia.young@example.com',
        Address: '505 Elm Ave, Region',
        Role: 'customer',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
