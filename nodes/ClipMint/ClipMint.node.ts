import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IHttpRequestMethods,
  IRequestOptions,
  IDataObject,
} from 'n8n-workflow';

export class ClipMint implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'ClipMint',
    name: 'clipMint',
    icon: 'file:clipmint.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Publish and schedule content to social media via ClipMint',
    defaults: {
      name: 'ClipMint',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'clipMintApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://clipmint.ai',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Post',
            value: 'post',
            description: 'Publish or schedule social media posts',
          },
          {
            name: 'Account',
            value: 'account',
            description: 'Manage connected social accounts',
          },
          {
            name: 'Clip',
            value: 'clip',
            description: 'Manage video clips',
          },
        ],
        default: 'post',
      },

      // ========== POST OPERATIONS ==========
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['post'],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            description: 'Publish content immediately or schedule for later',
            action: 'Create a post',
          },
          {
            name: 'Get Many',
            value: 'getMany',
            description: 'Get a list of posts',
            action: 'Get many posts',
          },
          {
            name: 'Delete',
            value: 'delete',
            description: 'Cancel a scheduled post',
            action: 'Delete a post',
          },
        ],
        default: 'create',
      },

      // Post Create Fields
      {
        displayName: 'Platform',
        name: 'platform',
        type: 'options',
        required: true,
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
          },
        },
        options: [
          { name: 'Twitter/X', value: 'twitter' },
          { name: 'Instagram', value: 'instagram' },
          { name: 'TikTok', value: 'tiktok' },
          { name: 'YouTube', value: 'youtube' },
          { name: 'LinkedIn', value: 'linkedin' },
          { name: 'Facebook', value: 'facebook' },
          { name: 'Pinterest', value: 'pinterest' },
        ],
        default: 'twitter',
        description: 'The social media platform to post to',
      },
      {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
          },
        },
        default: '',
        description: 'The text content/caption for your post',
      },
      {
        displayName: 'Media Source',
        name: 'mediaSource',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
          },
        },
        options: [
          {
            name: 'None',
            value: 'none',
            description: 'Text-only post without media',
          },
          {
            name: 'Clip ID',
            value: 'clipId',
            description: 'Use an existing clip from your ClipMint library',
          },
          {
            name: 'External Video URL',
            value: 'externalUrl',
            description: 'Import video from external source (Kie.ai, D-ID, RunwayML, etc.)',
          },
        ],
        default: 'none',
        description: 'Choose how to attach media to this post',
      },
      {
        displayName: 'Clip ID',
        name: 'clipId',
        type: 'string',
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
            mediaSource: ['clipId'],
          },
        },
        default: '',
        description: 'ClipMint clip ID to attach. Get clip IDs from the Clip resource.',
      },
      {
        displayName: 'External Video URL',
        name: 'externalVideoUrl',
        type: 'string',
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
            mediaSource: ['externalUrl'],
          },
        },
        default: '',
        placeholder: 'https://cdn.kie.ai/videos/generated-123.mp4',
        description: 'URL to external video (Kie.ai, D-ID, RunwayML, etc.). Video will be downloaded to ClipMint before publishing.',
      },
      {
        displayName: 'Save to Library',
        name: 'saveToLibrary',
        type: 'boolean',
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
            mediaSource: ['externalUrl'],
          },
        },
        default: true,
        description: 'Save the imported video to your ClipMint library for future use',
      },
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['create'],
          },
        },
        options: [
          {
            displayName: 'Account ID',
            name: 'accountId',
            type: 'string',
            default: '',
            description: 'Specific account ID to post from. If not provided, uses the default account for the platform.',
          },
          {
            displayName: 'Title',
            name: 'title',
            type: 'string',
            default: '',
            description: 'Title for platforms that support it (YouTube)',
          },
          {
            displayName: 'Schedule For',
            name: 'scheduledFor',
            type: 'dateTime',
            default: '',
            description: 'Schedule the post for a future time (ISO 8601 format). Leave empty to publish immediately.',
          },
        ],
      },

      // Post GetMany Fields
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['getMany'],
          },
        },
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
        default: 50,
        description: 'Max number of results to return',
      },
      {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['getMany'],
          },
        },
        options: [
          {
            displayName: 'Status',
            name: 'status',
            type: 'options',
            options: [
              { name: 'All', value: '' },
              { name: 'Scheduled', value: 'scheduled' },
              { name: 'Published', value: 'published' },
              { name: 'Failed', value: 'failed' },
              { name: 'Pending', value: 'pending' },
            ],
            default: '',
            description: 'Filter posts by status',
          },
          {
            displayName: 'Offset',
            name: 'offset',
            type: 'number',
            default: 0,
            description: 'Offset for pagination',
          },
        ],
      },

      // Post Delete Fields
      {
        displayName: 'Post ID',
        name: 'postId',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['post'],
            operation: ['delete'],
          },
        },
        default: '',
        description: 'The ID of the scheduled post to cancel',
      },

      // ========== ACCOUNT OPERATIONS ==========
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['account'],
          },
        },
        options: [
          {
            name: 'Get Many',
            value: 'getMany',
            description: 'Get list of connected social accounts',
            action: 'Get many accounts',
          },
        ],
        default: 'getMany',
      },

      // ========== CLIP OPERATIONS ==========
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['clip'],
          },
        },
        options: [
          {
            name: 'Get Many',
            value: 'getMany',
            description: 'Get list of video clips',
            action: 'Get many clips',
          },
        ],
        default: 'getMany',
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: {
            resource: ['clip'],
            operation: ['getMany'],
          },
        },
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
        default: 50,
        description: 'Max number of results to return',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    const credentials = await this.getCredentials('clipMintApi');
    const baseURL = (credentials.baseUrl as string) || 'https://clipmint.ai';

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData;

        if (resource === 'post') {
          if (operation === 'create') {
            const platform = this.getNodeParameter('platform', i) as string;
            const content = this.getNodeParameter('content', i) as string;
            
            // Get mediaSource with backward compatibility: default to 'none' but allow legacy clipId
            let mediaSource: string;
            try {
              mediaSource = this.getNodeParameter('mediaSource', i) as string;
            } catch {
              // Legacy workflow without mediaSource - default to 'none'
              mediaSource = 'none';
            }
            
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              accountId?: string;
              title?: string;
              scheduledFor?: string;
            };

            const body: Record<string, unknown> = {
              platform,
              content,
            };

            // Handle media source based on user selection
            if (mediaSource === 'clipId') {
              const clipId = this.getNodeParameter('clipId', i) as string;
              if (clipId) body.clipId = clipId;
            } else if (mediaSource === 'externalUrl') {
              const externalVideoUrl = this.getNodeParameter('externalVideoUrl', i) as string;
              if (!externalVideoUrl) {
                throw new Error('External Video URL is required when using External Video URL media source');
              }
              const saveToLibrary = this.getNodeParameter('saveToLibrary', i) as boolean;
              body.externalVideoUrl = externalVideoUrl;
              body.saveToLibrary = saveToLibrary;
            } else {
              // For 'none' or legacy workflows, try to get clipId for backward compatibility
              try {
                const clipId = this.getNodeParameter('clipId', i) as string;
                if (clipId) body.clipId = clipId;
              } catch {
                // No clipId parameter - text-only post is fine
              }
            }

            if (additionalFields.accountId) body.accountId = additionalFields.accountId;
            if (additionalFields.title) body.title = additionalFields.title;
            if (additionalFields.scheduledFor) body.scheduledFor = additionalFields.scheduledFor;

            const options: IRequestOptions = {
              method: 'POST' as IHttpRequestMethods,
              baseURL,
              uri: '/api/v1/publish',
              body,
              json: true,
            };

            responseData = await this.helpers.requestWithAuthentication.call(
              this,
              'clipMintApi',
              options,
            );

          } else if (operation === 'getMany') {
            const limit = this.getNodeParameter('limit', i) as number;
            const filters = this.getNodeParameter('filters', i) as {
              status?: string;
              offset?: number;
            };

            const qs: IDataObject = { limit };
            if (filters.status) qs.status = filters.status;
            if (filters.offset) qs.offset = filters.offset;

            const options: IRequestOptions = {
              method: 'GET' as IHttpRequestMethods,
              baseURL,
              uri: '/api/v1/posts',
              qs,
              json: true,
            };

            responseData = await this.helpers.requestWithAuthentication.call(
              this,
              'clipMintApi',
              options,
            );

            responseData = responseData.posts;

          } else if (operation === 'delete') {
            const postId = this.getNodeParameter('postId', i) as string;

            const options: IRequestOptions = {
              method: 'DELETE' as IHttpRequestMethods,
              baseURL,
              uri: `/api/v1/posts/${postId}`,
              json: true,
            };

            responseData = await this.helpers.requestWithAuthentication.call(
              this,
              'clipMintApi',
              options,
            );
          }

        } else if (resource === 'account') {
          if (operation === 'getMany') {
            const options: IRequestOptions = {
              method: 'GET' as IHttpRequestMethods,
              baseURL,
              uri: '/api/v1/accounts',
              json: true,
            };

            responseData = await this.helpers.requestWithAuthentication.call(
              this,
              'clipMintApi',
              options,
            );

            responseData = responseData.accounts;
          }

        } else if (resource === 'clip') {
          if (operation === 'getMany') {
            const limit = this.getNodeParameter('limit', i) as number;

            const options: IRequestOptions = {
              method: 'GET' as IHttpRequestMethods,
              baseURL,
              uri: '/api/v1/clips',
              qs: { limit },
              json: true,
            };

            responseData = await this.helpers.requestWithAuthentication.call(
              this,
              'clipMintApi',
              options,
            );

            responseData = responseData.clips;
          }
        }

        if (Array.isArray(responseData)) {
          returnData.push(...responseData.map((item) => ({ json: item })));
        } else {
          returnData.push({ json: responseData });
        }

      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
