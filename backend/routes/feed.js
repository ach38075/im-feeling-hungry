const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/recipes
router.get('/recipes', isAuth, feedController.getRecipes);

// POST /feed/recipe
router.post(
  '/recipe',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('image')
      .trim()
      .isLength({ min: 1 }),
    body('sourceUrl')
      .trim()
      .isLength({ min: 1 })
  ],
  feedController.createRecipe
);

// GET feed/recipe
router.get('/recipe/:recipeId', isAuth, feedController.getRecipe);

// PUT feed/recipe/recipeId
router.put(
  '/recipe/:recipeId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('image')
      .trim()
      .isLength({ min: 1 }),
    body('sourceUrl')
      .trim()
      .isLength({ min: 1 })
  ],
  feedController.updateRecipe
);


// DELETE feed/recipe/recipeId

router.delete('/recipe/:recipeId', isAuth, feedController.deleteRecipe);

module.exports = router;
