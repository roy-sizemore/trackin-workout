const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: 'Please enter an exercise (weight training, treadmill, etc.)',
      },
      name: {
        type: String,
        trim: true,
        required: 'Please enter a name for this exercise',
      },
      duration: {
        type: Number,
        required: 'Please enter a scheduled duration in minutes',
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
