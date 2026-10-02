-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST');

-- CreateTable
CREATE TABLE "User" (
    "active" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowAnalysis" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "workflow" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "evidence" JSONB NOT NULL,
    "evidenceHash" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "receipt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordReview" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageBucket" (
    "id" TEXT NOT NULL,
    "calls" INTEGER NOT NULL,

    CONSTRAINT "UsageBucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuedCredential" (
    "token" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "assertion" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "IssuedCredential_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "DomainArtifact" (
    "id" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordApproval" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "RecordApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainExecution" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "result" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSession" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "currentQuestion" TEXT,
    "status" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionMedia" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "bytes" BYTEA NOT NULL,
    "contentHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSetting" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "holder" TEXT NOT NULL,
    "watershed" TEXT NOT NULL,
    "permitNumber" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "seasonStart" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterEntitlement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priorityDate" TIMESTAMP(3) NOT NULL,
    "allocationUnits" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "restrictionText" TEXT NOT NULL,
    "ruleVersion" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterEntitlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiversionPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pointCode" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "meterCode" TEXT NOT NULL,
    "capacityUnits" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiversionPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeterReading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "diversionPointId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL,
    "cumulativeUnits" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "reader" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeterReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterTransfer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "counterparty" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "units" DOUBLE PRECISION NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "approvalReference" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterDelivery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "diversionPointId" TEXT NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "units" DOUBLE PRECISION NOT NULL,
    "recipient" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurtailmentNotice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "authority" TEXT NOT NULL,
    "restrictionText" TEXT NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurtailmentNotice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterOrder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL,
    "deliveryAt" TIMESTAMP(3) NOT NULL,
    "requestedUnits" DOUBLE PRECISION NOT NULL,
    "recipient" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonReconciliation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "seasonEnd" TIMESTAMP(3) NOT NULL,
    "openingUnits" DOUBLE PRECISION NOT NULL,
    "usedUnits" DOUBLE PRECISION NOT NULL,
    "remainingUnits" DOUBLE PRECISION NOT NULL,
    "evidence" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeasonReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationalTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleVersion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "sourceUrl" TEXT NOT NULL,
    "requirementText" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requiredBy" TIMESTAMP(3) NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "evidenceReference" TEXT,
    "reviewNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "waterAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "WorkflowAnalysis_workflow_createdAt_idx" ON "WorkflowAnalysis"("workflow", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RecordReview_entity_entityId_version_actorId_key" ON "RecordReview"("entity", "entityId", "version", "actorId");

-- CreateIndex
CREATE INDEX "IssuedCredential_entity_entityId_createdAt_idx" ON "IssuedCredential"("entity", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "DomainArtifact_subjectEntity_subjectId_idx" ON "DomainArtifact"("subjectEntity", "subjectId");

-- CreateIndex
CREATE INDEX "WorkSession_respondentId_createdAt_idx" ON "WorkSession"("respondentId", "createdAt");

-- CreateIndex
CREATE INDEX "SessionMedia_sessionId_idx" ON "SessionMedia"("sessionId");

-- CreateIndex
CREATE INDEX "WaterAccount_createdAt_idx" ON "WaterAccount"("createdAt");

-- CreateIndex
CREATE INDEX "WaterEntitlement_createdAt_idx" ON "WaterEntitlement"("createdAt");

-- CreateIndex
CREATE INDEX "WaterEntitlement_waterAccountId_idx" ON "WaterEntitlement"("waterAccountId");

-- CreateIndex
CREATE INDEX "DiversionPoint_createdAt_idx" ON "DiversionPoint"("createdAt");

-- CreateIndex
CREATE INDEX "DiversionPoint_waterAccountId_idx" ON "DiversionPoint"("waterAccountId");

-- CreateIndex
CREATE INDEX "MeterReading_createdAt_idx" ON "MeterReading"("createdAt");

-- CreateIndex
CREATE INDEX "MeterReading_waterAccountId_idx" ON "MeterReading"("waterAccountId");

-- CreateIndex
CREATE INDEX "WaterTransfer_createdAt_idx" ON "WaterTransfer"("createdAt");

-- CreateIndex
CREATE INDEX "WaterTransfer_waterAccountId_idx" ON "WaterTransfer"("waterAccountId");

-- CreateIndex
CREATE INDEX "WaterDelivery_createdAt_idx" ON "WaterDelivery"("createdAt");

-- CreateIndex
CREATE INDEX "WaterDelivery_waterAccountId_idx" ON "WaterDelivery"("waterAccountId");

-- CreateIndex
CREATE INDEX "CurtailmentNotice_createdAt_idx" ON "CurtailmentNotice"("createdAt");

-- CreateIndex
CREATE INDEX "CurtailmentNotice_waterAccountId_idx" ON "CurtailmentNotice"("waterAccountId");

-- CreateIndex
CREATE INDEX "WaterOrder_createdAt_idx" ON "WaterOrder"("createdAt");

-- CreateIndex
CREATE INDEX "WaterOrder_waterAccountId_idx" ON "WaterOrder"("waterAccountId");

-- CreateIndex
CREATE INDEX "SeasonReconciliation_createdAt_idx" ON "SeasonReconciliation"("createdAt");

-- CreateIndex
CREATE INDEX "SeasonReconciliation_waterAccountId_idx" ON "SeasonReconciliation"("waterAccountId");

-- CreateIndex
CREATE INDEX "OperationalTask_createdAt_idx" ON "OperationalTask"("createdAt");

-- CreateIndex
CREATE INDEX "OperationalTask_waterAccountId_idx" ON "OperationalTask"("waterAccountId");

-- CreateIndex
CREATE INDEX "RuleVersion_createdAt_idx" ON "RuleVersion"("createdAt");

-- CreateIndex
CREATE INDEX "RuleVersion_waterAccountId_idx" ON "RuleVersion"("waterAccountId");

-- CreateIndex
CREATE INDEX "DocumentRequirement_createdAt_idx" ON "DocumentRequirement"("createdAt");

-- CreateIndex
CREATE INDEX "DocumentRequirement_waterAccountId_idx" ON "DocumentRequirement"("waterAccountId");

-- AddForeignKey
ALTER TABLE "WaterEntitlement" ADD CONSTRAINT "WaterEntitlement_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiversionPoint" ADD CONSTRAINT "DiversionPoint_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeterReading" ADD CONSTRAINT "MeterReading_diversionPointId_fkey" FOREIGN KEY ("diversionPointId") REFERENCES "DiversionPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeterReading" ADD CONSTRAINT "MeterReading_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterTransfer" ADD CONSTRAINT "WaterTransfer_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterDelivery" ADD CONSTRAINT "WaterDelivery_diversionPointId_fkey" FOREIGN KEY ("diversionPointId") REFERENCES "DiversionPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterDelivery" ADD CONSTRAINT "WaterDelivery_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurtailmentNotice" ADD CONSTRAINT "CurtailmentNotice_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterOrder" ADD CONSTRAINT "WaterOrder_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonReconciliation" ADD CONSTRAINT "SeasonReconciliation_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalTask" ADD CONSTRAINT "OperationalTask_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleVersion" ADD CONSTRAINT "RuleVersion_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequirement" ADD CONSTRAINT "DocumentRequirement_waterAccountId_fkey" FOREIGN KEY ("waterAccountId") REFERENCES "WaterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

