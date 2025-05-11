/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';
import { JudgeCase } from "@/others/generated";
export type QuestionVO = {
    acceptedNum?: number;
    content?: string;
    createTime?: string;
    judgeConfig?: JudgeConfig;
    judgeCase?: Array<JudgeCase>;
    questionId?: number;
    submitNum?: number;
    tags?: Array<string>;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

