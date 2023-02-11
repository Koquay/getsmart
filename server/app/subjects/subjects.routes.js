const router = require('express').Router();
const { authenticateUser } = require('../user/user.service');
const subjectsController = require('./subjects.controller');

router.get('/', subjectsController.getDistinctGradeLevels)
router.get('/:grade', subjectsController.getSubjectsForGrade)
router.get('/subjectId/:subjectId', subjectsController.getTopicsForSubject)
// router.get('/search/', authenticateUser, categoriesController.doSearch)
// router.post('/', authenticateUser, categoriesController.addCategory)
// router.post('/site', authenticateUser, categoriesController.addSite)
// router.post('/site/bookmark', authenticateUser, categoriesController.addBookmark);
// router.delete('/:categoryId/:siteId/:bookmarksForDelete', authenticateUser, categoriesController.deleteBookmarks);
// router.delete('/bookmarks', authenticateUser, categoriesController.deleteBookmarks);
// router.delete('/:categoryId', authenticateUser, categoriesController.deleteCategory);
// router.delete('/:categoryId/:siteId', authenticateUser, categoriesController.deleteSite);


module.exports = router;