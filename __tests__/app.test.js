const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const db = require("../db/connection.js");
const { promises } = require("supertest/lib/test.js");

beforeEach(() => {
  return seed(data)
})
afterAll(() => {
  db.end()
})

describe("Global 404 No Endpoint test", () => {
  test("404: Responds with Not Found error if endpoint is incorrect", () => {
    return request(app)
    .get("/api/nopics")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not Found")
    })
  })
})
describe("2.GET/api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe("3.GET/api/topics", () => {
  test("200: Serves an array of all topics that contain a slug and description property", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({body}) => {
        const {topics} = body
        expect(topics).toBeInstanceOf(Array)
        expect(topics).toHaveLength(3)
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String)
            })
          )
        })
      })
  });
  describe("Errors", () => {
    test("405: responds with Method Not Allowed for unsupported methods", () => {
      const invalidMethods = ["post", "patch", "delete"]
      const promisesToTest = invalidMethods.map(method => {  
        return request(app)
        [method]("/api/topics")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe("Method Not Allowed");
        })
      });
      return Promise.all(promisesToTest)
    });
    test("418: responds with teapot message if called", () => {
      return request(app)
      .get("/api/teapot")
      .expect(418)
      .then(({body}) => {
        expect(body.msg).toBe("Yorkshire tea only :)")
      })
    })
  })  
})
describe("4.GET/api/articles/:article_id", () => {
  test("200: Serves a single article object by article_id", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({body}) => {
        const {article} = body
        expect(article).toStrictEqual({
          article_id: 4,
          title: "Student SUES Mitch!",
          topic: "mitch",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: expect.any(String),
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        })
      })
  })
  describe("Errors", () => {
    test("404: Responds with Article not found if Article ID Number doesn't match any in articles table", () => {
      return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("Article not found")
      })
    })
  })
  test("400: Responds with article_id is not a number if article-id is not a number", () => {
    return request(app)
    .get("/api/articles/blueberries")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("article_id is not a number")
    })
  })
});