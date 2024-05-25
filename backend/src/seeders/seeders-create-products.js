'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        ProductID: 1,
        Name: 'Susan Family 4',
        Description: 'Susan Family 4 premium Chinese domestic wool. Wool is hygroscopic, meaning it absorbs moisture from the air...',
        Price: 30000,
        CategoryID: 1
      },
      {
        ProductID: 2,
        Name: 'Susan Family 5',
        Description: 'Susan Family 5 wool is a larger version than Susan Family 4, and it is also made from premium Chinese domestic wool...',
        Price: 50000,
        CategoryID: 1
      },
      {
        ProductID: 3,
        Name: 'Cotton Milk',
        Description: 'Round, smooth, colorful yarn. Suitable for knitting and crocheting toys, bags, clothes, and amigurumi...',
        Price: 10000,
        CategoryID: 1
      },
      {
        ProductID: 4,
        Name: 'Cow Milk',
        Description: 'Cow milk wool is a type of wool that is quite soft, spongy, and easy to work with. It is available in a variety of colors...',
        Price: 14000,
        CategoryID: 1
      },
      {
        ProductID: 5,
        Name: 'Baby Yarn',
        Description: 'Baby Yarn, also called Baby Jeans wool, is top-quality acrylic yarn that is very soft and gentle on the skin. It is perfect for knitting and crocheting clothes, blankets, and accessories for babies and toddlers...',
        Price: 22000,
        CategoryID: 1
      },
      {
        ProductID: 6,
        Name: 'Milk Cotton 125Gr',
        Description: 'Cotton milk wool is used to knit scarves and crochet amigurumi, toys, and other home decor items. It is also a great choice for making baby clothes and accessories because it is soft and gentle on the skin...',
        Price: 43000,
        CategoryID: 1
      },
      {
        ProductID: 7,
        Name: 'Simply Yarn',
        Description: 'Recycled Cotton suitable hanging bags, hats, tote bags, and other projects. This yarn is eco-friendly and has a beautiful, natural texture...',
        Price: 30000,
        CategoryID: 1
      },
      {
        ProductID: 8,
        Name: 'SKC Flexible Crochet Hook',
        Description: 'SKC flexible crochet hook SKC flexible crochet hook hook for crocheting...',
        Price: 30000,
        CategoryID: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
