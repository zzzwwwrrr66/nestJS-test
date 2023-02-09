import { IsNotEmpty } from "class-validator";

export class SaveBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
class GetBoardDto {
  @IsNotEmpty()
  id: string;
}
export class UpdateStatusDto {
  status: number;
}
export enum BoardStatus {
  PUBLIC = 1,
  PRIVATE = 2,
}
export interface BoardData {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: BoardStatus;
} 