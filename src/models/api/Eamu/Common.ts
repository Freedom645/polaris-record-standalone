export interface PolarisChordResponse<T> {
  status: number;
  data: PolarisChordResponseData & T;
}

export interface PolarisChordResponseData {
  status: number;
  fail_code: number;
}
