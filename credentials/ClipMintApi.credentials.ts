import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class ClipMintApi implements ICredentialType {
  name = 'clipMintApi';
  displayName = 'ClipMint API';
  documentationUrl = 'https://clipmint.ai/docs/api';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Your ClipMint API key. Generate one from Settings → API Keys in your ClipMint dashboard.',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://clipmint.ai',
      description: 'The ClipMint API base URL. Only change this if using a self-hosted instance.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v1/me',
      method: 'GET',
    },
  };
}
