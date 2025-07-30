const express = require('express');
const controller = require('../controllers/tour.controller');

const router = express.Router(); // middleware

router.param('id', controller.validateID);

router.route('/')
    .get(controller.getAllTours)
    .post(controller.validateBody, controller.createTour);

router.route('/:id')
    .get(controller.getTour)
    .patch(controller.updateTour)
    .delete(controller.deleteTour);

module.exports = router;
