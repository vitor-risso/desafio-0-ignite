import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const title = `%${param.toLowerCase()}%`
    return this.repository
      .createQueryBuilder("game")
      .where(`LOWER(game.title) LIKE LOWER('${title}')`)
      .getMany()
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT * FROM games").then((games: Game[]) => {
      return [{ count: games.length.toString() }]
    }); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await this.repository
      .createQueryBuilder("games")
      .relation(Game, 'users')
      .of(id)
      .loadMany()


    // Complete usando query builder
  }
}
