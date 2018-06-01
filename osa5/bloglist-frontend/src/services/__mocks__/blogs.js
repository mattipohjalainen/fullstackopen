const blogs = [
    {
        _id: "5a43fde2cbd20b12a2c34e91",
        user: {
          _id: "5a43e6b6c37f3d065eaaa581",
          username: "mluukkai",
          name: "Matti Luukkainen"
        },
        likes: 0,
        author: "Joel Spolsky",
        title: "The Joel Test: 12 Steps to Better Code",
        url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
      }
]

const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll, blogs }