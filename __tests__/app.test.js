const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed.js");
const app = require("../app/app.js");
const db = require("../db/connection.js")

beforeEach(() => {
  return seed(data)
})
afterAll(() => {
  db.end()
})

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: serves an array of all topics that contain a slug and description property", () => {
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
})
describe("Error Handling Tests", () => {
  test("404: responds with Not Found error if endpoint is incorrect", () => {
    return request(app)
    .get("/api/nopics")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not Found")
    })
  })
  test("405: responds with Method Not Allowed for unsupported methods", () => {
    return request(app)
    .post("/api/topics") 
    .expect(405)
    .then(({ body }) => {
      expect(body.msg).toBe("Method Not Allowed");
    });
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
  