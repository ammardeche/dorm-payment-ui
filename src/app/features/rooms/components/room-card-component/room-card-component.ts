import { Component, input } from '@angular/core';
import { RoomResponseModel } from '../../models/room-response.model';

@Component({
  selector: 'app-room-card-component',
  imports: [],
  templateUrl: './room-card-component.html',
  styleUrl: './room-card-component.css',
})
export class RoomCardComponent {

  readonly room = input.required<RoomResponseModel>();

}
