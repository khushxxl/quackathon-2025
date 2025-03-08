import { createClient } from "./client";
import { signInWithSupabase, addDataToSupabase } from "./db.actions";

// Mock the createClient function
jest.mock("./client", () => ({
  createClient: jest.fn(),
}));

describe("Supabase Actions", () => {
  let mockSupabaseClient: any;

  beforeEach(() => {
    // Reset the mock and set up a new mock Supabase client for each test
    jest.clearAllMocks();
    mockSupabaseClient = {
      auth: {
        signInWithPassword: jest.fn(),
        signUp: jest.fn(),
        getSession: jest.fn(),
        getUser: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      select: jest.fn(),
      eq: jest.fn().mockReturnThis(),
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
  });

  describe("signInWithSupabase", () => {
    it("should sign in successfully", async () => {
      const mockData = { user: { id: "123" } };
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await signInWithSupabase({
        email: "test@example.com",
        password: "password123",
      });

      expect(result).toEqual(mockData);
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should throw an error if sign in fails", async () => {
      const mockError = new Error("Invalid credentials");
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(
        signInWithSupabase({ email: "test@example.com", password: "wrong" })
      ).rejects.toThrow("Invalid credentials");
    });
  });

  // Similar tests for signUpWithSupabase, getAuthenticatedUser, etc.

  describe("addDataToSupabase", () => {
    it("should add data successfully", async () => {
      const mockData = { id: 1, name: "Test" };
      mockSupabaseClient.select.mockResolvedValue({
        data: [mockData],
        error: null,
      });

      const result = await addDataToSupabase("users", { name: "Test" });

      expect(result).toEqual([mockData]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("users");
      expect(mockSupabaseClient.insert).toHaveBeenCalledWith({ name: "Test" });
      expect(mockSupabaseClient.select).toHaveBeenCalled();
    });

    it("should throw an error if adding data fails", async () => {
      const mockError = new Error("Insert failed");
      mockSupabaseClient.select.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(
        addDataToSupabase("users", { name: "Test" })
      ).rejects.toThrow("Insert failed");
    });
  });

  // Add similar tests for deleteDataFromSupabase and updateDataInSupabase
});
