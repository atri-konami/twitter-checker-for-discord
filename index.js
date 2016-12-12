'use strict'
const Eris = require('eris');
const Twitter = require('twitter');
const cred = require('./credential.json');
const shadow = require('./lib/shadowverse');
const Immutable = require('immutable');

const Dclient = new Eris(cred.discord.token);
const Tclient = new Twitter(cred.twitter.auth);

Dclient.on('ready', () => {
    console.log('ready!');
});

Dclient.on('messageCreate', (message) => {
    console.log(message);
    if (message.author.id == Dclient.user.id) return;
    let deckcode = /deck_code=([a-zA-Z0-9]{4})/.exec(message.content);
    const isMentioned = Immutable.Seq(message.mentions)
            .some((user) => user.id == Dclient.user.id );
    if (isMentioned && !message.mentionEveryone) {
        if (deckcode !== null) {
            shadow.getURLByDeckCode(deckcode[1])
                .then((url) => {
                    Dclient.createMessage(message.channel.id, `<@${message.author.id}> ${url}`);
                });
        } else {
            Dclient.createMessage(message.channel.id, `<@${message.author.id}> よくわかんないから殺す`);
        }
    } else {
    }
});

Dclient.connect()
.then(() => {
    Tclient.stream('statuses/filter', {follow: cred.twitter.users.values().join(',')}, (stream) => {
        stream.on('data', (tweet) => {
            console.log(tweet);
            if (/jcgjp/i.test(tweet.user.screen_name) && /shadowverse/i.test(tweet.text)
                || /gameai_jp/i.test(tweet.user.screen_name) && !tweet.retweeted) {
                const text = `from: @${tweet.user.screen_name}\n${tweet.text}`;
                Dclient.createMessage(cred.discord.channel_ids.information, text);
            }
        });

        stream.on('error', (err) => {
            console.log(err);
        });
    });
});
