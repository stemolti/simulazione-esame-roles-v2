import { EventModel } from '../event/event.model';
import { RegistrationModel } from '../registration/registration.model';

export class StatisticsService {
  async getEventStatistics(from: Date, to: Date) {
    const events = await EventModel.find({
      date: { $gte: from, $lte: to },
    });

    const stats = await Promise.all(
      events.map(async (event) => {
        const totalRegistrations = await RegistrationModel.countDocuments({
          event: event._id.toString(),
        });

        const totalCheckins = await RegistrationModel.countDocuments({
          event: event._id.toString(),
          checkinEffettuato: true,
        });

        console.log(`Event: ${event._id} (${typeof event._id})`);

        const participationRate =
          totalRegistrations === 0
            ? 0
            : Math.round((totalCheckins / totalRegistrations) * 100);

        return {
          eventId: event._id,
          title: event.title,
          date: event.date,
          totalRegistrations,
          totalCheckins,
          participationRate,
        };
      }),
    );

    return stats;
  }
}
