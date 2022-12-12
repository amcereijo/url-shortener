import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create({
        binary: {
          version: '6.0.3',
        },
      });
      const uri = mongod.getUri();
      return {
        uri: uri,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (mongod) {
    await mongod.stop({
      force: true,
    });
  }
};
