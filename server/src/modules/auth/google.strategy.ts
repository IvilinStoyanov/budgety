import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: '/api/auth/google/callback',
      proxy: true,
      scope: ['profile', 'email'],
    });
  }

  // // make sure to add this or else you won't get the refresh token
  // authorizationParams(): { [key: string]: string } {
  //   return {
  //     access_type: 'offline',
  //     prompt: 'consent',
  //   };
  // }


  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ) {
    const user = await this.authService.validateUser(profile);

    return user;
  }
}
