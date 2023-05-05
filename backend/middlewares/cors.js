const allowedCors = [
  'http://mesto.marsello.nomoredomains.monster',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  // список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // обработка простых запросов CORS
  if (allowedCors.includes(origin)) {
    // res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');
  }
  // обработка предварительных запросов CORS
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
