const blogsRouter = require("express").Router();
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog");
const User = require("../models/user");

const populatedUserFields = { _id: 1, username: 1, name: 1 }

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  try {
    console.log("try to get all blogs");

    const blogs = await Blog.find({}).populate("user", populatedUserFields)
    console.log("fetched all blogs", blogs);
    response.json(blogs.map(Blog.format));
  } catch (exception) {
    console.log(exception);
    response.status(404).end();
  }
});

blogsRouter.get("/:id", (request, response) => {
  console.log("try to get blog", request.params.id);
  Blog.findById(request.params.id).populate("user", populatedUserFields)
    .then(queriedBlog => {
      if (queriedBlog) {
        response.json(Blog.format(queriedBlog));
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    console.log("try to remove blog", request.params.id);
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: "delete failed" });
  }
})

blogsRouter.post("/", async (request, response) => {
  try {
    console.log("creating blog", request.body);
    const body = request.body;

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined) {
      return response.status(400).json({ error: "title missing" });
    }
    // latest user inserted
    //const user = await User.findOne().sort('-created_at')
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    const createdBlog = await blog.save();

    user.blogs = user.blogs.concat(createdBlog._id)
    await user.save()

    response.status(201).json(Blog.format(createdBlog));
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: "create failed" });
  }
});

module.exports = blogsRouter;
