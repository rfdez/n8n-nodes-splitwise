import { INodeProperties } from 'n8n-workflow';

export const expenseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'create',
		displayOptions: {
			show: {
				resource: ['expense'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an expense',
				action: 'Create an expense',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: "List the current user's expenses",
				action: 'Get many expenses',
			},
			{
				name: 'Get',
				value: 'get',
				description: "Get expense information",
				action: 'Get an expense',
			},
		],
	},
];

const createExpenseFields: INodeProperties[] = [
	{
		displayName: 'Cost',
		name: 'cost',
		type: 'number',
		description: 'A string representation of a decimal value, limited to 2 decimal places',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		typeOptions: {
			minValue: 0,
			numberStepSize: 0.01,
			numberPrecision: 2,
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		description: 'A short description of the expense',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Group Name or ID',
		name: 'group_id',
		type: 'options',
		description:
			'Name or ID of the group to add the expense to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
	{
		displayName: 'Currency Code Name or ID',
		name: 'currency_code',
		type: 'options',
		description:
			'Currency code of the expense (the ID is the Code). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getCurrencies',
		},
	},
	{
		displayName: 'Category Name or ID',
		name: 'category_id',
		type: 'options',
		description:
			'Category of the expense. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getCategories',
		},
	},
	{
		displayName: 'Split Equally',
		name: 'split_equally',
		type: 'hidden',
		description: 'Whether the expense should be split equally',
		default: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Details',
				name: 'details',
				type: 'string',
				default: '',
				description: 'Also known as "notes"',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'The date and time the expense took place',
			},
			{
				displayName: 'Repeats',
				name: 'repeat_interval',
				type: 'options',
				default: 'never',
				description: 'How often the expense repeats',
				options: [
					{
						name: 'Fortnightly',
						value: 'fortnightly',
					},
					{
						name: 'Monthly',
						value: 'monthly',
					},
					{
						name: 'Never',
						value: 'never',
					},
					{
						name: 'Weekly',
						value: 'weekly',
					},
					{
						name: 'Yearly',
						value: 'yearly',
					},
				],
			},
		],
	},
];

const getAllExpenseFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Group Name or ID',
				name: 'group_id',
				type: 'options',
				description:
					'Name or ID of the group to get the expenses. If provided, only expenses in that group will be returned, and `friend_id` will be ignored. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getGroups',
				},
			},
			{
				displayName: 'Friend Name or ID',
				name: 'friend_id',
				type: 'options',
				description:
					'Name or ID of another user. If provided, only expenses between the current and provided user will be returned. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getFriends',
				},
			},
			{
				displayName: 'Dated After',
				name: 'dated_after',
				type: 'dateTime',
				description: 'Only expenses dated after this date will be returned',
				default: '',
			},
			{
				displayName: 'Dated Before',
				name: 'dated_before',
				type: 'dateTime',
				description: 'Only expenses dated before this date will be returned',
				default: '',
			},
			{
				displayName: 'Updated After',
				name: 'updated_after',
				type: 'dateTime',
				description: 'Only expenses updated after this date will be returned',
				default: '',
			},
			{
				displayName: 'Updated Before',
				name: 'updated_before',
				type: 'dateTime',
				description: 'Only expenses updated before this date will be returned',
				default: '',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				description: 'Max number of results to return',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				description: 'Number of results to skip',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
			},
		],
	},
];

const getExpenseFields: INodeProperties[] = [
	{
		displayName: 'Expense ID',
		name: 'id',
		type: 'number',
		description: 'ID of the expense to get',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['get'],
			},
		},
		typeOptions: {
			minValue: 0,
			numberStepSize: 1,
			numberPrecision: 0,
		},
	},
]

export const expenseFields: INodeProperties[] = [...createExpenseFields, ...getAllExpenseFields, ...getExpenseFields];
