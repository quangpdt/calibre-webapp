import { ResponseCode } from './type/response-code.type';
import { RequestAction } from './type/request-action.type';
import { ResponseMessage } from './type/response-message.type';

export const responseBuilder = (action: RequestAction, code: ResponseCode, data: never): ResponseMessage => ({
    code,
    action,
    data,
});
