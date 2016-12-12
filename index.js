'use strict'
const Eris = require('eris');
const Twitter = require('twitter');
const cred = require('./credential.json');

const Dclient = new Eris(cred.discord.token);
const Tclient = new Twitter(cred.twitter.auth);

Dclient.connect()
.then(() => {
    Tclient.stream('statuses/filter', {follow: cred.twitter.users.values().join(',')}, (stream) => {
        stream.on('data', (tweet) => {
            if (/shadowverse/i.test(tweet.text)) {
                const text = `from: @${tweet.user.screen_name}\n${tweet.text}`;
                Dclient.createMessage(cred.discord.channel_ids.information, text);
                console.log(tweet);
            }
        });

        stream.on('error', (err) => {
            console.log(err);
        });
    });
});
