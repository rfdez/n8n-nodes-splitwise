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
		],
	},
];
