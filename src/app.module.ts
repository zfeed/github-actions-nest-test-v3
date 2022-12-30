import { Module } from '@nestjs/common';
import { BettingModule } from './contexts/betting';

@Module({
    imports: [BettingModule]
})
export class AppModule {}
