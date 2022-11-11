const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  router.get('/', async (req, res) => {
      // find all tags
    try {
      const tagData = await Tag.findAll({
        include: [{ model: ProductTag },{ model: Product }],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });




  router.get('/:id', async (req, res) => {
    // find a single product by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag }, { model: Product }],
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


  // create a new Tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create({
        tag_name: req.body.tag_name,
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // update a Tag's name by its `id` value
  router.put('/:id', (req, res) => {
    Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        res.json(updatedTag);
      })
      .catch((err) => res.json(err));
  });

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

module.exports = router;
