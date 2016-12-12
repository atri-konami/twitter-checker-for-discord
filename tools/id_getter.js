'use strict';

const Twitter = require('twitter');
const cred = require('../credential.json');

const client = new Twitter(cred.twitter.auth);

client.get('users/show', {screen_name: "GameAI_jp"}, (err, tweet, response) => {
    console.log(tweet.id_str);
});

