import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GamingModule } from './contexts/gaming';
import { BettingModule } from './contexts/betting';

@Module({
    imports: [GamingModule, BettingModule, ConfigModule.forRoot()]
})
export class AppModule {}
