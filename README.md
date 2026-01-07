# n8n-nodes-clipmint

Official n8n community node for **ClipMint** - AI Content Engine & Social Media Scheduler.

Automate your social media posting and scheduling with ClipMint's powerful API directly in your n8n workflows.

ClipMint enables fully automated social media publishing and scheduling across multiple platforms from a single n8n workflow.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Supported Platforms

- Twitter/X
- Instagram
- TikTok
- YouTube
- LinkedIn
- Facebook
- Pinterest

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### n8n Cloud / Self-Hosted GUI

1. Go to **Settings → Community Nodes**
2. Click **Install a community node**
3. Enter: `n8n-nodes-clipmint`
4. Confirm installation

### Manual Installation

```bash
npm install n8n-nodes-clipmint
```
> ⚠ **Windows note:**  
> If you are running n8n on Windows and encounter issues installing via the Community Nodes UI,
> you can install manually using `npm install n8n-nodes-clipmint` and restart n8n.
> This is a known limitation with some Windows + Node setups.


## Credentials
ClipMint uses API key authentication for all requests.

### Get Your API Key

1. Log in to [ClipMint](https://clipmint.ai)
2. Go to **Settings → API Keys**
3. Click **Generate New API Key**
4. Copy the key (you won't see it again!)

> **Note:** API access requires the API plan subscription ($9/month).

### Configure Credentials in n8n

1. In n8n, go to **Credentials**
2. Click **Add Credential**
3. Search for "ClipMint API"
4. Paste your API key
5. Save

### Connect Social Accounts

Before posting, make sure your social media accounts are connected in the [ClipMint dashboard](https://clipmint.ai/viral/accounts).

## Operations

### Post

| Operation | Description |
|-----------|-------------|
| **Create** | Publish content immediately or schedule for later |
| **Get Many** | List all posts with filtering options |
| **Delete** | Cancel a scheduled post |

### Account

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all connected social accounts |

### Clip

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all video clips |

## Usage Examples

### Post to Twitter

1. Add a **ClipMint** node to your workflow
2. Select Resource: **Post**
3. Select Operation: **Create**
4. Choose Platform: **Twitter/X**
5. Enter your content text
6. Execute the workflow

### Schedule a Post

1. Add a **ClipMint** node
2. Select Resource: **Post**, Operation: **Create**
3. Choose your platform
4. Enter your content
5. Open **Additional Fields**
6. Set **Schedule For** to your desired date/time
7. Execute the workflow

### Post with Video

1. First, use a **ClipMint** node with Resource: **Clip**, Operation: **Get Many** to list your clips
2. Add another **ClipMint** node for posting
3. Set the **Clip ID** field to the ID from your clips
4. Execute the workflow

## API Endpoints

Base URL: `https://clipmint.ai/api/v1`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/me` | GET | Get authenticated user info |
| `/accounts` | GET | List connected social accounts |
| `/clips` | GET | List video clips |
| `/publish` | POST | Create/schedule a post |
| `/posts` | GET | List posts |
| `/posts/:id` | DELETE | Cancel scheduled post |

## Rate Limits

Rate limits are based on your subscription tier:
- **API Plan**: 100 requests/minute
- **Higher tiers**: Increased limits

## Compatibility

- Tested with n8n version 1.0+
- Requires ClipMint API plan subscription

## Resources

* [ClipMint Website](https://clipmint.ai)
* [ClipMint API Documentation](https://clipmint.ai/docs/api)
* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## Support

- **Issues**: [GitHub Issues](https://github.com/clipmint-ai/n8n-nodes-clipmint/issues)
- **Email**: support@clipmint.ai

## License

[MIT](https://github.com/clipmint-ai/n8n-nodes-clipmint/blob/master/LICENSE.md)
