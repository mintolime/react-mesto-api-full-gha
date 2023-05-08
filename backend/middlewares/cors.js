const allowedCors = require("../utils/constants/allowedCors");

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
   // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых 

  // const requestHeaders = req.headers['access-control-request-headers'];  
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  // предварительный запрос
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
