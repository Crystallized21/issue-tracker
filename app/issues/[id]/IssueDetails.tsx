import React from 'react';
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import {Issues} from "@prisma/client";

const IssueDetails = ({ issue }: { issue: Issues}) => {
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose" mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    );
};

export default IssueDetails;