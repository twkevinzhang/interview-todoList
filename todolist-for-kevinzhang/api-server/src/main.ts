import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: '*',
    credentials: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
