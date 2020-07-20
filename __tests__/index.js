const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

//write test to make sure that jest finds this file
test("a placeholder test", () => {
	expect(2 + 2).toBe(4);
});

const defaultCredentials = {
	username: "lambda",
	password: "test123",
};

beforeEach((done) => {
	// jest.setTimeout(10000);
	db.migrate.rollback().then(() => {
		db.migrate.latest().then(() => {
			done();
		});
	});
});

afterAll(async () => {
	await db.destroy();
});

describe("dad-jokes integration tests", () => {
	it("GET / get the welcome page", async () => {
		const res = await supertest(server).get("/api/");
		// console.log(res);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.message).toBe("Welcome to Sprint Challenge!");
	});

	it("GET /api/jokes should return 401 if not authenticated", async () => {
		const response = await supertest(server).get("/api/jokes");
		expect(response.status).toBe(401);
		// expect(response.body.message).toBe("Missing token!")
	});

	it("GET /api/jokes", async () => {
		// register new user
		await supertest(server).post("/api/auth/register").send(defaultCredentials);

		// Login to get access token
		const accessToken = (
			await supertest(server).post("/api/auth/login").send(defaultCredentials)
		).body.token;

		const response = await supertest(server)
			.get("/api/jokes")
			.set("token", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(20);
	});

	// it("GET /api/jokes/:id", async () => {
	// 	// register new user
	// 	await supertest(server)
	// 		.post("/api/auth/register/")
	// 		.send(defaultCredentials);

	// 	// Login to get access token
	// 	const accessToken = (
	// 		await supertest(server).post("/api/auth/login").send(defaultCredentials)
	// 	).body.token;

	// 	const response = await supertest(server)
	// 		.get("/api/jokes/1")
	// 		.set("token", `Bearer ${accessToken}`);

	// 	expect(response.status).toBe(200);
	// 	expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
	// 	expect(response.body.id).toBe(2);
	// }, 100000);

	it("POST /register create a new user accout", async () => {
		const res = await supertest(server)
			.post("/api/auth/register")
			.send(defaultCredentials);
		expect(res.statusCode).toBe(201);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.id).toBeDefined();
		expect(res.body.username).toEqual(defaultCredentials.username);
	});

	it("POST /register should return 401 when username exist", async () => {
		// register new user
		await supertest(server).post("/api/auth/register").send(defaultCredentials);

		//try to register with same credentials
		const res = await supertest(server)
			.post("/api/auth/register")
			.send(defaultCredentials);
		expect(res.status).toBe(409);
		expect(res.body.message).toMatch("Username is already taken");
	});

	it("POST /api/auth/login", async () => {
		// register new user
		await supertest(server).post("/api/auth/register").send(defaultCredentials);

		//login with registered credentials
		const res = await supertest(server)
			.post("/api/auth/login")
			.send(defaultCredentials);
		expect(res.status).toBe(200);
		expect(res.body.token).toBeTruthy();
	});

	it("GET /api/auth/logout", async () => {
		// register new user
		await supertest(server)
			.post("/api/auth/register")
			.send(defaultCredentials)
			.expect(201);
		// Login to get access token
		const accessToken = (
			await supertest(server).post("/api/auth/login").send(defaultCredentials)
		).body.token;
		// Logout
		await supertest(server)
			.get("/api/auth/logout")
			.set("Authorization", `Bearer ${accessToken}`)
			.expect(200);
		// Test if access token is revoked
		await supertest(server)
			.get("/api/jokes")
			.set("Authorization", `Bearer ${accessToken}`)
			.expect(401);
	});
});
