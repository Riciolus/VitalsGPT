import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "@/db/schema/users";

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || username.length < 4) {
      return NextResponse.json(
        { message: "Username must be at least 4 characters" },
        { status: 400 }
      );
    }

    if (!email || email.length < 4 || !email.includes("@")) {
      return NextResponse.json({ message: "Please enter a valid email" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (existingUser.length > 0) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    await db.insert(usersTable).values({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "Sign-up successful" }, { status: 201 });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json({ message: "Oops.. something went wrong" }, { status: 500 });
  }
}
