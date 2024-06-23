'use client';

import { Select } from '@radix-ui/themes';
import React from 'react';
import {Status} from "@prisma/client";

const statuses: { label: string, value?: Status}[] = [
    { label: "All", value: undefined },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by status...'/>
                <Select.Content>
                    {statuses.map(status => (
                        <Select.Item key={status.label} value={status.value || 'All'}>
                            {status.label}
                        </Select.Item>
                    ))}
                </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;