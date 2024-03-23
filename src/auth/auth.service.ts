import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

type GoogleUser = {
  email: string;
  name: string;
};

@Injectable({})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateLocalLogin(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    if (user && user.authType !== 'LOCAL') {
      throw new UnauthorizedException('This User uses Google Sign In');
    }

    const isPasswordValid: boolean = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    if (user && isPasswordValid) {
      const { ...result } = user;
      delete result.password;
      return result;
    }
  }

  async validateLocalSignUp(newUser: any) {
    const user = await this.usersService.getUserByEmail(newUser.email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const createdUser = await this.usersService.createUser(newUser);

    if (createdUser) {
      return await this.generateJWT(createdUser);
    }
  }

  async validateGoogleLogin(googleUser: GoogleUser) {
    let user = await this.usersService.getUserByEmail(googleUser.email);
    if (user && user.authType !== 'GOOGLE')
      throw new UnauthorizedException('This email uses email/password!');

    if (!user) {
      return await this.usersService.createUser({
        email: googleUser.email,
        name: googleUser.name,
        authType: 'GOOGLE',
      });
    }
    return user;
  }

  async generateJWT(user: any) {
    const { password, ...data } = user;
    return {
      accessToken: this.jwtService.sign({ ...data, sub: user._id }),
    };
  }
}
