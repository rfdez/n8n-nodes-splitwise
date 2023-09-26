import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { expenseFields, expenseOperations } from './ExpenseDescription';
import {
	getCategories,
	getCurrencies,
	getGroups,
	getFriends,
	splitwiseApiRequest,
} from './GenericFunctions';
import { groupFields, groupOperations } from './GroupDescription';

export class Splitwise implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Splitwise',
		name: 'splitwise',
		icon: 'file:splitwise.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Splitwise API',
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
						authentication: ['apiKey'],
					},
				},
			},
			{
				name: 'splitwiseOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://secure.splitwise.com/api/v3.0',
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
						value: 'apiKey',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
				],
				default: 'oAuth2',
			},
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
					{
						name: 'Group',
						value: 'group',
					},
				],
				default: 'expense',
			},
			...expenseOperations,
			...expenseFields,
			...groupOperations,
			...groupFields,
		],
	};

	methods = {
		loadOptions: {
			getCategories,
			getCurrencies,
			getFriends,
			getGroups,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let body: IDataObject;
		let query: IDataObject;
		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				body = {};
				query = {};

				if (resource === 'group') {
					if (operation === 'delete') {
						const id = this.getNodeParameter('id', i) as number;

						responseData = await splitwiseApiRequest.call(this, 'POST', `/delete_group/${id}`, {});

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}
					}

					if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as number;

						responseData = await splitwiseApiRequest.call(this, 'GET', `/get_group/${id}`, {});

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}

						responseData = responseData.group;
					}

					if (operation === 'getAll') {
						responseData = await splitwiseApiRequest.call(this, 'GET', '/get_groups', {});

						if (responseData.error) {
							const errorMessage = responseData.error;

							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}

						responseData = responseData.groups;
					}

					if (operation === 'restore') {
						const id = this.getNodeParameter('id', i) as number;

						responseData = await splitwiseApiRequest.call(
							this,
							'POST',
							`/undelete_group/${id}`,
							{},
						);

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}
					}
				}

				if (resource === 'expense') {
					if (operation === 'create') {
						const cost = this.getNodeParameter('cost', i) as number;
						const description = this.getNodeParameter('description', i) as string;
						const currencyCode = this.getNodeParameter('currency_code', i) as string;
						const categoryId = this.getNodeParameter('category_id', i) as number;
						const groupId = this.getNodeParameter('group_id', i) as number;
						const splitEqually = this.getNodeParameter('split_equally', i) as boolean;

						body = {
							cost: cost.toFixed(2),
							description,
							currency_code: currencyCode,
							category_id: categoryId,
							group_id: groupId,
							split_equally: splitEqually,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (Object.keys(additionalFields).length) {
							Object.assign(body, additionalFields);
						}

						responseData = await splitwiseApiRequest.call(this, 'POST', '/create_expense', body);

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}

						responseData = responseData.expense;
					}

					if (operation === 'delete') {
						const id = this.getNodeParameter('id', i) as number;

						responseData = await splitwiseApiRequest.call(
							this,
							'POST',
							`/delete_expense/${id}`,
							{},
						);

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}
					}

					if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as number;

						responseData = await splitwiseApiRequest.call(this, 'GET', `/get_expense/${id}`, {});

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}

						responseData = responseData.expense;
					}

					if (operation === 'getAll') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (!additionalFields.limit) {
							additionalFields.limit = 50;
						}

						if (Object.keys(additionalFields).length) {
							Object.assign(query, additionalFields);
						}

						responseData = await splitwiseApiRequest.call(this, 'GET', '/get_expenses', {}, query);

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}

						responseData = responseData.expenses;
					}

					if (operation === 'restore') {
						const id = this.getNodeParameter('id', i) as number;

						responseData = await splitwiseApiRequest.call(
							this,
							'POST',
							`/undelete_expense/${id}`,
							{},
						);

						if (responseData.error || responseData.errors?.base?.length) {
							const errorMessage = responseData.error
								? responseData.error
								: responseData.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}
					}
				}

				returnData.push(
					...this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData as IDataObject[]),
						{
							itemData: { item: i },
						},
					),
				);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}

				throw error;
			}
		}

		return [returnData as INodeExecutionData[]];
	}
}
