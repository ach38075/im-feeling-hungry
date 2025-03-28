const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Recipe = require('../models/search');
const User = require('../models/user');

exports.getRecipes = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Recipe.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Recipe.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(Recipe => {
      res.status(200).json({
        message: 'Fetched recipes successfully.',
        Recipe: Recipe,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createRecipe = (req, res, next) => {
  const errors = validationResult(req);

  if (!req.body.recipeNum) {
    const error = new Error('recipeNum must be provided in the request body.');
    error.statusCode = 401;
    throw error;
  }

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  if(!req.body.cost)
    req.body.cost = 0;

  if(!req.body.recipe)
    req.body.recipe = '';

  if(!req.body.region)
    req.body.region = '';

  let creator;
  const newRecipe = new Recipe({
    recipeNum: req.body.recipeNum,
    recipe: req.body.recipe,
    cost: req.body.cost,
    region: req.body.region,
    creator: req.userId
  });
  newRecipe
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.recipes.push(newRecipe);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Recipe created successfully!',
        newRecipe: newRecipe,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      if (!recipe) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Recipe fetched.', recipe: recipe });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  Recipe.findById(recipeId)
    .then(eachRecipe => {
      if (!eachRecipe) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }
      if (eachRecipe.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      eachRecipe.recipeNum = req.body.recipeNum;
      eachRecipe.recipe = req.body.recipe;
      eachRecipe.cost = req.body.cost;
      eachRecipe.region = req.body.region;
      return eachRecipe.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Recipe updated!', eachRecipe: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(eachRecipe => {
      if (!eachRecipe) {
        const error = new Error('Could not find recipe.');
        error.statusCode = 404;
        throw error;
      }
      if (eachRecipe.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      return Recipe.findByIdAndRemove(recipeId);
    })
    .then(result => {
      return User.findById(req.recipeId);
    })
    // .then(user => {
    //   user.recipes.pull(recipeId);
    //   return user.save();
    // })
    .then(result => {
      res.status(200).json({ message: 'Deleted recipe.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

