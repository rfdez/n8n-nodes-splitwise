import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description:
					"List the current user's groups. Expenses that are not associated with a group are listed in a group with ID 0.",
				action: 'Get many groups',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get information about a group',
				action: 'Get a group',
			},
		],
	},
];

const sharedGroupFields: INodeProperties[] = [
	{
		displayName: 'Group Name or ID',
		name: 'id',
		type: 'options',
		description:
			'Name or ID of the group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['get'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
];

export const groupFields: INodeProperties[] = [...sharedGroupFields];
