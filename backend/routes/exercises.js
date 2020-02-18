const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// get return res
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercise => res.json(exercise)) //return the exercise
        .catch(err => res.status(400).json('Error:' + err));
});


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newUser = new Exercise({
        username,
        description,
        duration,
        date
    });

    newUser.save()
        .then(users => res.json('exercises added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => { res.json(exercise) })
        .catch(err => res.status(400).json('Error: ', err));
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => { res.json('Exercise Delete') })
        .catch(err => res.status(400).json('Error: ', err));
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => { res.json('Excersise Updated!') })
                .catch((err) => { res.status(400).json("Error: ", err) })
        })
        .catch((err) => { res.status(400).json("Error: ", err) })
})

module.exports = router;