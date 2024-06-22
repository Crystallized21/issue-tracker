import React from 'react';
import {Button} from "@radix-ui/themes";



const DeleteIssueButton = ({ issueId }: { issueId: number}) => {
    return (
        <Button color="red">Delete Button</Button>
    );
};

export default DeleteIssueButton;