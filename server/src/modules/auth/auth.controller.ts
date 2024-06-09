import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from './google-oauth.guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService
  ) { }


  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Res() res) {
    res.redirect(`${this.configService.get<string>('REDIRECT_DOMAIN')}`);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.clearCookie('connect.sid', { path: '/' });
        res.status(200).send({ message: 'Logout successful' });
      });
    });
  }

  @Get('current_user')
  async getCurrentUser(@Req() req, @Res() res) {
    try {
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
