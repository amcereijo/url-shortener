import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../../database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'visitUrlStatics' })
class VisitUrlStaticsSchemaDef extends IdentifiableEntitySchema {
  @Prop({
    index: true,
  })
  readonly originalUrl: string;

  @Prop({
    index: true,
  })
  readonly shortToken: string;

  @Prop({
    default: 0,
  })
  readonly visits: number;
}

export const VisitUrlStaticsSchema = SchemaFactory.createForClass(
  VisitUrlStaticsSchemaDef,
);
