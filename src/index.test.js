const request = require("supertest");
const { app } = require("./app");
const { faker } = require("@faker-js/faker");
const db = require("./config");

afterAll((done) => {
    // Close the database connection
    db.end(done);
});



describe("lastBid", () => {
    test("should return the last bid for a product", async () => {
        const response = await request(app).get(`/backend/bid/5`);
        expect(response.statusCode).toBe(200);
    });
});
describe("createBid", () => {
    test("should insert data successfully with valid input", async () => {
        const responseForLastBid = await request(app).get(`/backend/bid/1`);
        const lastbid=responseForLastBid.body.bidAmount
        const req = {
            body: {
                productId: 1,
                userId: 1,
                bidAmount: lastbid+1,
                date: "2024-12-03",
            },
        };
        const response = await request(app).post("/backend/bid/create").send(req.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Data Inserted Successfully");
    });


});