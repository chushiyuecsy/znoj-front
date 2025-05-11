/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_RunSubmitVO_ } from '../models/BaseResponse_Page_RunSubmitVO_';
import type { RunSubmitQueryRequest } from '../models/RunSubmitQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RunListControllerService {
    /**
     * listRunSubmitByPage
     * @param runSubmitQueryRequest runSubmitQueryRequest
     * @returns BaseResponse_Page_RunSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listRunSubmitByPageUsingPost(
        runSubmitQueryRequest: RunSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_RunSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/status/',
            body: runSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * refreshRunSubmitByPage
     * @param runSubmitQueryRequest runSubmitQueryRequest
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static refreshRunSubmitByPageUsingPost(
        runSubmitQueryRequest: RunSubmitQueryRequest,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/status/refresh',
            body: runSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
