import React from 'react'
import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import delay from "delay";
import IssueActions from "@/app/issues/list/IssueActions";
import {IssueStatusBadge, Link} from '@/app/components';
import NextLink from "next/link";
import {Issues, Status} from "@prisma/client";
import {ArrowUpIcon} from "@radix-ui/react-icons";

interface Props {
    searchParams: { status: Status, orderBy: keyof Issues, orderType: 'asc' | 'desc'};
}

const IssuesPage = async ({ searchParams }: Props) => {

    const columns: {
        label: string;
        value: keyof Issues;
        className?: string;
    }[] = [
        { label: 'Issue', value: 'title' },
        {
            label: 'Status',
            value: 'status',
            className: "hidden md:table-cell"
        },
        {
            label: 'Created',
            value: 'createdAt',
            className: "hidden md:table-cell"
        },
    ]

    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const orderBy = columns
        .map(column => column.value)
        .includes(searchParams.orderBy)
        ? {[searchParams.orderBy]: searchParams.orderType} : undefined;


    const issues = await prisma.issues.findMany({
        where: {
            status
        },
        orderBy,
    });
    await delay(500);

    // TODO make descending order

    return (
        <div>
            <IssueActions/>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell key={column.label} className={column.className}>
                                <NextLink href={{
                                    query: { ...searchParams, orderBy: column.value }
                                }}>
                                    {column.label}
                                </NextLink>
                                { column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issues => (
                        <Table.Row key={issues.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issues.id}`}>
                                    {issues.title}
                                </Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issues.status}/>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issues.status}/>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{issues.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>

    )
}

export const dynamic = 'force-dynamic';
export default IssuesPage
