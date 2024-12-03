export class ListResult<T> {
  data: T[];
  count: number;
}

export class DeleteResult {
  status: boolean;
}
