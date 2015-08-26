var express = require('express');
var router = express.Router();
var dogArr = [];
var peopleArr = [];

router.get('/', function (req, res, next) {
  res.render('index', {
    puppy: 'Add A Puppy!',
    person: 'Add A Person!'
  });
});

router.post('/puppies', function (req, res, next) {
  // // returns inputed name
  // console.log(req.body.dogName);
  // // return inputed ID
  // console.log(req.body.dogID);
  var puppyName = req.body.dogName;
  var puppyID = req.body.dogID;
  // var newDog = {name: puppyName, ID: puppyID};
  // dogArr.push(newDog);

  var errors = puppyValidation(puppyName, puppyID);

  if (errors.length > 0) {
    res.render('index', {
      errors: errors,
      puppy: 'Add A Puppy!',
      person: 'Add A Person!'
    });
  } else {
    dogArr.push({
      name: puppyName,
      ID: puppyID
    });

    res.render('tables', {
      puppy: 'Showing Puppies',
      person: 'Showing People',
      puppies: dogArr,
      people: peopleArr,
      success: 'Your item was saved successfully!'
    });
  }

});

router.post('/people', function (req, res, next) {
  var personName = req.body.personName;
  var personHobby = req.body.personHobby;

  var errors = peopleValidation(personName, personHobby);

  if (errors.length > 0) {
    res.render('index', {
      errors: errors,
      puppy: 'Add A Puppy!',
      person: 'Add A Person!'
    });
  } else {
    peopleArr.push({
      name: personName,
      hobby: personHobby
    });

    res.render('tables', {
      puppy: 'Showing Puppies',
      person: 'Showing People',
      people: peopleArr,
      puppies: dogArr,
      success: 'Your item was saved successfully!'
    });
  }

});

function puppyValidation (dogName, dogID) {
  var errorArr = [];
  var dogNameTrimmed = dogName.trim();
  var dogIDTrimmed = dogID.trim();

  // name validation
  if (dogNameTrimmed === '') {
    errorArr.push('Name cannot be blank.');
  }

  // id validation
  if (dogIDTrimmed === '') {
    errorArr.push('ID cannot be blank.');
  } else if (dogIDTrimmed < 3) {
    errorArr.push('ID must be at least 3 characters long.');
  }

  return errorArr;
}

function peopleValidation (personName, personHobby) {
  var errorArr = [];
  var personNameTrimmed = personName.trim();
  var personHobbyTrimmed = personHobby.trim();

  // name validation
  if (personNameTrimmed === '') {
    errorArr.push('Name cannot be blank.');
  }

  // id validation
  if (personHobbyTrimmed === '') {
    errorArr.push('Hobby cannot be blank.');
  }

  return errorArr;
}

module.exports = router;
