import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'delete',
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing group. Destroys all associated records (expenses, etc.).',
				action: 'Delete a group',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get information about a group',
				action: 'Get a group',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: "List the current user's groups",
				action: 'Get many groups',
			},
			{
				name: 'Restore',
				value: 'restore',
				description: 'Restores a deleted group',
				action: 'Restore a group',
			},
		],
	},
];

const sharedGroupFields: INodeProperties[] = [
	{
		displayName:
			'<b>Note:</b> Expenses that are not associated with a group are listed in a group with ID 0.',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAll'],
			},
		},
	},
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
				operation: ['delete', 'get'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
];

const restoreGroupFields: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'id',
		type: 'number',
		description: 'ID of the group',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['restore'],
			},
		},
		typeOptions: {
			minValue: 0,
			numberStepSize: 1,
			numberPrecision: 0,
		},
	},
];

export const groupFields: INodeProperties[] = [...sharedGroupFields, ...restoreGroupFields];
