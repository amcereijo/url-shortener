import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../../database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'evs' })
class UrlSchemaDef extends IdentifiableEntitySchema {
  @Prop({
    index: true,
  })
  readonly originalUrl: string;

  @Prop({
    index: true,
  })
  readonly shortToken: string;
}

export const UrlSchema = SchemaFactory.createForClass(UrlSchemaDef);
