import { IDataObject, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeOperationError } from 'n8n-workflow';
import { expenseFields, expenseOperations } from './ExpenseDescription';
import { getCategories, getCurrencies, getGroups, splitwiseApiRequest } from './GenericFunctions';

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
				default: 'apiKey',
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
				],
				default: 'expense',
			},
			...expenseOperations,
			...expenseFields,
		],
	}

	methods = {
		loadOptions: {
			getCategories,
			getCurrencies,
			getGroups
		},
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'expense') {
					if (operation === 'create') {
						const cost = this.getNodeParameter('cost', i) as number;
						const description = this.getNodeParameter('description', i) as string;
						const currencyCode = this.getNodeParameter('currency_code', i) as string;
						const categoryId = this.getNodeParameter('category_id', i) as number;
						const groupId = this.getNodeParameter('group_id', i) as number;
						const splitEqually = this.getNodeParameter('split_equally', i) as boolean;

						const body: IDataObject = {
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

						const response = await splitwiseApiRequest.call(this, 'POST', '/create_expense', body);

						if (response.error || response.errors?.base?.length) {
							const errorMessage = response.error ? response.error : response.errors.base[0];
							throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: i });
						}

						returnData.push(response.expenses);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}

				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}