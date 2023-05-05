const { PORT = 3000, DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

// JWT для разработки
const JWT_SECRET_DEV = 'some-secret-key';
// ID для разработки
const ID_DEV = '6453eb794cc906a7f9131c00';

const regexUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET_DEV,
  ID_DEV,
  regexUrl,
};
