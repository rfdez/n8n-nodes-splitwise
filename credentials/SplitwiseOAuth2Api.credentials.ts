import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

const scopes: string[] = [];

export class SplitwiseOAuth2Api implements ICredentialType {
	name = 'splitwiseOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Splitwise OAuth2 API';
	documentationUrl = 'https://dev.splitwise.com/#section/Authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://secure.splitwise.com/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://secure.splitwise.com/oauth/token',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: `${scopes.join(' ')}`,
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
