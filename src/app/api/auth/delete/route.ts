import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema/users";
import db from "@/db";

export async function DELETE(req: NextRequest) {
  try {
    const rawUserData = req.headers.get("x-user-data");

    const userData = JSON.parse(rawUserData as string);

    if (!userData) {
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }
    // Delete user from the database
    await db.delete(usersTable).where(eq(usersTable.email, userData.email));

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ message: "Failed to delete account" }, { status: 500 });
  }
}
