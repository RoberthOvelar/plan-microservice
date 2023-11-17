import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscribeInPlanUseCase } from './use-cases/subscribe-in-plan.use-case';

@ApiTags('Subscription')
@Controller('subscription')
@ApiBearerAuth()
export class SubscriptionController {
  constructor(
    private readonly subscribeInPlanUseCase: SubscribeInPlanUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: CreateSubscriptionDto })
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
  findOne(@AuthenticatedUser() user: any) {
    return user;
  }
}
