const listHelper = require("../utils/list_helper");
const listWithManyBlogs = require("./data")

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
];

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has many blogs equals the cimulative likes of those", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe("favoriteBlog", () => {
  test("when list is empty, null is returned", () => {
    const result = listHelper.favoriteBlog([]);
    console.log("RESULT", result);
    expect(result).toBeNull();
  });

  test("when list has only one blog the that is the faforite", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("when list has many blog then the one with most likes is the favorite", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);

    expect(result).toEqual(listWithManyBlogs[2]);
  });
});

describe("mostLikes", () => {
  test("when list has just one blog, writer of that has most likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toHaveProperty("author", "Edsger W. Dijkstra");
    expect(result).toHaveProperty("likes", 5)
  })
  test("when list has many blogs, most likes must be calculated", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toHaveProperty("author", "Edsger W. Dijkstra");
    expect(result).toHaveProperty("likes", 17)
  })
});
