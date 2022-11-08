import { ApiProperty } from '@nestjs/swagger';

export default class CreateMatchDTO {
    @ApiProperty({
        example: 'Mark',
        minLength: 0,
        description: 'Player name'
    })
    playerName!: string;
}
