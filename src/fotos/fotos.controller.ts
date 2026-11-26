import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import { Foto } from './entities/foto.entity.js';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  // /api/fotos?min=3&max=5&q=foto&etiqueta=playa&orden=desc&page=1&limit=5
  @Get()
  findAll(
    @Query('min', new DefaultValuePipe(0), ParseFloatPipe) min: number,
    @Query('max', new DefaultValuePipe(5), ParseFloatPipe) max: number,
    @Query('q') q: string | undefined,
    @Query('etiqueta') etiqueta: string | undefined,
    @Query('orden') orden: string | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.fotosService.findAll({
      min,
      max,
      q,
      etiqueta,
      orden,
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fotosService.findOne(id);
  }

  @Post()
  create(@Body() datos: Partial<Foto>) {
    return this.fotosService.create(datos);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() datos: Partial<Foto>) {
    return this.fotosService.update(id, datos);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fotosService.remove(id);
  }
}