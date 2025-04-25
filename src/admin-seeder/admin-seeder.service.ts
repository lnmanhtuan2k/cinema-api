import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AdminSeederService implements OnModuleInit {
    private readonly logger = new Logger(AdminSeederService.name);

    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        const email = process.env.ADMIN_EMAIL!;
        const username = process.env.ADMIN_USERNAME!;
        const password = process.env.ADMIN_PASSWORD;

        const hashed = await bcrypt.hash(password, 10);
        await this.prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                username,
                password: hashed,
                name: 'System Admin',
                role: Role.ADMIN,
            },
        });

        this.logger.log('Admin user ensured: ${email}');
    }
}