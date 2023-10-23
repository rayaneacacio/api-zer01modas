const UsersRepositoryInMemory = require("../../repositoriesInMemory/users-respositoryInMemory");
const UsersServices = require("./users-services");
const AppError = require("../../utils/AppError");

describe("users-services", () => {
  let usersRepositoryInMemory = null;
  let userServices = null;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userServices = new UsersServices(usersRepositoryInMemory);
  });

  it("verifica se o email já existe no banco de dados", async() => {
    const email = "usertest@email";

    await expect(userServices.verifyEmail(email)).rejects.toEqual(new AppError("O email já existe"));
  });

  it("verifica se a senha está correta", async() => {
    const password = "1234";
    const userPassword = "usertest"

    await expect(userServices.verifyPassowrd({ password, userPassword })).rejects.toEqual(new AppError("E-mail ou senha incorreta"));
  });

});