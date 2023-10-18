import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('libraries')
@Controller('libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'create library' })
  @ApiBody({
    type: CreateLibraryDto,
    examples: {
      default: {
        value: {
          name: 'name',
          bookIds: [],
          userIds: [],
        },
      },
    },
  })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all libraries' })
  findAll() {
    return this.libraryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get library by id' })
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update library by id' })
  @ApiBody({
    type: UpdateLibraryDto,
    examples: {
      default: {
        value: {
          name: 'name',
          bookIds: [],
          userIds: [],
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete library by id' })
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
