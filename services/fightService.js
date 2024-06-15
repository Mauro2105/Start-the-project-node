import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  async getAllFights() {
    try {
      const fights = await fightRepository.getAll();
      return fights;
    } catch (error) {
      throw new Error("Error fetching fights");
    }
  }

  async getFightById(id) {
    try {
      const fight = await fightRepository.getById(id);
      if (!fight) {
        throw new Error("Fight not found");
      }
      return fight;
    } catch (error) {
      throw new Error("Error fetching fight by ID");
    }
  }

  async createFight(fightData) {
    try {
      const fight = await fightRepository.create(fightData);
      return fight;
    } catch (error) {
      throw new Error("Error creating fight");
    }
  }

  async updateFight(id, fightData) {
    try {
      const fight = await fightRepository.update(id, fightData);
      if (!fight) {
        throw new Error("Fight not found");
      }
      return fight;
    } catch (error) {
      throw new Error("Error updating fight");
    }
  }

  async deleteFight(id) {
    try {
      const fight = await fightRepository.delete(id);
      if (!fight) {
        throw new Error("Fight not found");
      }
      return fight;
    } catch (error) {
      throw new Error("Error deleting fight");
    }
  }
}

const fightersService = new FightersService();

export { fightersService };
