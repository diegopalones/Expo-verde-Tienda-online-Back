const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')


router.post('/',CategoryController.create)
router.put('/updateCategoryById/:id',CategoryController.updateCategory)
router.delete('/deleteCategoryById/:id',CategoryController.deleteCategory)
router.get('/getAllCategories', CategoryController.getAllCategories)
router.get('/getCategoriesAndProducts', CategoryController.getCategoriesAndProducts)
router.get('/getCategoryByName/:name',CategoryController.getCategoryByName)
router.get('/getCategoryById/:id',CategoryController.getCategoryById)



module.exports = router;

