'use strict';
const request = require('request');
const Endpoint = 'https://shadowverse-portal.com/api/v1'

let Shadowverse = {
    getURLByDeckCode(code) {
        const url = `${Endpoint}/deck/import`;
        const qs = {
            format: 'json',
            deck_code: code,
            lang: 'ja'
        };
        return new Promise((resolve,reject) => {
            request.get(url, {qs: qs, json: true}, (err, res, body) => {
                if (body.data.hash) {
                    resolve(`https://shadowverse-portal.com/deck/${body.data.hash}`);
                } else {
                    console.log(err);
                    reject(err);
                }
            })
        });
    }
}

module.exports = Shadowverse;
