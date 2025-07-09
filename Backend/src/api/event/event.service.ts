import { CreateEventDto, UpdateEventDto } from './event.dto';
import { EventModel } from './event.model';

export class EventService {
  async getAllEvents() {
    return EventModel.find();
  }

  async getEventById(id: string) {
    return EventModel.findById(id);
  }

  async createEvent(dto: CreateEventDto) {
    return EventModel.create(dto);
  }

  async updateEvent(id: string, dto: UpdateEventDto) {
    return EventModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteEvent(id: string) {
    return EventModel.findByIdAndDelete(id);
  }
}
