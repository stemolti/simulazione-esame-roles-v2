import { CreateRegistrationDto } from './registration.dto';
import { RegistrationModel } from './registration.model';

export class RegistrationService {
  async registerToEvent(dto: CreateRegistrationDto) {
    const existing = await RegistrationModel.findOne({
      user: dto.user,
      event: dto.event,
    });
    if (existing) throw new Error("Utente già iscritto all'evento");

    return RegistrationModel.create(dto);
  }

  async getRegistrationsByUser(userId: string) {
    return RegistrationModel.find({ user: userId }).populate('event');
  }

  async unregisterFromEvent(userId: string, eventId: string) {
    const deleted = await RegistrationModel.findOneAndDelete({
      user: userId,
      event: eventId,
    });
    if (!deleted) throw new Error('Nessuna iscrizione trovata');
    return deleted;
  }

  async performCheckin(userId: string, eventId: string) {
    const updated = await RegistrationModel.findOneAndUpdate(
      { user: userId, event: eventId },
      { checkinEffettuato: true, oraCheckin: new Date() },
      { new: true },
    );

    console.log('Updated registration:', updated);

    if (!updated) throw new Error('Iscrizione non trovata');
    updated;
    return;
  }
}
