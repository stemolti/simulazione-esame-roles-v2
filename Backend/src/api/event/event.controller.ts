import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateEventDto, UpdateEventDto } from './event.dto';
import { EventService } from './event.service';

const service = new EventService();

export class EventController {
  async getAll(req: Request, res: Response) {
    try {
      const events = await service.getAllEvents();
      res.json(events);
      return;
    } catch (err) {
      console.error('Errore durante getAll:', err);
      res.status(500).json({ message: 'Errore interno del server' });
      return;
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const event = await service.getEventById(req.params.id);
      if (!event) {
        res.status(404).json({ message: 'Evento non trovato' });
        return;
      }
      res.json(event);
    } catch (err) {
      console.error('Errore durante getById:', err);
      res.status(500).json({ message: 'Errore interno del server' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateEventDto, req.body);
      await validateOrReject(dto);
      const event = await service.createEvent(dto);
      res.status(201).json(event);
      return;
    } catch (err) {
      console.error('Errore durante la creazione evento:', err);
      if (Array.isArray(err)) {
        const messages = err
          .map((e) => Object.values(e.constraints || {}))
          .flat();
        res.status(400).json({ message: 'Dati non validi', errors: messages });
        return;
      }
      res.status(500).json({ message: 'Errore interno del server' });
      return;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto = plainToInstance(UpdateEventDto, req.body);
      await validateOrReject(dto);
      const updated = await service.updateEvent(req.params.id, dto);
      if (!updated) {
        res.status(404).json({ message: 'Evento non trovato' });
        return;
      }
      res.json(updated);
      return;
    } catch (err) {
      console.error('Errore durante aggiornamento evento:', err);
      if (Array.isArray(err)) {
        const messages = err
          .map((e) => Object.values(e.constraints || {}))
          .flat();
        res.status(400).json({ message: 'Dati non validi', errors: messages });
        return;
      }
      res.status(500).json({ message: 'Errore interno del server' });
      return;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await service.deleteEvent(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: 'Evento non trovato' });
        return;
      }
      res.status(204).send();
      return;
    } catch (err) {
      console.error('Errore durante eliminazione evento:', err);
      res.status(500).json({ message: 'Errore interno del server' });
      return;
    }
  }
}
