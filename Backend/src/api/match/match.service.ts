import { CreateMatchDto, UpdateMatchDto } from './match.dto';
import { MatchModel } from './match.model';

const validScore = (a: number, b: number): boolean => {
  if (a < 0 || b < 0) return false;
  if (a === b) return false;
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  if (max < 11) return false;
  if (max === 11 && min <= 9) return true;
  return max - min === 2;
};

export class MatchService {
  async getAll() {
    return MatchModel.find().populate('participantAId participantBId');
  }

  async getById(id: string) {
    return MatchModel.findById(id).populate('participantAId participantBId');
  }

  async create(dto: CreateMatchDto & { played?: boolean; pointsA?: number; pointsB?: number }) {
    if (dto.participantAId === dto.participantBId) throw new Error('Players must differ');
    const played = dto.played ?? false;
    const pointsA = dto.pointsA ?? 0;
    const pointsB = dto.pointsB ?? 0;
    if (played && !validScore(pointsA, pointsB)) throw new Error('Invalid score');
    return MatchModel.create({ ...dto, played, pointsA, pointsB });
  }

  async update(id: string, dto: UpdateMatchDto) {
    if (dto.played && dto.pointsA !== undefined && dto.pointsB !== undefined) {
      if (!validScore(dto.pointsA, dto.pointsB)) throw new Error('Invalid score');
    }
    return MatchModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return MatchModel.findByIdAndDelete(id);
  }
}
