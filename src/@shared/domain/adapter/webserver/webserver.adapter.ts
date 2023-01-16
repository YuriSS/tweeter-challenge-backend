import { ResponseErrorAdapterFactory } from "@shared/domain/adapter/webserver/response.error.adapter";
import { Response as InternalResponse } from "@shared/domain/data/webserver/response.type"
import { Request as InternalRequest } from "@shared/domain/data/webserver/request.type"

export class WebserverAdapter<Request extends InternalRequest, Response extends InternalResponse> {
  public adaptController(controller: (request: Request, response: Response) => Promise<void>) {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        await controller(request, response);
      }
      catch(error) {
        ResponseErrorAdapterFactory.create(response).defineError(error);
      }
    }
  }
}

export class WebserverAdapterFactory {
  public static create<Request extends InternalRequest, Response extends InternalResponse>() {
    return new WebserverAdapter<Request, Response>();
  }
}
