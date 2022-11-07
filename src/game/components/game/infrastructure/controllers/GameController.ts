import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiExtraModels, refs } from '@nestjs/swagger';
import GameService from '../../core/services/GameService';
import CreateGameDTO from '../dtos/CreateGameDTO';
import JoinGameDTO from '../dtos/JoinGameDTO';
import CreateResult from '../../core/services/results/CreateResult';
import * as JoinResult from '../../core/services/results/JoinResult';

@Controller('game')
@ApiExtraModels(
    JoinResult.GameNotFoundResult,
    JoinResult.GameJoinedResult,
    JoinResult.GameAlreadyStartedResult,
    JoinResult.GameIsFullResult
)
export default class GameController {
    constructor(private gameService: GameService) {}

    @ApiResponse({ type: CreateResult })
    @Post()
    createGame(@Body() body: CreateGameDTO) {
        return this.gameService.create(body.playerName);
    }

    @ApiResponse({
        schema: {
            anyOf: refs(
                JoinResult.GameJoinedResult,
                JoinResult.GameNotFoundResult,
                JoinResult.GameAlreadyStartedResult,
                JoinResult.GameIsFullResult
            )
        }
    })
    @ApiParam({
        name: 'id',
        description: 'Game id that can be got by game creation'
    })
    @Post(':id/join')
    join(@Body() body: JoinGameDTO, @Param('id') id: string) {
        return this.gameService.join(body.playerName, id);
    }
}
