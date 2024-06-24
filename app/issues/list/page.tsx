import React from 'react'
import prisma from "@/prisma/client";
import delay from "delay";
import IssueActions from "@/app/issues/list/IssueActions";
import {Status} from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable";
import {Flex} from "@radix-ui/themes";
import {Metadata} from "next";

interface Props {
    searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;
    const where = { status };

    const orderBy = columnNames
        .includes(searchParams.orderBy)
        ? {[searchParams.orderBy]: searchParams.orderType} : undefined;


    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issues.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issues.count({ where });

    await delay(500);

    return (
        <Flex direction="column" gap="3">
            <IssueActions/>
            <IssueTable searchParams={searchParams} issues={issues}/>
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
        </Flex>

    )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Issue Tracker - Issues List',
    description: 'View all project issues.',
}

export default IssuesPage
