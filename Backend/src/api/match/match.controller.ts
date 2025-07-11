import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateMatchDto, UpdateMatchDto, UpdateResultDto } from './match.dto';
import { MatchService } from './match.service';

const service = new MatchService();

export class MatchController {
  async getAll(_req: Request, res: Response) {
    res.json(await service.getAll());
  }

  async create(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateMatchDto, req.body);
      await validateOrReject(dto);
      const match = await service.create({ ...dto, ...req.body });
      res.status(201).json(match);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto = plainToInstance(UpdateMatchDto, req.body);
      await validateOrReject(dto);
      const match = await service.update(req.params.id, { ...dto, ...req.body });
      if (!match) {
        res.status(404).json({ message: 'Match not found' });
        return;
      }
      res.json(match);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    const deleted = await service.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Match not found' });
      return;
    }
    res.status(204).send();
  }

  async updateResult(req: Request, res: Response) {
    try {
      const dto = plainToInstance(UpdateResultDto, req.body);
      await validateOrReject(dto);
      const { pointsA, pointsB, played } = dto;
      const match = await service.updateResult(req.params.id, { pointsA, pointsB, played });
      if (!match) {
        res.status(404).json({ message: 'Match not found' });
        return;
      }
      res.json(match);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
}
