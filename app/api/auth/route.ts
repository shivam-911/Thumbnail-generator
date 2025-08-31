import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { password } = await req.json()

    if (password === process.env.APP_PASSWORD) {
        const res = NextResponse.json({ success: true })
        res.cookies.set("app_auth", password, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        })
        return res
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
