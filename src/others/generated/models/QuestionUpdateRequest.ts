/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionUpdateRequest = {
    content?: string;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    questionId?: number;
    tags?: Array<string>;
    title?: string;
};

