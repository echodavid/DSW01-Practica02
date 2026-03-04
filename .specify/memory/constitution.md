
<!--
Sync Impact Report
------------------
Version change: 0.0.0 → 1.0.0
Modified principles: All placeholders replaced with concrete backend principles
Added sections: Security & Deployment Constraints, Development Workflow
Removed sections: None
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md, ✅ commands/*.md (none found), ✅ README.md/docs/quickstart.md (none found)
Follow-up TODOs: TODO(RATIFICATION_DATE): Original ratification date unknown, set to TODO. All other fields resolved.
------------------
-->

# Backend Service Constitution


## Core Principles

### I. Technology Stack Discipline
All backend code MUST use Java 17 and Spring Boot 3. PostgreSQL is the only supported database. Docker is required for all environments (dev, staging, prod). No other stack substitutions are permitted without explicit governance approval.

### II. Authentication & Security (NON-NEGOTIABLE)
All endpoints MUST be protected by HTTP Basic Authentication. Default credentials for development/staging are admin/admin123. Credentials MUST be overridden in production. No endpoints may be left unauthenticated. Sensitive config (passwords, secrets) MUST NOT be hardcoded in source except for local dev defaults.

### III. Documentation & API Contract
All REST endpoints MUST be documented using Swagger/OpenAPI. Documentation MUST be auto-generated and accessible at /swagger-ui or equivalent. API changes require corresponding doc updates.

### IV. Versioning & Change Management
All code and API changes MUST follow semantic versioning (MAJOR.MINOR.PATCH). Breaking changes require a major version bump and migration plan. Docker images MUST be tagged with version and 'staging' for pre-release builds.

### V. Testing & CI Discipline
All features MUST include automated tests (unit and integration). CI pipelines MUST run all tests and build Docker images for every commit to main and staging branches. No code may be merged without passing tests and successful build.


## Security & Deployment Constraints

- All database credentials and secrets MUST be managed via environment variables or Docker secrets in non-dev environments.
- Only PostgreSQL is permitted for persistent storage.
- Docker Compose or Kubernetes manifests MUST be provided for local and staging deployments.
- Staging deployments MUST use the same Docker image as production, differing only in environment variables.


## Development Workflow

- All code changes require pull requests and at least one peer review.
- Every PR MUST include or update tests and Swagger docs as appropriate.
- All merges to main or staging trigger CI/CD: test, build, and push Docker images.
- No direct commits to main or staging are permitted.


## Governance

- This constitution supersedes all other workflow or coding practices.
- Amendments require a PR, explicit documentation of changes, and a migration plan if breaking.
- All PRs and reviews MUST verify compliance with these principles.
- Constitution version MUST be incremented according to semantic versioning rules:
	- MAJOR: Backward incompatible governance/principle removals or redefinitions.
	- MINOR: New principle/section added or materially expanded guidance.
	- PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
- Compliance reviews are mandatory at least once per quarter.


**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-02-25

