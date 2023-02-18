import supertest from "supertest";
import server from "../server";

describe("server", () => {
  it("health check returns 200", async () => {
    await supertest(server.server)
      .get("/health")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });

  // it("message endpoint says hello", async () => {
  //   await supertest(server)
  //     .get("/message/jared")
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body).toEqual({ message: "hello jared" });
  //     });
  // });
});
