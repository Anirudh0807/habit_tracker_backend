import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { LocalStrategy } from './utils/LocalStrategy';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_HASH,
      signOptions: { expiresIn: '1d' }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    
  ],
  providers: [AuthService, GoogleStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
