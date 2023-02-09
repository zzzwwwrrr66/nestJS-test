import { ArgumentMetadata, HttpException, PipeTransform } from "@nestjs/common"
import { BoardStatus } from "../boards.dto"

export class PatchValidate implements PipeTransform {
  readonly BoardStatus = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    const check = this.isValidate(value);
    console.log("value check", value, check);
    if(check) throw new HttpException('there is no status', 400);
    return value;
  }

  private isValidate (status: any) {
    const result = this.BoardStatus.indexOf(status) < 0 ? true : false

    return result;
  }
}