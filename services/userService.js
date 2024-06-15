import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // Implement methods to work with user
  async getAllUsers() {
    console.log("Fetching all users")
    try {
      const users = await userRepository.getAll();
      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error("Error fetching users", error);
      throw new Error("Error fetching users");
    }
  }

  async getUserById(id) {
    console.log(`Fetching user with id ${id}`);
    try {
      const user = await userRepository.getOne({ id });
      if (!user) {
        throw new Error("User not found");
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error fetching user by ID", error);
      throw new Error("Error fetching user by ID");
    }
  }

  async createUser(userData) {
    console.log("Creating user", userData);
    try {
      const user = await userRepository.create(userData);
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error creating user", error);
      throw new Error("Error creating user");
    }
  }

  async updateUser(id, userData) {
    console.log(`Updating user with id ${id}`, userData);
    try {
      const user = await userRepository.update(id, userData);
      if (!user) {
        throw new Error("User not found");
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error updating user", error);
      throw new Error("Error updating user");
    }
  }

  async deleteUser(id) {
    console.log(`Deleting user with id ${id}`);
    try {
      const user = await userRepository.delete(id);
      if (!user) {
        throw new Error("User not found");
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error deleting user", error);
      throw new Error("Error deleting user");
    }
  }

  async search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
