import { Controller, Post, Body, Param } from '@nestjs/common';

import FieldService from '../../../core/services/FieldService/FieldService';

@Controller('field')
export default class FieldController {
    constructor(private fieldService: FieldService) {}

    @Post(':id/hit')
    hit(
        @Body() body: { index: number; playerId: string },
        @Param('id') id: string
    ) {
        return this.fieldService.hit(id, body.index, body.playerId);
    }
}
