import { dbConnect } from "@/lib/dbConnect.js";
import { Question } from "@/model/question.model";
import { NextResponse, NextRequest } from "next/server";

dbConnect();

export async function POST(request) {
    const reqBody = await request.json();
    const { title, content,authorName,authorEmail,tags } = reqBody;

    console.log(reqBody);

    const question = await Question.create({
        title,
        content,
        authorName,
        authorEmail,
        tags
    });

    if (!question) {
        return NextResponse.error(new Error("Failed to create blog"));
    }

    return NextResponse.json(question);
}

// export async function GET(request) {
//     const blogs = await Blog.find({});

//     if (!blogs) {
//         return NextResponse.error(new Error("Failed to fetch blogs"));
//     }

//     return NextResponse.json(blogs);
// }