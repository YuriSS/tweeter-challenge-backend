
export interface Response {
  status: (code: number) => Response;
  json: (object: unknown) => Response;
}
