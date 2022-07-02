import { Controller, Post, Body, Param } from '@nestjs/common';

import GameService from '../../../core/services/GameService/GameService';

@Controller('game')
export default class GameController {
    constructor(private gameService: GameService) {}

    @Post()
    createGame(@Body() body: { playerName: string }) {
        return this.gameService.create(body.playerName);
    }

    @Post(':id/join')
    join(@Body() body: { playerName: string }, @Param('id') id: string) {
        return this.gameService.join(body.playerName, id);
    }
}
