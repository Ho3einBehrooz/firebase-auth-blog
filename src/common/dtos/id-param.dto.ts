import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParam {
  @ApiProperty({
    type: 'number',
    description: 'Send the id as param',
    example: '1',
  })
  @IsNumberString()
  @IsNotEmpty()
  readonly id!: number;
}
