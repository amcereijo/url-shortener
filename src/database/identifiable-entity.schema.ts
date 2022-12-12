import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export abstract class IdentifiableEntitySchema {
  @Prop({
    default: mongoose.Types.ObjectId,
  })
  readonly _id: ObjectId;
}
