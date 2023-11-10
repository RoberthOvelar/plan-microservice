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
import { CreatePlanDto } from './dtos/create-plan.dto';
import { ReturnPlanDto } from './dtos/return-plan.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { DeletePlanUseCase } from './use-cases/delete-plan.use-case';
import { FindAllPlanUseCase } from './use-cases/find-all-plan.use-case';
import { FindOnePlanUseCase } from './use-cases/find-one-plan.use-case';
import { UpdatePlanUseCase } from './use-cases/update-plan.use-case';

@Controller('plan')
@ApiTags('Plan')
export class PlanController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly findAllPlanUseCase: FindAllPlanUseCase,
    private readonly findOnePlanUseCase: FindOnePlanUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: ReturnPlanDto })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.createPlanUseCase.execute(createPlanDto);
  }

  @Get()
  @ApiOkResponse({ type: ReturnPlanDto, isArray: true })
  findAll() {
    return this.findAllPlanUseCase.execute();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReturnPlanDto })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.findOnePlanUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReturnPlanDto })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.updatePlanUseCase.execute(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deletePlanUseCase.execute(id);
  }
}
