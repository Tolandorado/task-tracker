import { Module, Global } from '@nestjs/common';
import { KnexService } from './knex.service.js';

@Global()
@Module({
  providers: [KnexService],
  exports: [KnexService],
})
export class DatabaseModule {}
