# Water Rights Allocation Ledger

Record rights, priority dates, diversion measurements, authorized transfers and allocation scenarios under supplied jurisdiction rules.

## Implemented records

- **Water Account**: name, holder, watershed, permit Number, unit, season Start, status.
- **Water Entitlement**: title, priority Date, allocation Units, source, restriction Text, rule Version, status.
- **Diversion Point**: name, point Code, location, meter Code, capacity Units, status.
- **Meter Reading**: title, read At, cumulative Units, unit, reader, status.
- **Water Transfer**: title, counterparty, direction, units, effective At, approval Reference, status.
- **Water Delivery**: title, delivered At, units, recipient, receipt, status.
- **Curtailment Notice**: title, effective At, end At, authority, restriction Text, source Reference, status.
- **Water Order**: title, requested At, delivery At, requested Units, recipient, instructions, status.
- **Season Reconciliation**: title, season End, opening Units, used Units, remaining Units, evidence, status.
- **Operational Task**: title, owner, priority, start At, due At, done, notes, status.
- **Rule Version**: title, jurisdiction, version, effective At, expires At, source Url, requirement Text, status.
- **Document Requirement**: title, category, required By, source Reference, evidence Reference, review Notes, status.

## AI workflows

- Permit restriction extraction: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Diversion reading reconciliation: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Transfer packet review: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Curtailment summary: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Delivery variance explanation: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Season reconciliation narrative: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Evidence completeness review: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Operations handoff draft: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.

## Calculations

- Water allocation balance: Reconcile one water account, season and unit. Priority, curtailment and transfer authority remain documented inputs.
- Water Account evidence checklist: Check source presence against an explicitly supplied document list; reviewer assesses adequacy.
- Operational deadline queue: Compute overdue items from entered dates and completed flags; no external notifications.

## Workspace features

Role-based login and account management; validated create/edit/delete; required parent and sibling relationships; search and pagination; atomic JSON imports; CSV/JSON exports; optimistic concurrency; two independent human reviews; immutable source-text uploads with independent review; dated task calendar; aggregate reports; searchable audit trail; model catalog and administrator AI settings; configured HTTPS connectors with approval, idempotency and receipt checks.

## Integration boundaries

A finite working scope, not every conceivable feature. No production regulator, insurer, carrier, court, university or clinical integration is preconfigured. Source uploads support text/CSV/JSON/Markdown, not OCR/PDF parsing. AI produces drafts and cannot authorize clinical handling, adjudicate rights, select recipients or jurors, establish eligibility, certify regulatory compliance or send submissions. Live external execution requires a configured adapter and independent human approval of the current record. Calculations use supplied rules and units; example rules are fictional.
