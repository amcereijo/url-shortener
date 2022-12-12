import { Document } from 'mongoose';

export interface UrlEntity extends Document {
  readonly originalUrl: string;
  readonly shortToken: string;
}
