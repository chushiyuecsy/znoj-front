/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CodeRequest } from '../models/CodeRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CodeControllerService {
    /**
     * getCode
     * @param codeRequest codeRequest
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getCodeUsingPost(
        codeRequest: CodeRequest,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/get_code/',
            body: codeRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
