import { Component, input, output } from '@angular/core';
import { RoomResponseModel } from '../../models/room-response.model';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-room-card-component',
  imports: [ Pagination],
  templateUrl: './room-card-component.html',
  styleUrl: './room-card-component.css',
})
export class RoomCardComponent {

  readonly room = input.required<RoomResponseModel>();
  // pagination = input.required<Pagination>();

    pageChanged = output<number>();


}
