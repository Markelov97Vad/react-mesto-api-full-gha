const allowedCors = [
  // 'http://localhost:3001',
  // 'http://192.168.1.122:3001',
  'http://mesto.marsello.nomoredomains.monster',
  'https://mesto.marsello.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  // список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // обработка простых запросов CORS
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-Origin', '*');
  }
  // обработка предварительных запросов CORS
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
