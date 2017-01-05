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
                    resolve({
                        link: `https://shadowverse-portal.com/deck/${body.data.hash}`,
                        image: `https://shadowverse-portal.com/image/${body.data.hash}`
                    });
                } else {
                    console.log(body.data);
                    reject(body.data);
                }
            })
        });
    }
}

module.exports = Shadowverse;
