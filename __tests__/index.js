const supertest = require("supertest");
const server = require("../api/server");
// const db = require("../database/dbConfig");

//write test to make sure that jest finds this file
test("a placeholder test", () => {
	expect(2 + 2).toBe(4);
});

describe("dad-jokes integration tests", () => {
	it("GET / ", async () => {
		const res = await supertest(server).get("/api/");
		// console.log(res);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.message).toBe("Welcome to Sprint Challenge!");
	});

	//change the name everytime when run the test, otherwise the test will fail!
	it("POST /register", async () => {
		const res = await supertest(server)
			.post("/api/auth/register")
			.send({ username: "JamesBond1", password: "12345" });
		expect(res.statusCode).toBe(201);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.id).toBeDefined();
		expect(res.body.username).toBe("JamesBond1");
	});
});
