import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiExtraModels, refs } from '@nestjs/swagger';
import MatchService from '../../core/services/MatchService';
import CreateMatchDTO from './dtos/CreateMatchDTO';
import JoinMatchDTO from './dtos/JoinMatchDTO';
import CreateResult from '../../core/services/results/CreateResult';
import * as JoinResult from '../../core/services/results/JoinResult';

@Controller('match')
@ApiExtraModels(
    JoinResult.MatchNotFoundResult,
    JoinResult.MatchJoinedResult,
    JoinResult.MatchAlreadyStartedResult,
    JoinResult.MatchIsFullResult
)
export default class MatchController {
    constructor(private matchService: MatchService) {}

    @ApiResponse({ type: CreateResult })
    @Post()
    createMatch(@Body() body: CreateMatchDTO) {
        return this.matchService.create(body.playerName);
    }

    @ApiResponse({
        schema: {
            anyOf: refs(
                JoinResult.MatchJoinedResult,
                JoinResult.MatchNotFoundResult,
                JoinResult.MatchAlreadyStartedResult,
                JoinResult.MatchIsFullResult
            )
        }
    })
    @ApiParam({
        name: 'id',
        description: 'Match id that can be received by match creation'
    })
    @Post(':id/join')
    join(@Body() body: JoinMatchDTO, @Param('id') id: string) {
        return this.matchService.join(body.playerName, id);
    }
}
