const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

const populatedBlogFields = { _id: 1, likes: 1, author: 1, title: 1, url: 1 }

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", populatedBlogFields)
  response.json(users.map(User.format));
});

usersRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(User.format(savedUser));
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: "something went wrong..." });
  }
});

module.exports = usersRouter;
