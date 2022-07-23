import { ApiProperty } from '@nestjs/swagger';

export default class JoinGameDTO {
    @ApiProperty({
        example: 'Mark',
        minLength: 0,
        description: 'Player name'
    })
    playerName!: string;
}
