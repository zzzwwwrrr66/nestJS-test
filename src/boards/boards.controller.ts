import { Body, Controller, Get, Param, Post, Req, Query, Delete, Patch, ParseIntPipe, UsePipes, ValidationPipe, DefaultValuePipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { UpdateStatusDto, BoardData, SaveBoardDto } from './boards.dto';
import { PatchValidate } from './pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService, ) {} // dependency injection

  @Get() 
  getAllBoards():BoardData[] {
    return this.boardsService.getAllBoards();
  }

  @Get(":id")
  getBoard(@Param("id") id: string) {
    return this.boardsService.getBoard(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  saveBoard(@Body() body: SaveBoardDto ):BoardData {
    return this.boardsService.saveBoard(body);
  }

  @Delete(":id")
  deleteBoard(@Param("id") id: string) {
    return this.boardsService.deleteBoard(id);
  }

  @Patch("/:id/status")
  patchBoard(@Param("id") id: string, @Body("status", PatchValidate) status: number){
    return this.boardsService.patchBoard(id, status)
  }
}

console.log(BoardsController);