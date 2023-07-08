import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Splitwise implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Splitwise',
		name: 'splitwise',
		icon: 'file:splitwise.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Splitwise API',
		defaults: {
			name: 'Splitwise',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'splitwiseApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['splitwiseApi'],
					},
				},
			},
			{
				name: 'splitwiseOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['splitwiseOAuth2Api'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://secure.splitwise.com/api/v3.0',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'API Key',
						value: 'splitwiseApi',
					},
					{
						name: 'OAuth2',
						value: 'splitwiseOAuth2Api',
					},
				],
				default: 'splitwiseApi',
			},
			// ----------------------------------
			//         expense
			//         ...
			// ----------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Expense',
						value: 'expense',
					},
				],
				default: 'expense',
			},
			// ----------------------------------
			//         expense
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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
						routing: {
							request: {
								method: 'POST',
								url: '/create_expense',
							},
						},
					},
				],
				default: 'create',
			},
			// ----------------------------------
			//         additionalFields
			// ----------------------------------
			// {
			// 	displayName: 'Additional Fields',
			// 	name: 'additionalFields',
			// 	type: 'collection',
			// 	placeholder: 'Add Field',
			// 	default: {},
			// 	options: [
			// 		{
			// 			displayName: 'Category',
			// 			name: 'category_id',
			// 			type: 'options',
			// 			default: '',
			// 			options:[],
			// 		},
			// 		{
			// 			displayName: 'Currency Code',
			// 			name: 'currency_code',
			// 			type: 'string',
			// 			default: '',
			// 			options:[],
			// 		}
			// 	],
			// 	displayOptions: {
			// 		show: {
			// 			resource: [
			// 				'expense'
			// 			],
			// 			operation: [
			// 				'create'
			// 			]
			// 		},
			// 	},
			// },
			// ----------------------------------
			//         expense:create
			// ----------------------------------
			// {
			// 	displayName: 'Cost',
			// 	description: 'Cost of the expense',
			// 	name: 'cost',
			// 	type: 'number',
			// 	default: 0,
			// 	required: true,
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['expense'],
			// 			operation: ['create'],
			// 		},
			// 	},
			// },
			// {
			// 	displayName: 'Group Name or ID',
			// 	description: 'Name or ID of the group to add the expense to',
			// 	name: 'group_id',
			// 	type: 'options',
			// 	default: '',
			// 	required: true,
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['expense'],
			// 			operation: ['create'],
			// 		},
			// 	},
			// 	typeOptions: {
			// 		loadOptions: {
			// 			routing: {
			// 				request: {
			// 					method: 'GET',
			// 					url: '/get_groups',
			// 				},
			// 				output: {
			// 					postReceive: [
			// 						{
			// 							type: 'rootProperty',
			// 							properties: {
			// 								property: 'groups',
			// 							},
			// 						},
			// 						{
			// 							type: 'setKeyValue',
			// 							properties: {
			// 								name: '={{$responseItem.name}} ({{$responseItem.group_type}})',
			// 								value: '={{$responseItem.id}}',
			// 							},
			// 						},
			// 						{
			// 							type: 'sort',
			// 							properties: {
			// 								key: 'name',
			// 							},
			// 						},
			// 					],
			// 				},
			// 			},
			// 		},
			// 	},
			// },
		],
	}
}
