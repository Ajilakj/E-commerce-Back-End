const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


  router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const Data = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(driverData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


  // create a new category
  router.post('/', async (req, res) => {
    try {
      const locationData = await LibraryCard.create({
        reader_id: req.body.reader_id,
      });
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
