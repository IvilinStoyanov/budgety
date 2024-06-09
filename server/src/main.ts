import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import session from 'express-session';
import passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: process.env.COOKIE_KEY || 'default_secret', // use a fallback secret for development
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    }),
  );

  // Initialize passport and passport session
  app.use(passport.initialize());
  app.use(passport.session());


  // // Serve static files
  // app.useStaticAssets(join(__dirname, '..', 'client', 'dist'));

  // // Fallback route
  // app.use((req, res, next) => {
  //   const indexPath = join(__dirname, '..', 'client', 'dist', 'index.html');
  //   res.sendFile(indexPath);
  // });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Budgety API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 5000;

  await app.listen(port);
  console.log(`NestJS application is running on port ${port}`);
}

bootstrap();
