const express = require("express");
const axios = require("axios");
const router = express.Router();

module.exports = function () {
    router.route("/getInvoice").post(function (req, res) {
        async function getReq () {
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
              price: 2,
              currency: 'BTC',
              orderId: 'something',
              itemDesc: 'item description',
              notificationUrl: 'https://webhook.after.checkout.com/goeshere',
              redirectURL: 'https://go.here.after.checkout.com',
            };
            const response = await axiosClient.post('/invoices', invoiceCreation);
            const invoiceId = response.data.data.id;
            console.log(invoiceId);
            res.send({ state: "success", invoiceId: invoiceId });
          }
          getReq();
    });
    return router;
}