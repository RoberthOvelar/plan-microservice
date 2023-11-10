import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionService } from './subscription.service';
import { SubscribeInPlanUseCase } from './use-cases/subscribe-in-plan.use-case';

@Controller('subscription')
@ApiTags('Subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly subscribeInPlanUseCase: SubscribeInPlanUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: CreateSubscriptionDto })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscribeInPlanUseCase.execute(createSubscriptionDto.planId);
  }

  @Get()
  findAll() {
    return this.subscribeInPlanUseCase.execute(
      'e8136b8b-9105-41a2-bfdb-60560540178c',
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.subscriptionService.remove(id);
  }
}
