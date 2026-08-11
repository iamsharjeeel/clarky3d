# ADR: Monitoring baseline

**Date:** 2026-08-11  
**Status:** accepted for pre-launch ops

## Decision

Use platform-native checks first:

- Vercel deployment/runtime logs
- Public `/api/health` for uptime probes
- Scheduled/manual synthetic contact script with reserved example data
- Optional Vercel Analytics/Speed Insights only after privacy review

Do not add third-party session replay, invasive heatmaps, or CRM webhooks until
the owner approves processors in the privacy notice.
