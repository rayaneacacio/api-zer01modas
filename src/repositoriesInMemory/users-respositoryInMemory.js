class UsersRepositoryInMemory {
  user = {
    id: 1,
    email: "usertest@email",
    password: "usertest"
  }

  async findByEmail(email) {
    return email == this.user.email;
  }
}

module.exports = UsersRepositoryInMemory;