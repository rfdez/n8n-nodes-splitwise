import {
	IAuthenticateGeneric,
  ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SplitwiseApi implements ICredentialType {
	name = 'splitwiseApi';
	displayName = 'Splitwise API';
	documentationUrl = 'https://dev.splitwise.com/#section/Authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
      headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}'
			},
		},
	};
  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://secure.splitwise.com/api/v3.0',
      url: '/get_current_user',
    },
  };
}
