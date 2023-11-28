import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscribeInPlanUseCase } from './use-cases/subscribe-in-plan.use-case';
import { CancelSubscriptionUseCase } from './use-cases/cancel-subscription.use-case';

@ApiTags('Subscription')
@Controller('subscription')
@ApiBearerAuth()
export class SubscriptionController {
  constructor(
    private readonly subscribeInPlanUseCase: SubscribeInPlanUseCase,
    private readonly cancelSubscriptionUseCase: CancelSubscriptionUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: CreateSubscriptionDto })
  @ApiOperation({ summary: 'Inscreve usuário autenticado em um plano' })
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @AuthenticatedUser() user: any,
  ) {
    return this.subscribeInPlanUseCase.execute(
      user.sub,
      createSubscriptionDto.planId,
    );
  }

  @Get('/cancel')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Cancela o plano vigente do usuário autenticado' })
  findOne(@AuthenticatedUser() user: any) {
    return this.cancelSubscriptionUseCase.execute(user.sub);
  }
}
