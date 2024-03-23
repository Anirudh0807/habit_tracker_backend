import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/signin/google')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect() {}

    @Get('oauth2/redirect/google')
    @UseGuards(AuthGuard('google'))
    async handleRedirect(@Request() req: any){
        console.log("Redirect Working");
        return this.authService.generateJWT(req.user);
    }

    @Post('/signin/local')
    @UseGuards(AuthGuard('local'))
    async localLogin(@Request() req: any) {
        const token = await this.authService.generateJWT(req.user);
        return token;
    }
    
    @Post('/signup')
    async localSignUp(@Request() req: any) {
        const token = await this.authService.validateLocalSignUp(req.body);
        return token;
    }
}
