// netlify/functions/get-monitor.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const url = "webuntis.com";

  try {
    const response = await fetch(url);
    const html = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Erlaubt deiner App den Zugriff
        "Content-Type": "text/html"
      },
      body: html
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
