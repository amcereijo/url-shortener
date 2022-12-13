import { Document } from 'mongoose';

export interface VisitUrlStaticsEntity extends Document {
  readonly originalUrl: string;
  readonly shortToken: string;
  readonly visits: number;
}
