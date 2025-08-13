const express = require('express');
const controller = require('../controllers/tour.controller');

const router = express.Router(); // middleware

// router.param('id', controller.validateID);

router.route('/top-5-cheap')
    .get(controller.aliasTopTours, controller.getAllTours);

router.route('/stats')
    .get(controller.getToursStats);

router.route('/monthly-plan/:year')
    .get(controller.getMonthlyPlan);

router.route('/')
    .get(controller.getAllTours)
    .post(controller.createTour);

router.route('/:id')
    .get(controller.getTour)
    .patch(controller.updateTour)
    .delete(controller.deleteTour);

module.exports = router;
