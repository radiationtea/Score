import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AuthMiddleware } from './auth/auth.middleware'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { PermissionsModule } from './permissions/permissions.module'
import { ScoreModule } from './score/score.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['env']
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    HealthModule,
    PermissionsModule,
    ScoreModule
  ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/')
  }
}
