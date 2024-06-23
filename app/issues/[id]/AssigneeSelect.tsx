'use client';

import React from 'react';
import {Select} from "@radix-ui/themes";
import {Issues, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: {issue: Issues}) => {
    const {data: users, error, isLoading} = useUsers();

    if (isLoading) return <Skeleton/>

    if (error) return null;

    const assignIssue = (userId: string) => {
        axios
            .patch('/api/issues/' + issue.id, {
                assignedToUserId: userId === 'unassigned' ? null : userId
            })
            .catch(() => {
                toast.error('Changes could not be saved. Please try again.');
            });
    }

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={assignIssue}
            >
                <Select.Trigger placeholder="Assign..."/>
                    <Select.Content>
                        <Select.Group>
                            <Select.Label>Suggestions</Select.Label>
                            <Select.Item value="unassigned">Unassigned</Select.Item>
                            {users?.map(user => (
                                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Content>
            </Select.Root>
            <Toaster/>
        </>
    );
};

// test

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3
})

export default AssigneeSelect;