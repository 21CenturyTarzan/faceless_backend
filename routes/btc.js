const express = require("express");
const axios = require("axios");
const router = express.Router();
const CoinGecko = require('coingecko-api');

module.exports = function () {
    router.route("/getInvoice").post(function (req, res) {

        async function getReq() {
            const CoinGeckoClient = new CoinGecko();
            let data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
                coin_ids: ['bitcoin', 'ethereum']
            });
            var _coinList = {};
            var _datacc = data.data.tickers.filter(t => t.target == 'USD');
            [
                'BTC',
                'ETH'
            ].forEach((i) => {
                var _temp = _datacc.filter(t => t.base == i);
                var _res = _temp.length == 0 ? [] : _temp[0];
                _coinList[i] = _res.last;
            })

            let reqData = req.body.dataState;
            console.log(_coinList, reqData);
            let countAmount = reqData.amount * 1;
            if (reqData.coin == 2) {
                countAmount = reqData.amount * _coinList.ETH;
            }
            let price = countAmount / _coinList.BTC;
            const axiosClient = axios.create({
                baseURL: 'https://mainnet.demo.btcpayserver.org/',
                timeout: 5000,
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic WURkRGlSdkJrbnZMUGlQblpoN2tDVTE3WUN2eWJrQkhpSVJvUlYwN1ZaSA==',
                },
            });
            const invoiceCreation = {
                price: price,
                currency: 'BTC',
                orderId: 'something',
                itemDesc: 'item description',
                notificationUrl: 'https://webhook.after.checkout.com/goeshere',
                redirectURL: 'https://go.here.after.checkout.com',
            };
            const response = await axiosClient.post('/invoices', invoiceCreation);
            const invoiceId = response.data.data.id;
            res.send({ state: "success", invoiceId: invoiceId });
        }
        getReq();
    });
    return router;
}