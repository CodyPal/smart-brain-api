const Clarifai = require('clarifai');

//import api key
const app = new Clarifai.App({
  apiKey: '6897e5bcd138459a9bbe6bfbbf2e33b2'
});

const handleApiCall = (req, res) => {
 app.models.predict('d02b4508df58432fbb84e800597b8959', req.body.input)
 .then(data => {
 	res.json(data);
 })
 .catch(err => res.status(400).json('unable to connect to api'))
}

const handleImage = (req, res, db) => {
const { id } = req.body; 
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage:handleImage,
	handleApiCall: handleApiCall
}