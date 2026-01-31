---
sidebar_position: 2
title: Generate Endpoint
---

# Generate Endpoint

The `/api/generate` endpoint provides AI-powered content generation for testing and development purposes.

## Endpoint Details

**Method**: POST  
**URL**: `https://proto-hackathon-base.tempegoreng.my.id/api/generate`  
**Authentication**: None (public endpoint)  
**Rate Limit**: 10 requests per hour per IP

## Request Format

### Content-Type

```
Content-Type: application/json
```

### Request Body

```json
{
  "topic": "Your content topic here",
  "model": "llama-3.3-70b-versatile" // optional
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | Yes | The subject or topic for content generation |
| `model` | string | No | AI model selection (defaults to `llama-3.3-70b-versatile`) |

### Supported Models

| Model ID | Name | Speed | Quality | Best For |
|----------|------|-------|---------|----------|
| `llama-3.3-70b-versatile` | LLaMA 3.3 70B | Medium (5-8s) | Excellent | Professional content, default choice |
| `llama-3.1-8b-instant` | LLaMA 3.1 8B | Fast (2-3s) | Good | Quick generation, simple topics |

## Response Format

### Success Response (200 OK)

```json
{
  "result": "AI-generated content here...\n\nWith proper formatting\n\n#Hashtags #Included"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `result` | string | Generated LinkedIn-style content with formatting |

**Note**: The `result` string contains `\n` characters for line breaks. In your frontend, use CSS `white-space: pre-wrap;` to preserve formatting.

### Error Response (4xx/5xx)

```json
{
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

## Examples

### Example 1: High Quality Generation (Default)

**Request:**
```bash
curl -X POST https://proto-hackathon-base.tempegoreng.my.id/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "The Future of AI Agents"
  }'
```

**Response:**
```json
{
  "result": "AI Agents are reshaping how we work.\n\nRecent developments in autonomous AI systems show:\n\n1. Agent-to-agent communication is becoming seamless\n2. Task automation reaching 80%+ efficiency  \n3. Integration with existing tools is now mainstream\n\nThe question isn't if you'll use AI agents—it's how soon.\n\n#AI #Automation #FutureOfWork"
}
```

---

### Example 2: Fast Generation

**Request:**
```bash
curl -X POST https://proto-hackathon-base.tempegoreng.my.id/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Monday Motivation",
    "model": "llama-3.1-8b-instant"
  }'
```

**Response:**
```json
{
  "result": "Start your week strong.\n\nMonday is a fresh start. Here's how to make it count:\n\n1. Set clear goals for the week\n2. Prioritize your most important task\n3. Take action immediately\n\nSuccess is built one Monday at a time.\n\n#MondayMotivation #Productivity"
}
```

---

### Example 3: JavaScript/TypeScript

```typescript
async function generateContent(topic: string, model?: string) {
  const response = await fetch(
    'https://proto-hackathon-base.tempegoreng.my.id/api/generate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        model: model || 'llama-3.3-70b-versatile',
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Generation failed');
  }

  const data = await response.json();
  return data.result;
}

// Usage
const content = await generateContent('AI in Healthcare');
console.log(content);
```

---

### Example 4: Python

```python
import requests

def generate_content(topic, model='llama-3.3-70b-versatile'):
    url = 'https://proto-hackathon-base.tempegoreng.my.id/api/generate'
    
    payload = {
        'topic': topic,
        'model': model
    }
    
    response = requests.post(url, json=payload)
    response.raise_for_status()
    
    return response.json()['result']

# Usage
content = generate_content('Blockchain Scalability')
print(content)
```

---

### Example 5: React Component

```typescript
import { useState } from 'react';

function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://proto-hackathon-base.tempegoreng.my.id/api/generate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        }
      );

      const data = await response.json();
      setContent(data.result);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic..."
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {content && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </pre>
      )}
    </div>
  );
}
```

## Error Handling

### Common Errors

#### Missing Topic (400)

**Request:**
```json
{
  "model": "llama-3.3-70b-versatile"
}
```

**Response:**
```json
{
  "error": "Topic is required",
  "code": "MISSING_TOPIC"
}
```

---

#### Invalid Model (400)

**Request:**
```json
{
  "topic": "AI",
  "model": "invalid-model"
}
```

**Response:**
```json
{
  "error": "Invalid model specified",
  "code": "INVALID_MODEL"
}
```

---

#### Rate Limit Exceeded (429)

**Response:**
```json
{
  "error": "Rate limit exceeded. Try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 3600
}
```

**Headers:**
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640000000
Retry-After: 3600
```

---

#### Server Error (500)

**Response:**
```json
{
  "error": "AI generation failed",
  "code": "AI_ERROR"
}
```

### Error Handling Best Practices

```typescript
async function safeGenerate(topic: string) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const error = await response.json();
      
      // Handle specific errors
      switch (error.code) {
        case 'MISSING_TOPIC':
          throw new Error('Please provide a topic');
        case 'INVALID_MODEL':
          throw new Error('Selected model is not available');
        case 'RATE_LIMIT_EXCEEDED':
          throw new Error(`Rate limit exceeded. Try again in Rp. {error.retryAfter}s`);
        default:
          throw new Error(error.error || 'Generation failed');
      }
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
}
```

## Content Formatting

The generated content includes:
- **Line Breaks**: `\n` characters for paragraph separation
- **Numbered Lists**: Markdown-style numbering
- **Hashtags**: Relevant hashtags at the end
- **Professional Tone**: LinkedIn-appropriate language

### Display Formatting

**CSS for Proper Display:**
```css
.generated-content {
  white-space: pre-wrap; /* Preserve line breaks */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  line-height: 1.6;
  color: #333;
}
```

**React Display:**
```tsx
<div className="generated-content">
  {content}
</div>
```

## Performance

### Response Times

| Model | Typical Response Time | Character Count |
|-------|---------------------|-----------------|
| llama-3.3-70b-versatile | 5-8 seconds | 300-500 chars |
| llama-3.1-8b-instant | 2-3 seconds | 250-400 chars |

**Factors Affecting Speed:**
- Model size (70B vs 8B parameters)
- Research integration (Pro/Premium tiers)
- Server load
- Topic complexity

### Optimization Tips

1. **Use Fast Model for Testing**: `llama-3.1-8b-instant` during development
2. **Implement Loading States**: Show spinner during generation
3. **Cache Results**: Store generated content locally
4. **Retry Logic**: Implement exponential backoff for errors

## Testing

### Test Topics

Good topics for testing:

```typescript
const testTopics = [
  'AI and Machine Learning',
  'Blockchain Technology',
  'Remote Work Best Practices',
  'Leadership Skills',
  'Startup Fundraising',
  'Product Management',
];
```

### Integration Testing

```typescript
describe('Generate Endpoint', () => {
  it('should generate content for valid topic', async () => {
    const result = await generateContent('Testing AI');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(100);
  });

  it('should handle invalid model', async () => {
    await expect(
      generateContent('Topic', 'invalid-model')
    ).rejects.toThrow();
  });

  it('should handle missing topic', async () => {
    await expect(
      generateContent('')
    ).rejects.toThrow();
  });
});
```

## Limitations

**Current Limitations:**
- **Rate Limited**: 10 requests/hour on free tier
- **No Payment**: Testing endpoint only
- **Public Access**: No authentication or user tracking
- **Fixed Format**: LinkedIn-style posts only

**For Production Use:**
- Use `/api/payment` endpoint with X402 payment verification
- Implement user authentication
- Track usage per user
- Custom content formats available
