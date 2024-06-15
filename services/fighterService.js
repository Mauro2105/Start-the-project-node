import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // Implement methods to work with fighters
  async getAllFighters() {
    try {
      const fighters = await fighterRepository.getAll();
      return fighters;
    } catch (error) {
      throw new Error("Error fetching fighters");
    }
  }

  async getFighterById(id) {
    try {
      const fighter = await fighterRepository.getById(id);
      if (!fighter) {
        throw new Error("Fighter not found");
      }
      return fighter;
    } catch (error) {
      throw new Error("Error fetching fighter by ID");
    }
  }

  async createFighter(fighterData) {
    try {
      const fighter = await fighterRepository.create(fighterData);
      return fighter;
    } catch (error) {
      throw new Error("Error creating fighter");
    }
  }

  async updateFighter(id, fighterData) {
    try {
      const fighter = await fighterRepository.update(id, fighterData);
      if (!fighter) {
        throw new Error("Fighter not found");
      }
      return fighter;
    } catch (error) {
      throw new Error("Error updating fighter");
    }
  }

  async deleteFighter(id) {
    try {
      const fighter = await fighterRepository.delete(id);
      if (!fighter) {
        throw new Error("Fighter not found");
      }
      return fighter;
    } catch (error) {
      throw new Error("Error deleting fighter");
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
