const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
  router.get('/', async (req, res) => {
    try {
      const productData = await Product.findAll({
      });
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get one product
  router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No product found with that id!' });
        return;
      }
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create({
      product_name: req.body.product_name,
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', (req, res) => {
  Product.update(
    {
      product_name: req.body.product_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => res.json(err));
});


  // delete one product by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const productData = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No library card found with that id!' });
        return;
      }
  
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
