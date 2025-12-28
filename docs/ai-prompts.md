# AI Prompts for BharatAtlas

## 🤖 Overview

This document contains AI prompts and templates used throughout the BharatAtlas project for content generation, data analysis, and intelligent features.

## 📝 Content Generation Prompts

### 1. Location Description Generator

**Purpose**: Generate engaging, informative descriptions for cities, districts, and regions.

**Prompt Template**:
```
Generate a comprehensive description for {LOCATION_NAME}, {STATE_NAME}, India.

Include the following sections:
1. Overview (2-3 sentences)
2. Historical Significance (if applicable)
3. Geographic Features
4. Cultural Highlights
5. Economic Profile
6. Notable Attractions
7. Interesting Facts (3-5 bullet points)

Tone: Informative, engaging, neutral
Length: 200-300 words
Audience: General public, students, tourists

Data Context:
- Population: {POPULATION}
- Area: {AREA_SQ_KM} sq km
- Literacy Rate: {LITERACY_RATE}%
- Major Languages: {LANGUAGES}
- Climate: {CLIMATE_TYPE}

Ensure accuracy and avoid speculation. If information is uncertain, omit that section.
```

### 2. Opportunity Identification Prompt

**Purpose**: Identify business and development opportunities based on regional data.

**Prompt Template**:
```
Analyze the following data for {LOCATION_NAME}, {STATE_NAME} and identify potential opportunities:

Demographics:
- Population: {POPULATION}
- Age Distribution: {AGE_DISTRIBUTION}
- Literacy Rate: {LITERACY_RATE}%
- Employment Rate: {EMPLOYMENT_RATE}%

Infrastructure:
- Road Connectivity: {ROAD_DENSITY}
- Railway Stations: {RAILWAY_COUNT}
- Airports: {AIRPORT_COUNT}
- Internet Penetration: {INTERNET_PENETRATION}%

Economy:
- Primary Industries: {INDUSTRIES}
- GDP per Capita: {GDP_PER_CAPITA}
- Growth Rate: {GROWTH_RATE}%

Identify:
1. Underserved Markets (3-5 opportunities)
2. Infrastructure Gaps (2-3 areas)
3. Business Potential (3-5 sectors)
4. Development Priorities (2-3 areas)

For each opportunity, provide:
- Description (1-2 sentences)
- Rationale (data-driven justification)
- Potential Impact (High/Medium/Low)
- Investment Required (Estimated range)

Format as structured JSON.
```

### 3. Comparative Analysis Prompt

**Purpose**: Compare two or more locations across multiple dimensions.

**Prompt Template**:
```
Compare the following locations and provide insights:

Locations: {LOCATION_1}, {LOCATION_2}, {LOCATION_3}

Comparison Dimensions:
1. Demographics (population, density, literacy)
2. Economy (GDP, industries, employment)
3. Infrastructure (roads, connectivity, facilities)
4. Quality of Life (healthcare, education, safety)
5. Development Potential

For each dimension:
- Rank the locations (1st, 2nd, 3rd)
- Provide key differentiators
- Highlight strengths and weaknesses
- Suggest improvement areas

Output Format:
- Summary table
- Detailed analysis (200-300 words)
- Recommendations for each location

Data:
{STRUCTURED_DATA_JSON}
```

## 🔍 Data Analysis Prompts

### 4. Trend Detection Prompt

**Purpose**: Identify trends in time-series data.

**Prompt Template**:
```
Analyze the following time-series data for {METRIC_NAME} in {LOCATION_NAME}:

Data: {TIME_SERIES_DATA}
Period: {START_DATE} to {END_DATE}
Frequency: {FREQUENCY}

Identify:
1. Overall Trend (increasing/decreasing/stable)
2. Seasonality (if applicable)
3. Anomalies or outliers
4. Significant changes or inflection points
5. Forecast for next {FORECAST_PERIOD}

Provide:
- Statistical summary (mean, median, std dev, growth rate)
- Visual description of the trend
- Potential explanatory factors
- Confidence level in forecast (High/Medium/Low)
- Recommendations based on trend

Format as structured JSON with narrative summary.
```

### 5. Anomaly Detection Prompt

**Purpose**: Detect unusual patterns or outliers in data.

**Prompt Template**:
```
Examine the following dataset for {LOCATION_NAME} and identify anomalies:

Dataset: {DATASET_NAME}
Metrics: {METRIC_LIST}
Baseline: {BASELINE_DATA}
Current: {CURRENT_DATA}

Detect:
1. Statistical outliers (values beyond 2-3 standard deviations)
2. Unexpected patterns (sudden spikes/drops)
3. Inconsistencies (data that doesn't align with related metrics)
4. Missing or incomplete data

For each anomaly:
- Description
- Severity (Critical/High/Medium/Low)
- Potential causes
- Recommended action
- Impact on overall analysis

Prioritize anomalies by severity and potential impact.
```

## 🗺️ Map & Visualization Prompts

### 6. Map Layer Recommendation Prompt

**Purpose**: Suggest relevant map layers based on user context.

**Prompt Template**:
```
User Context:
- Current Location: {LOCATION}
- User Type: {USER_TYPE} (citizen/business/researcher/tourist)
- Current View: {MAP_VIEW} (state/district/city)
- Time of Day: {TIME}
- Previous Interactions: {INTERACTION_HISTORY}

Available Layers:
{LAYER_LIST_WITH_DESCRIPTIONS}

Recommend:
1. Top 3 most relevant layers for this user
2. Rationale for each recommendation
3. Suggested layer order (bottom to top)
4. Complementary layers that work well together

Consider:
- User's likely intent
- Contextual relevance
- Visual clarity (avoid overcrowding)
- Data availability for current view

Output as ranked list with explanations.
```

### 7. Data Visualization Suggestion Prompt

**Purpose**: Recommend the best visualization type for given data.

**Prompt Template**:
```
Data Characteristics:
- Type: {DATA_TYPE} (categorical/numerical/temporal/geospatial)
- Dimensions: {DIMENSION_COUNT}
- Size: {DATA_POINTS} data points
- Purpose: {ANALYSIS_PURPOSE}
- Audience: {TARGET_AUDIENCE}

Variables:
{VARIABLE_DESCRIPTIONS}

Recommend:
1. Primary visualization type (chart/map/table)
2. Specific chart type (if applicable)
3. Color scheme
4. Interactive features
5. Annotations or highlights

Provide:
- Rationale for recommendation
- Alternative options
- Accessibility considerations
- Mobile vs desktop differences

Ensure the visualization effectively communicates the intended insight.
```

## 💬 Natural Language Query Prompts

### 8. Query Understanding Prompt

**Purpose**: Parse and understand natural language queries about India.

**Prompt Template**:
```
User Query: "{USER_QUERY}"

Parse the query and extract:
1. Intent (search/compare/analyze/navigate/learn)
2. Location(s) mentioned
3. Metrics or data types of interest
4. Time period (if applicable)
5. Comparison or filtering criteria
6. Output format preference

Disambiguate:
- Resolve location ambiguities (e.g., "Salem" could be Tamil Nadu or Oregon)
- Infer implicit context
- Identify missing information

Generate:
1. Structured query object (JSON)
2. Clarifying questions (if needed)
3. Suggested related queries
4. Expected result type

Example Output:
{
  "intent": "compare",
  "locations": ["Mumbai", "Delhi", "Bangalore"],
  "metrics": ["population", "gdp", "literacy_rate"],
  "output": "comparison_table",
  "confidence": 0.95
}
```

### 9. Response Generation Prompt

**Purpose**: Generate natural language responses to user queries.

**Prompt Template**:
```
User Query: "{USER_QUERY}"
Retrieved Data: {DATA_JSON}
Context: {CONTEXT}

Generate a natural language response that:
1. Directly answers the user's question
2. Provides relevant context
3. Highlights key insights
4. Suggests related information
5. Maintains conversational tone

Response Structure:
- Direct Answer (1-2 sentences)
- Supporting Details (2-3 sentences)
- Key Insights (bullet points)
- Related Information (optional)
- Follow-up Suggestions (optional)

Tone: Informative, friendly, concise
Length: 100-200 words
Avoid: Jargon, speculation, bias

Ensure factual accuracy and cite data sources when appropriate.
```

## 🎯 Opportunity Engine Prompts

### 10. Market Gap Analysis Prompt

**Purpose**: Identify underserved markets and opportunities.

**Prompt Template**:
```
Analyze market gaps for {LOCATION_NAME}, {STATE_NAME}:

Population Data:
- Total: {POPULATION}
- Demographics: {AGE_GENDER_DISTRIBUTION}
- Income Levels: {INCOME_DISTRIBUTION}

Existing Services:
- Retail: {RETAIL_DENSITY}
- Healthcare: {HEALTHCARE_FACILITIES}
- Education: {EDUCATIONAL_INSTITUTIONS}
- Entertainment: {ENTERTAINMENT_OPTIONS}
- Food & Dining: {RESTAURANT_COUNT}

Benchmarks (similar cities):
{BENCHMARK_DATA}

Identify:
1. Underserved Categories (5-10 categories)
2. Supply-Demand Gaps
3. Emerging Needs (based on demographics)
4. Competitive Intensity (Low/Medium/High)

For each gap:
- Category name
- Current supply vs estimated demand
- Target customer segment
- Market size estimate
- Entry barriers (Low/Medium/High)
- Recommended business models

Prioritize by market potential and feasibility.
```

### 11. Investment Opportunity Prompt

**Purpose**: Identify and evaluate investment opportunities.

**Prompt Template**:
```
Evaluate investment opportunities in {LOCATION_NAME}:

Economic Indicators:
- GDP Growth: {GDP_GROWTH}%
- Industrial Output: {INDUSTRIAL_OUTPUT}
- Employment Rate: {EMPLOYMENT_RATE}%
- Infrastructure Score: {INFRASTRUCTURE_SCORE}/100

Government Initiatives:
{GOVERNMENT_SCHEMES_AND_INCENTIVES}

Sector Analysis:
{SECTOR_WISE_DATA}

Identify:
1. High-Potential Sectors (3-5 sectors)
2. Infrastructure Projects (public/private)
3. Real Estate Opportunities
4. Technology & Innovation Areas
5. Social Impact Investments

For each opportunity:
- Sector/Type
- Investment Range
- Expected ROI
- Risk Level (Low/Medium/High)
- Time Horizon
- Key Success Factors
- Government Support Available

Provide investment thesis (2-3 paragraphs) for top 3 opportunities.
```

## 🔧 System Prompts

### 12. Data Quality Check Prompt

**Purpose**: Validate data quality and consistency.

**Prompt Template**:
```
Validate the following dataset for {DATASET_NAME}:

Data: {DATA_SAMPLE}
Schema: {EXPECTED_SCHEMA}
Source: {DATA_SOURCE}
Last Updated: {UPDATE_DATE}

Check for:
1. Completeness (missing values, null fields)
2. Accuracy (outliers, impossible values)
3. Consistency (cross-field validation)
4. Timeliness (data freshness)
5. Format (data type compliance)

For each issue found:
- Field name
- Issue type
- Severity (Critical/High/Medium/Low)
- Current value
- Expected value or range
- Recommended action

Generate:
- Quality score (0-100)
- Pass/Fail status
- Detailed issue report
- Remediation suggestions

Flag critical issues that require immediate attention.
```

### 13. Content Moderation Prompt

**Purpose**: Moderate user-generated content.

**Prompt Template**:
```
Review the following user-submitted content:

Content Type: {CONTENT_TYPE} (text/image/comment)
Content: {USER_CONTENT}
User: {USER_ID}
Location: {LOCATION_CONTEXT}

Check for:
1. Inappropriate language or hate speech
2. Misinformation or false claims
3. Spam or promotional content
4. Personal information (PII)
5. Copyright violations
6. Relevance to location/topic

Evaluate:
- Approve/Reject/Flag for Review
- Confidence Level (0-100%)
- Specific issues (if any)
- Suggested edits (if applicable)
- Category violations

If rejected:
- Reason for rejection
- User-facing explanation
- Suggested improvements

Maintain high standards while being fair and inclusive.
```

## 📊 Reporting Prompts

### 14. Executive Summary Generator

**Purpose**: Generate executive summaries of regional data.

**Prompt Template**:
```
Create an executive summary for {LOCATION_NAME}, {STATE_NAME}:

Data Snapshot:
{COMPREHENSIVE_DATA_JSON}

Generate a 1-page executive summary including:

1. **At a Glance** (key metrics in 4-6 bullet points)
2. **Strengths** (top 3 competitive advantages)
3. **Challenges** (top 3 areas needing attention)
4. **Opportunities** (top 3 growth areas)
5. **Outlook** (1-paragraph future projection)

Audience: Business leaders, policymakers, investors
Tone: Professional, data-driven, actionable
Length: 300-400 words

Use clear, concise language. Highlight actionable insights.
Include 2-3 key statistics to support each point.
```

## 🎓 Best Practices

### Prompt Engineering Guidelines

1. **Be Specific**: Clearly define the task, context, and expected output
2. **Provide Context**: Include relevant data and background information
3. **Structure Output**: Specify desired format (JSON, markdown, etc.)
4. **Set Constraints**: Define length, tone, audience
5. **Include Examples**: Show desired output format when possible
6. **Iterate**: Refine prompts based on results
7. **Version Control**: Track prompt versions and performance

### Quality Assurance

- Test prompts with diverse inputs
- Validate outputs against ground truth
- Monitor for bias and errors
- Collect user feedback
- A/B test prompt variations
- Document performance metrics

---

**Last Updated**: December 28, 2025  
**Maintained By**: BharatAtlas AI Team  
**Review Frequency**: Monthly
