const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post('/api/workouts', (req, res) => {
  Workout.create({}).then((workoutDB) => {
      res.json(workoutDB);
    }).catch((err) => {
      res.json(err);
    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, validation: true }
  ).then((workoutDB) => {
      res.json(workoutDB);
    }).catch((err) => {
      res.json(err);
    });
});

router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        duration: {
          $sum: '$exercises.duration',
        }
      }
    }
  ]).then((workoutDB) => {
      res.json(workoutDB);
    }).catch((err) => {
      res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        }
      }
    }
  ])
    .sort({ _id: -1 })
    .limit(10)
    .then((workoutDB) => {
      console.log(workoutDB);
      res.json(workoutDB);
    }).catch((err) => {
      res.json(err);
    });
});

router.delete('/api/workouts', ({ body }, res) => {
  Workout.findByIdAndDelete(body.id).then(() => {
      res.json(true);
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;
