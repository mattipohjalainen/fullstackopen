const supertest = require("supertest");
const { app, server } = require("../index");
const api = supertest(app);

const listWithManyBlogs = require("./data");
const Blog = require("../models/blog");
const { blogsInDb } = require("./test_helper");

describe("blog api get tests", async () => {
  beforeAll(async () => {
    console.log("beforeAll");
    await Blog.remove({});

    const blogObjects = listWithManyBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("number of blogs is", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body.length).toBe(6);
  });

  test("blogs contain react patterns blog", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "React patterns"
        })
      ])
    );
  });

  test("adding new blog by post", async () => {
    const title = "fullstackopen on ok";
    const fullstackOpen = {
      title: title,
      author: "Matti",
      url: "https://fullstackopen.github.io",
      likes: 0
    };
    const blogsBeforeOperation = await blogsInDb();
    await api
      .post("/api/blogs")
      .send(fullstackOpen)
      .expect(201);

    const blogsAfterOperation = await blogsInDb();

    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length + 1);
  });
  afterAll(async () => {
    console.log("after all");
    server.close();

    //await Blog.remove({});
    // async () => {
    //  await Blog.remove({});
    //}
    console.log("cleaned db");
  });
});
