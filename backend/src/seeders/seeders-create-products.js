'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    try {
      await queryInterface.bulkInsert('Products', [
        {
          Name: 'Susan Family 4',
          Description: 'Susan Family 4 premium Chinese domestic wool. Wool is hygroscopic, meaning it absorbs moisture from the air...',
          Price: 30000,
          CategoryID: 1,
          SubcategoryID: null,
          Image: '/images/wools/susan-family-4.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Susan Family 5',
          Description: 'Susan Family 5 wool is a larger version than Susan Family 4, and it is also made from premium Chinese domestic wool...',
          Price: 50000,
          CategoryID: 1,
          SubcategoryID: null,
          Image:  '/images/wools/susan-family-5.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Cotton Milk',
          Description: 'Round, smooth, colorful yarn. Suitable for knitting and crocheting toys, bags, clothes, and amigurumi...',
          Price: 10000,
          CategoryID: 1, 
          SubcategoryID: null,
          Image:  '/images/wools/cotton-milk.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Milk Cotton Poly',
          Description: 'Cow milk wool is a type of wool that is quite soft, spongy, and easy to work with. It is available in a variety of colors...',
          Price: 14000,
          CategoryID: 1,
          SubcategoryID: null,
          Image:  '/images/wools/cow-milk.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Baby Yarn',
          Description: 'Baby Yarn, also called Baby Jeans wool, is top-quality acrylic yarn that is very soft and gentle on the skin. It is perfect for knitting and crocheting clothes, blankets, and accessories for babies and toddlers...',
          Price: 22000,
          CategoryID: 1,
          SubcategoryID: null,
          Image:  '/images/wools/baby-yarn.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Milk Cotton 125Gr',
          Description: 'Cotton milk wool is used to knit scarves and crochet amigurumi, toys, and other home decor items. It is also a great choice for making baby clothes and accessories because it is soft and gentle on the skin...',
          Price: 43000,
          CategoryID: 1,
          SubcategoryID: null,
          Image:  '/images/wools/milk-cotton-125gr.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Simply Yarn',
          Description: 'Recycled Cotton suitable hanging bags, hats, tote bags, and other projects. This yarn is eco-friendly and has a beautiful, natural texture...',
          Price: 30000,
          CategoryID: 1,
          SubcategoryID: null,
          Image:  '/images/wools/simply-yarn.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Liliarge Cotton',
          Description: 'Korean milk cotton wool, 25 gram super soft Korean baby wool roll for knitting beginners...',
          Price: 15000,
          CategoryID: 1,
          SubcategoryID: null,
          Image:  '/images/wools/liliarge-cotton.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Capybara Wearing Orange',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 1,
          Image:  '/images/products/animal/capybara-wear-orange.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Penguin Wearing Flower Hat',
          Description: '...',
          Price: 70000,
          CategoryID: 2,
          SubcategoryID: 1,
          Image:  '/images/products/animal/penguin-wear-flower-hat.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Black Cat Cute',
          Description: '...',
          Price: 55000,
          CategoryID: 2,
          SubcategoryID: 1,
          Image:  '/images/products/animal/black-cat.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Mini Cute Bear',
          Description: '...',
          Price: 50000,
          CategoryID: 2,
          SubcategoryID: 1,
          Image:  '/images/products/animal/mini-bear.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Tulip',
          Description: '...',
          Price: 25000,
          CategoryID: 2,
          SubcategoryID: 2,
          Image:  '/images/products/plant/tulip.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Red Rose',
          Description: '...',
          Price: 30000,
          CategoryID: 2,
          SubcategoryID: 2,
          Image:  '/images/products/plant/red-rose.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Cactus',
          Description: '...',
          Price: 30000,
          CategoryID: 2,
          SubcategoryID: 2,
          Image:  '/images/products/plant/cactus.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Carrot Garden',
          Description: '...',
          Price: 70000,
          CategoryID: 2,
          SubcategoryID: 2,
          Image:  '/images/products/plant/carrot-garden.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Thai Pineapple Fried Rice',
          Description: '...',
          Price: 50000,
          CategoryID: 2,
          SubcategoryID: 3,
          Image:  '/images/products/food/thai-pinapple-fried-rice.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Mango Cake Roll',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 3,
          Image:  '/images/products/food/mango-cake-roll.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Sea Salt Oreo Cake Roll',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 3,
          Image:  '/images/products/food/oreo-cake-roll.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Matcha Strawberry Cake Roll',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 3,
          Image:  '/images/products/food/matcha-strawberry-cake-roll.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Crop-top With Floral Appliqué',
          Description: '...',
          Price: 250000,
          CategoryID: 2,
          SubcategoryID: 4,
          Image:  '/images/products/cloth/croptop-floral.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Rose Halter Top',
          Description: '...',
          Price: 280000,
          CategoryID: 2,
          SubcategoryID: 4,
          Image:  '/images/products/cloth/rose-halter-top.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Bear Face Hamburger Dress Set',
          Description: '...',
          Price: 600000,
          CategoryID: 2,
          SubcategoryID: 4,
          Image:  '/images/products/cloth/hamburger-dress-set.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Vintage Cardigan',
          Description: '...',
          Price: 450000,
          CategoryID: 2,
          SubcategoryID: 4,
          Image:  '/images/products/cloth/vintage-cardigan.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Capybara Hair Clip',
          Description: '...',
          Price: 20000,
          CategoryID: 2,
          SubcategoryID: 5,
          Image:  '/images/products/accessory/capybara-hair-clip.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Hangyodon Hair Clip',
          Description: '...',
          Price: 20000,
          CategoryID: 2,
          SubcategoryID: 5,
          Image:  '/images/products/accessory/hangyodon-hair-clip.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Milky Woven Bag',
          Description: '...',
          Price: 150000,
          CategoryID: 2,
          SubcategoryID: 5,
          Image:  '/images/products/accessory/milky-woven-bag.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Bear Oatmeal Milk Satchel',
          Description: '...',
          Price: 120000,
          CategoryID: 2,
          SubcategoryID: 5,
          Image:  '/images/products/accessory/bear-oatmeal-milk-satchel.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Christmas Dumpling',
          Description: '...',
          Price: 75000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/christmas-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Christmas Hat Candy Dumpling',
          Description: '...',
          Price: 65000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/christmas-hat-candy-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Christmas Tree Dumpling',
          Description: '...',
          Price: 80000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/christmas-tree-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Christmas Tree Dumpling (Ver 2)',
          Description: '...',
          Price: 65000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/christmas-tree-dumpling-ver2.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Christmas Tree Dumpling (Ver 3)',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/christmas-tree-dumpling-ver3.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Christmas Wreath Dumpling',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/christmas-wreath-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Elk Dumpling',
          Description: '...',
          Price: 55000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/elk-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Fortune Boy Dumpling',
          Description: '...',
          Price: 65000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/fortune-boy-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Frog Dumpling',
          Description: '...',
          Price: 55000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/frog-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'God Of Wealth Dumpling',
          Description: '...',
          Price: 50000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/god-of-wealth-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Lantern Dumpling',
          Description: '...',
          Price: 50000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/lantern-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Lion-Dance Head Dumpling',
          Description: '...',
          Price: 80000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/lion-dance-head-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Lucky Bag Dumpling',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/lucky-bag-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'New Year Dragon Dumpling',
          Description: '...',
          Price: 95000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/new-year-dragon-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'New Year Dumpling',
          Description: '...',
          Price: 50000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/new-year-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Peach Dumpling',
          Description: '...',
          Price: 50000, 
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/peach-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Poppy Dumpling',
          Description: '...',
          Price: 70000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/poppy-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Sailor Moon Dumpling',
          Description: '...',
          Price: 55000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/sailor-moon-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Santa Claus Dumpling',
          Description: '...',
          Price: 70000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/santa-claus-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Santa Claus Dumpling (Ver 2)',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/santa-claus-dumpling-ver2.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Snowman Dumpling',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/snowman-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Spend Money Bag Dumpling',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/spend-money-bag-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Spend Money Flower Dumpling',
          Description: '...',
          Price: 70000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/spend-money-flower-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Tuxedo Mask Dumpling',
          Description: '...',
          Price: 60000,
          CategoryID: 2,
          SubcategoryID: 6,
          Image:  '/images/products/mochi/tuxedo-mask-dumpling.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Phone Case With Floral Pattern',
          Description: '...',
          Price: 80000,
          CategoryID: 2,
          SubcategoryID: 7,
          Image:  '/images/products/other/phone-case-flower.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Flower Shaped Coaster',
          Description: '...',
          Price: 25000,
          CategoryID: 2,
          SubcategoryID: 7,
          Image:  '/images/products/other/flower-shaped-coaster.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Toilet Paper Keychain',
          Description: '...',
          Price: 15000,
          CategoryID: 2,
          SubcategoryID: 7,
          Image:  '/images/products/other/toilet-paper-keychain.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Angel And Devil Heart',
          Description: '...',
          Price: 40000,
          CategoryID: 2,
          SubcategoryID: 7,
          Image:  '/images/products/other/angel-devil-heart.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Wool Sewing Needle',
          Description: 'Used to hide excess wool inside the product.',
          Price: 2000,
          CategoryID: 3,
          SubcategoryID: null,
          Image:  '/images/materials/wool-sewing.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Silver Teardrop Clip',
          Description: 'Silver teardrop clip is often used in fashion accessories, handmade products.',
          Price: 10000,
          CategoryID: 3,
          SubcategoryID: null,
          Image:  '/images/materials/teardrop-clip.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Tape Needle Mark',
          Description: 'Tape-shaped wool felt with plastic material, colorful eye-catching. Used to mark stitches and rows when hooking.',
          Price: 5000,
          CategoryID: 3,
          SubcategoryID: null,
          Image:  '/images/materials/tape-needle-mark.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Animal Eyes With Safety Latch',
          Description: 'Animal eyes are made of plastic material, which is used to make crocheted animal eyes very convenient.',
          Price: 10000,
          CategoryID: 3,
          SubcategoryID: null,
          Image:  '/images/materials/animal-eye.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'SKC Flexible Crochet Hook',
          Description: 'SKC flexible crochet hook SKC flexible crochet hook hook for crocheting...',
          Price: 30000,
          CategoryID: 4,
          SubcategoryID: null,
          Image:  '/images/tools/skc-crochet-hook.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Clover Japanese Domestic Hook',
          Description: 'Clover Japanese domestic crochet hooks are designed standardly and accurately from needle to handle to help prevent hand fatigue and slipping when crocheting continuously.',
          Price: 180000,
          CategoryID: 4,
          SubcategoryID: null,
          Image:  '/images/tools/clover-crochet-hook.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'Tulip Rose Etimo Hook',
          Description: 'Tulip imitation crochet hook set There are two types of Tulip imitation crochet hook set : a dark pink set for crocheting wool, and a light pink set for crocheting yarn.',
          Price: 160000,
          CategoryID: 4,
          SubcategoryID: null,
          Image:  '/images/tools/tulip-crochet-hook.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
        {
          Name: 'That Cham Phuong Domestic Hook',
          Description: '...',
          Price: 200000,
          CategoryID: 4,
          SubcategoryID: null,
          Image:  '/images/tools/tcp-crochet-hook.png',
          createdAt: currentDate,
          updatedAt: currentDate
        },
      ], {});
      console.log('Products inserted successfully.');
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Products', null, {});
      console.log('Products deleted successfully.');
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  }
};
