import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { v1 as uuid } from 'uuid';
import { UpdateStatusDto, BoardData, BoardStatus, SaveBoardDto } from './boards.dto';

@Injectable()
export class BoardsService {
  private boards = [
    {
      id: "1",
      title: "title1",
      content: "content1",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 1
    }
];
  
  test() {
    return "test from boards service";
  }

  getAllBoards():BoardData[]{
    return this.boards;
  }

  getBoard(paramId) {
    const res = this.getBoardById(paramId);

    return res;
  }

  saveBoard(body:SaveBoardDto) {
    const newBoard:BoardData = {
      id: uuid(),
      title: body.title,
      content: body.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: BoardStatus.PUBLIC,
    }
    this.boards.push(newBoard);

    return newBoard;
  }

  deleteBoard(paramId) {
    const findData = this.getBoardById(paramId);

    this.boards = this.boards.filter(v=>v.id !== findData.id);
    return {
      data: this.boards,
      msg: "success delete"
    };
  }

  patchBoard(paramId, status) {
    const res = this.getBoardById(paramId);
    if(res.status === status) throw new HttpException('must be same status', 400);

    const newBoard = res;
    newBoard.status = status;
    newBoard.updatedAt = new Date();

    const newBoards = [...this.boards.filter(items=>{
      return items.id !== paramId
    }), newBoard];
    this.boards = newBoards;
    
    return newBoard;
  }


  getBoardById(paramId) {
    const res = this.boards.find(board => board.id === paramId) || null;
    if(!res) throw new NotFoundException("없는 데이터");

    return res;
  }
}

