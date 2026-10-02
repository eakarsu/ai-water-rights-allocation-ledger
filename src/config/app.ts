export interface PageConfig {
  label: string;
  href: string;
  description: string;
  entities: string[];
  workflows: string[];
}

export interface EntityConfig {
  name: string;
  label: string;
  fields: Array<{ name: string; kind: "string" | "number" | "boolean" | "date" }>;
}

export interface WorkflowConfig {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  fields: string[];
}

export const appConfig = {
  "slug": "ai-water-rights-allocation-ledger",
  "title": "Water Rights Allocation Ledger",
  "tagline": "Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules.",
  "accent": "rose"
};
export const pages: PageConfig[] = [
  {
    "label": "Intake & registers",
    "href": "/registers",
    "description": "Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules.",
    "entities": [
      "WaterAccount",
      "WaterEntitlement",
      "DiversionPoint"
    ],
    "workflows": [
      "permit-restriction-extraction",
      "diversion-reading-reconciliation"
    ]
  },
  {
    "label": "Operational records",
    "href": "/workflow",
    "description": "Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules.",
    "entities": [
      "MeterReading",
      "WaterTransfer",
      "WaterDelivery"
    ],
    "workflows": [
      "transfer-packet-review",
      "curtailment-summary"
    ]
  },
  {
    "label": "Review & delivery",
    "href": "/delivery",
    "description": "Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules.",
    "entities": [
      "CurtailmentNotice",
      "WaterOrder",
      "SeasonReconciliation"
    ],
    "workflows": [
      "delivery-variance-explanation",
      "season-reconciliation-narrative"
    ]
  },
  {
    "label": "Tasks & requirements",
    "href": "/operations",
    "description": "Assignments, versioned rules and document requirements.",
    "entities": [
      "OperationalTask",
      "RuleVersion",
      "DocumentRequirement"
    ],
    "workflows": [
      "evidence-completeness-review",
      "operations-handoff-draft"
    ]
  }
];
export const entities: Record<string, EntityConfig> = {
  "WaterAccount": {
    "name": "WaterAccount",
    "label": "Water Account",
    "fields": [
      {
        "name": "name",
        "kind": "string"
      },
      {
        "name": "holder",
        "kind": "string"
      },
      {
        "name": "watershed",
        "kind": "string"
      },
      {
        "name": "permitNumber",
        "kind": "string"
      },
      {
        "name": "unit",
        "kind": "string"
      },
      {
        "name": "seasonStart",
        "kind": "date"
      },
      {
        "name": "status",
        "kind": "string"
      }
    ]
  },
  "WaterEntitlement": {
    "name": "WaterEntitlement",
    "label": "Water Entitlement",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "priorityDate",
        "kind": "date"
      },
      {
        "name": "allocationUnits",
        "kind": "number"
      },
      {
        "name": "source",
        "kind": "string"
      },
      {
        "name": "restrictionText",
        "kind": "string"
      },
      {
        "name": "ruleVersion",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "DiversionPoint": {
    "name": "DiversionPoint",
    "label": "Diversion Point",
    "fields": [
      {
        "name": "name",
        "kind": "string"
      },
      {
        "name": "pointCode",
        "kind": "string"
      },
      {
        "name": "location",
        "kind": "string"
      },
      {
        "name": "meterCode",
        "kind": "string"
      },
      {
        "name": "capacityUnits",
        "kind": "number"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "MeterReading": {
    "name": "MeterReading",
    "label": "Meter Reading",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "diversionPointId",
        "kind": "string"
      },
      {
        "name": "readAt",
        "kind": "date"
      },
      {
        "name": "cumulativeUnits",
        "kind": "number"
      },
      {
        "name": "unit",
        "kind": "string"
      },
      {
        "name": "reader",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "WaterTransfer": {
    "name": "WaterTransfer",
    "label": "Water Transfer",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "counterparty",
        "kind": "string"
      },
      {
        "name": "direction",
        "kind": "string"
      },
      {
        "name": "units",
        "kind": "number"
      },
      {
        "name": "effectiveAt",
        "kind": "date"
      },
      {
        "name": "approvalReference",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "WaterDelivery": {
    "name": "WaterDelivery",
    "label": "Water Delivery",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "diversionPointId",
        "kind": "string"
      },
      {
        "name": "deliveredAt",
        "kind": "date"
      },
      {
        "name": "units",
        "kind": "number"
      },
      {
        "name": "recipient",
        "kind": "string"
      },
      {
        "name": "receipt",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "CurtailmentNotice": {
    "name": "CurtailmentNotice",
    "label": "Curtailment Notice",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "effectiveAt",
        "kind": "date"
      },
      {
        "name": "endAt",
        "kind": "date"
      },
      {
        "name": "authority",
        "kind": "string"
      },
      {
        "name": "restrictionText",
        "kind": "string"
      },
      {
        "name": "sourceReference",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "WaterOrder": {
    "name": "WaterOrder",
    "label": "Water Order",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "requestedAt",
        "kind": "date"
      },
      {
        "name": "deliveryAt",
        "kind": "date"
      },
      {
        "name": "requestedUnits",
        "kind": "number"
      },
      {
        "name": "recipient",
        "kind": "string"
      },
      {
        "name": "instructions",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "SeasonReconciliation": {
    "name": "SeasonReconciliation",
    "label": "Season Reconciliation",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "seasonEnd",
        "kind": "date"
      },
      {
        "name": "openingUnits",
        "kind": "number"
      },
      {
        "name": "usedUnits",
        "kind": "number"
      },
      {
        "name": "remainingUnits",
        "kind": "number"
      },
      {
        "name": "evidence",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "OperationalTask": {
    "name": "OperationalTask",
    "label": "Operational Task",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "owner",
        "kind": "string"
      },
      {
        "name": "priority",
        "kind": "string"
      },
      {
        "name": "startAt",
        "kind": "date"
      },
      {
        "name": "dueAt",
        "kind": "date"
      },
      {
        "name": "done",
        "kind": "boolean"
      },
      {
        "name": "notes",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "RuleVersion": {
    "name": "RuleVersion",
    "label": "Rule Version",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "jurisdiction",
        "kind": "string"
      },
      {
        "name": "version",
        "kind": "string"
      },
      {
        "name": "effectiveAt",
        "kind": "date"
      },
      {
        "name": "expiresAt",
        "kind": "date"
      },
      {
        "name": "sourceUrl",
        "kind": "string"
      },
      {
        "name": "requirementText",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  },
  "DocumentRequirement": {
    "name": "DocumentRequirement",
    "label": "Document Requirement",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "category",
        "kind": "string"
      },
      {
        "name": "requiredBy",
        "kind": "date"
      },
      {
        "name": "sourceReference",
        "kind": "string"
      },
      {
        "name": "evidenceReference",
        "kind": "string"
      },
      {
        "name": "reviewNotes",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "waterAccountId",
        "kind": "string"
      }
    ]
  }
};
export const workflows: WorkflowConfig[] = [
  {
    "slug": "permit-restriction-extraction",
    "title": "Permit restriction extraction",
    "description": "Permit restriction extraction using selected water account records and supplied evidence.",
    "prompt": "Permit restriction extraction for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "diversion-reading-reconciliation",
    "title": "Diversion reading reconciliation",
    "description": "Diversion reading reconciliation using selected water account records and supplied evidence.",
    "prompt": "Diversion reading reconciliation for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "transfer-packet-review",
    "title": "Transfer packet review",
    "description": "Transfer packet review using selected water account records and supplied evidence.",
    "prompt": "Transfer packet review for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "curtailment-summary",
    "title": "Curtailment summary",
    "description": "Curtailment summary using selected water account records and supplied evidence.",
    "prompt": "Curtailment summary for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "delivery-variance-explanation",
    "title": "Delivery variance explanation",
    "description": "Delivery variance explanation using selected water account records and supplied evidence.",
    "prompt": "Delivery variance explanation for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "season-reconciliation-narrative",
    "title": "Season reconciliation narrative",
    "description": "Season reconciliation narrative using selected water account records and supplied evidence.",
    "prompt": "Season reconciliation narrative for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "evidence-completeness-review",
    "title": "Evidence completeness review",
    "description": "Evidence completeness review using selected water account records and supplied evidence.",
    "prompt": "Evidence completeness review for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "operations-handoff-draft",
    "title": "Operations handoff draft",
    "description": "Operations handoff draft using selected water account records and supplied evidence.",
    "prompt": "Operations handoff draft for Water Rights Allocation Ledger. Operational scope: Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules. Specific AI scope: Extract rights documents and identify conflicting clauses for review. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  }
];
export function findPage(href:string){return pages.find(p=>p.href===href);}
