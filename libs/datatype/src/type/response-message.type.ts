import { RequestAction } from './request-action.type';
import { ResponseCode } from './response-code.type';

export type ResponseMessage = {
    code: ResponseCode;
    action: RequestAction;
    data?: unknown;
};
