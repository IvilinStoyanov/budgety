/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
    ) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        const user = await this.authService.findUser(payload._id);

        return user ? done(null, user) : done(null, null);
    }
}