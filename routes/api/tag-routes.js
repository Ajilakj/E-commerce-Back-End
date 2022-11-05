const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint

  router.get('/', async (req, res) => {
      // find all tags
  // be sure to include its associated Product data
    try {
      const tagData = await Tag.findAll({
        include: [{ model: Product }, { model: ProductTag }],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });




  router.get('/:id', async (req, res) => {
    // find a single product by its `id`
// be sure to include its associated Category and Tag data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create({
        reader_id: req.body.reader_id,
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // update a tag's name by its `id` value
  router.put('/:id', (req, res) => {
    // Calls the update method on the Book model
    Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        tag_name: req.body.tag_name
      },
      {
        // Gets the books based on the isbn given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        // Sends the updated book as a json response
        res.json(updatedTag);
      })
      .catch((err) => res.json(err));
  });

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found with that id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
