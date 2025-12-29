# BharatAtlas API Documentation

## Overview

BharatAtlas provides civic-grade APIs for accessing place data, narratives, and opportunities across India. Our APIs are designed to inform, not exploit.

## Core Principles

- **Open by default**: Read access requires no authentication
- **Trust embedded**: Every response includes confidence and source metadata
- **Rate limited**: Fair limits protect system availability
- **Attribution required**: Data use requires attribution
- **Ethics first**: Harmful data combinations are blocked

## Base URL

```
https://api.bharatatlas.in/v1
```

## Authentication

Public read endpoints require no authentication. Write operations and bulk access require approval.

## Rate Limits

- **Anonymous**: 50 requests/minute, 1,000/hour, 10,000/day
- **Authenticated**: 100 requests/minute, 5,000/hour, 50,000/day
- **Research**: 500 requests/minute (requires approval)

## Endpoints

### Get Place Profile

```
GET /api/v1/place/{placeId}
```

**Purpose**: Retrieve comprehensive place profile for public viewing.

**What this returns**: This endpoint returns descriptive, not authoritative, insights. All data includes confidence scores and source attribution.

**Parameters**:
- `placeId` (required): Unique place identifier

**Response**:
```json
{
  "data": {
    "placeId": "karnataka",
    "canonicalName": "Karnataka",
    "population": {
      "value": 61095297,
      "confidence": 85,
      "source": "CENSUS_2011",
      "knowledgeType": "OFFICIAL_STATISTIC",
      "lastUpdated": "2011"
    }
  },
  "metadata": {
    "confidence": {
      "overall": 75,
      "level": "medium"
    },
    "sources": ["CENSUS_2011", "NSSO"],
    "dataGranularity": "state"
  },
  "attribution": {
    "source": "BharatAtlas",
    "license": "CC-BY-NC 4.0",
    "requirement": "Attribution required when publishing"
  }
}
```

### Search Places

```
GET /api/v1/search?q={query}
```

**Purpose**: Search for places by name or criteria.

**What this returns**: Matching places with basic metadata. Limited to 50 results to prevent bulk scraping.

**Parameters**:
- `q` (required): Search query
- `limit` (optional): Max results (default: 10, max: 50)

### Get Data Sources

```
GET /api/v1/sources
```

**Purpose**: List all data sources with metadata.

**What this returns**: Source registry with reliability scores, coverage information, and limitations.

## Error Responses

Errors use neutral language and provide helpful guidance:

```json
{
  "error": {
    "code": 429,
    "message": "Request rate limit reached",
    "guidance": "Please wait before making additional requests"
  }
}
```

## Data Licensing

All data is licensed under **CC-BY-NC 4.0** (Creative Commons Attribution-NonCommercial 4.0).

**Requirements**:
- Attribution required: "Data from BharatAtlas (bharatatlas.in)"
- Non-commercial use only
- Commercial use requires separate license

## Ethical Use

Some data combinations are blocked to prevent:
- Discriminatory profiling
- Surveillance applications
- Harmful correlations (e.g., demographics + crime rates)

## Research Access

Need higher rate limits or bulk access?

Apply at: https://bharatatlas.in/research-access

**Requirements**:
- Institutional affiliation
- Clear research purpose
- Ethics approval (if applicable)
- Data use plan

## Deprecation Policy

Deprecated endpoints include warning headers 90 days before retirement:

```
X-API-Deprecated: true
X-API-Retirement-Date: 2025-06-30
X-API-Migration-Guide: https://docs.bharatatlas.in/migration/v2
```

## Support

- Documentation: https://docs.bharatatlas.in
- Issues: https://github.com/bharatatlas/issues
- Email: api@bharatatlas.in

## Changelog

### v1.0 (2025-12-29)
- Initial public release
- Place profiles, narratives, opportunities
- Source registry
- Governance logs

---

**Remember**: These APIs exist to inform, not exploit. Use responsibly.
