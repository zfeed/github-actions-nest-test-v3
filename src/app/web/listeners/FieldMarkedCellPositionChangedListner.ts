import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import FieldMarkedCellPositionChanged from '../../../core/domain/field/FieldMarkedCellPositionChanged';

@Injectable()
export default class FieldMarkedCellPositionChangedListner {
    @OnEvent(FieldMarkedCellPositionChanged.type)
    handle(event: FieldMarkedCellPositionChanged) {
        console.log(event);
    }
}
