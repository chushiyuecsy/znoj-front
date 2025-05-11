/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { RunSubmitVO } from './RunSubmitVO';
export type Page_RunSubmitVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<RunSubmitVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

