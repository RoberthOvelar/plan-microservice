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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um novo plano de assinatura' })
  //@Roles({ roles: ['realm:ADMIN'] })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.createPlanUseCase.execute(createPlanDto);
  }

  @Get()
  @ApiOkResponse({ type: ReturnPlanDto, isArray: true })
  @ApiOperation({ summary: 'Retorn todos os planos de assinatura' })
  @Public()
  findAll() {
    return this.findAllPlanUseCase.execute();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReturnPlanDto })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Retorn um plano de assinatura pelo {id}' })
  @Public()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.findOnePlanUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReturnPlanDto })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Atualiza um plano de assinatura pelo {id}' })
  @ApiBearerAuth()
  //@Roles({ roles: ['realm:ADMIN'] })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.updatePlanUseCase.execute(id, updatePlanDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleta (softDelete) um plano de assinatura pelo {id}',
  })
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  //@Roles({ roles: ['realm:ADMIN'] })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deletePlanUseCase.execute(id);
  }
}
