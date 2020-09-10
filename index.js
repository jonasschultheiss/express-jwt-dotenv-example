const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');
dotenv.config();

const app = express();

const jsonParser = bodyparser.json();
app.use(jsonParser);

const jwtSecret = process.env.JWT_SECRET;

const jwtMiddleware = async (req, res, next) => {
  const { accesstoken } = req.headers;
  let gg;

  try {
    token = await jsonwebtoken.verify(accesstoken, jwtSecret);
  } catch (error) {
    res.status(401);
    res.send();
  }

  if (token) {
    const { userId, username } = token;
    req.user = { userId, username };

    next();
  } else {
    res.status(500);
    res.send();
  }
};

app.post('/signUp', async (req, res) => {
  const { username, password } = req.body;
  const accessToken = await jsonwebtoken.sign({ userId: 1, username }, jwtSecret, { expiresIn: '1h' });
  res.json({ accessToken });
});

app.post('/user', jwtMiddleware, async (req, res) => {
  console.log(req.user);

  const { userId, username } = token;

  res.send();
});

app.listen(3001);
