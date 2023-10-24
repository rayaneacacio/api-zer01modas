const SessionsServices = require("./sessions-services");
const AppError = require("../../utils/AppError");

describe("SessionsServices", () => {
  it("verifica se o user existe", async() => {
    const sessionsServices = new SessionsServices();
    
    await expect(sessionsServices.verifyUserExists()).rejects.toEqual(new AppError("E-mail ou senha incorreta"));
  });
});