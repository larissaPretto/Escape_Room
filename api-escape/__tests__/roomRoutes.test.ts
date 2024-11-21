import request from "supertest";
import app from "../src/server";
import { describe, it, expect } from "@jest/globals";

describe("GET /api/rooms", () => {
  it("should return a list of rooms", async () => {
    const response = await request(app)
      .get("/api/rooms/all")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
