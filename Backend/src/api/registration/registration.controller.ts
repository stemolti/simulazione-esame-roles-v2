import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './registration.dto';
import { RegistrationModel } from './registration.model';

const service = new RegistrationService();

export class RegistrationController {
  async register(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateRegistrationDto, {
        ...req.body,
        user: req.user?.id,
      });
      await validateOrReject(dto);
      const registration = await service.registerToEvent(dto);
      res.status(201).json(registration);
    } catch (err) {
      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : err });
    }
  }

  async getMyRegistrations(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Utente non autenticato' });
        return;
      }
      const registrations = await service.getRegistrationsByUser(userId);
      res.json(registrations);
    } catch (error) {
      console.error('Errore nel recupero delle registrazioni utente:', error);
      res.status(500).json({ message: 'Errore del server' });
    }
  }

  async getUserRegistrations(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const registrations = await service.getRegistrationsByUser(userId);

      res.json(registrations);
    } catch (error) {
      console.error('Errore nel recupero delle registrazioni utente:', error);
      res.status(500).json({ message: 'Errore del server' });
    }
  }

  async checkRegistration(req: Request, res: Response) {
    const userId = req.user?.id;
    const eventId = req.params.eventId;

    if (!userId) {
      res.status(401).json({ message: 'Utente non autenticato' });
      return;
    }

    try {
      const existing = await RegistrationModel.findOne({
        user: userId,
        event: eventId,
      });
      res.json({ registered: !!existing });
    } catch (err) {
      res.status(500).json({ message: 'Errore server' });
    }
  }

  async unregister(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { eventId } = req.params;
      await service.unregisterFromEvent(userId!, eventId);
      res.status(204).send();
    } catch (err) {
      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : err });
    }
  }

  async checkin(req: Request, res: Response) {
    try {
      const { userId, eventId } = req.params;
      const updated = await service.performCheckin(userId, eventId);
      res.json(updated);
    } catch (err) {
      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : err });
    }
  }
}
