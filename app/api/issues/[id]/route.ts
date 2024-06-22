import { issueSchema } from '@/app/validationSchema';
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from "delay";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string }}) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    const updatedIssue = await prisma.issues.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string }}) {

    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    await delay(1000);
    const issue = await prisma.issues.findUnique({
        where: {id: parseInt(params.id)}
    });

    if (!issue){
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});
    }

    await prisma.issues.delete({
        where: {id: issue.id}
    });

    return NextResponse.json({});
}