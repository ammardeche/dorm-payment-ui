import { Component, computed, ElementRef, inject, input, output, signal } from '@angular/core';
import { RoomOption } from '../../models/room-option-model';

@Component({
  selector: 'app-room-select-component',
  imports: [],
  templateUrl: './room-select-component.html',
  styleUrl: './room-select-component.css',
    host: { '(document:click)': 'onDocumentClick($event)' },

})
export class RoomSelectComponent {

  private readonly host = inject(ElementRef<HTMLElement>);

  rooms = input.required<RoomOption[]>();
  selectedRoom = output<number | null>();

  search = signal('');
  open = signal(false);

  filtered = computed(() => {
    const term = this.search().trim();
    return this.rooms().filter((r) => (r.roomNumber?.toString() ?? '').includes(term));
  });

  onType(value: string): void {
    this.search.set(value);
    this.open.set(true);
    if (value === '') this.selectedRoom.emit(null); // emptied the text = "All rooms"
  }

  select(room: RoomOption): void {
    this.search.set(room.roomNumber?.toString() ?? '');
    this.open.set(false);
    this.selectedRoom.emit(room.id);
  }

  clearSelection(): void {
    this.search.set('');
    this.open.set(false);
    this.selectedRoom.emit(null);
  }

  onDocumentClick(event: Event): void {
    if (!this.host.nativeElement.contains(event.target)) this.open.set(false);
  }
}
