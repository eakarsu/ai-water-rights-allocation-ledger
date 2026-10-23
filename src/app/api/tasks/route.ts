import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sp = request.nextUrl.searchParams;
  const q = (sp.get("q") || "").slice(0, 200); const status = sp.get("status") || ""; const priority = sp.get("priority") || "";
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (q) where.title = { contains: q, mode: "insensitive" };
  const tasks = await prisma.staffTask.findMany({ where, orderBy: [{ status: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }], take: 200 });
  return NextResponse.json({ tasks });
}

export async function POST(request: NextRequest) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "title is required" }, { status: 422 });
  const priority = body.priority === "LOW" || body.priority === "HIGH" ? body.priority : "NORMAL";
  const dueAt = typeof body.dueAt === "string" && !Number.isNaN(Date.parse(body.dueAt)) ? new Date(body.dueAt) : null;
  const task = await prisma.staffTask.create({
    data: { title: title.slice(0, 200), priority, dueAt, createdById: user.id, assigneeId: typeof body.assigneeId === "string" ? body.assigneeId : null },
  });
  await prisma.auditLog.create({ data: { actorId: user.id, actorName: user.name ?? user.email ?? "user", action: "TASK_CREATED", entity: "StaffTask", entityId: task.id, detail: task.title } });
  return NextResponse.json({ task }, { status: 201 });
}
