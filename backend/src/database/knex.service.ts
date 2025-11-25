import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Knex from 'knex';
import config from '../../knexfile.js';

@Injectable()
export class KnexService implements OnModuleDestroy {
  private readonly knex: Knex.Knex;

  constructor() {
    // TODO: Load environment-specific configuration
    this.knex = Knex(config.development);
  }

  getKnex(): Knex.Knex {
    return this.knex;
  }

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}
