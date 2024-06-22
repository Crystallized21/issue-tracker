import React from 'react'
import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import delay from "delay";
import IssueActions from "@/app/issues/list/IssueActions";
import {IssueStatusBadge, Link,} from '@/app/components';

const IssuesPage = async () => {
    const issues = await prisma.issues.findMany();
    await delay(500);

    return (
        <div>
            <IssueActions/>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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
