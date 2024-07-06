import { db } from "../../../lib/prisma"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        const products = await db.product.findMany();
        return NextResponse.json(products, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 })
    }
}