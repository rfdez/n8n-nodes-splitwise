import {
	IHookFunctions,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	INodePropertyOptions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

export async function splitwiseApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: object,
	query?: IDataObject,
	uri?: string | undefined,
): Promise<any> {
	const authenticationMethod = this.getNodeParameter('authentication', '') as string;

	const options: IDataObject = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs: query,
		uri: uri || `https://secure.splitwise.com/api/v3.0${endpoint}`,
		json: true,
	};

	const credentialsType = authenticationMethod === 'apiKey' ? 'splitwiseApi' : 'splitwiseOAuth2Api';

	return this.helpers.requestWithAuthentication.call(this, credentialsType, options);
}

export async function getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = '/get_categories';
	const responseData = await splitwiseApiRequest.call(this, 'GET', endpoint, {});

	if (responseData.categories === undefined) {
		throw new NodeApiError(this.getNode(), responseData as JsonObject, {
			message: 'No data got returned',
		});
	}

	const returnData: INodePropertyOptions[] = [];
	for (const category of responseData.categories) {
		const categoryName = category.name;
		const categoryId = category.id;

		returnData.push({
			name: categoryName,
			value: categoryId,
		});

		if (category.subcategories !== undefined) {
			for (const subcategory of category.subcategories) {
				const subcategoryName = subcategory.name;
				const subcategoryId = subcategory.id;

				returnData.push({
					name: `${subcategoryName} (${categoryName})`,
					value: subcategoryId,
				});
			}
		}
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}

export async function getCurrencies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = '/get_currencies';
	const responseData = await splitwiseApiRequest.call(this, 'GET', endpoint, {});

	if (responseData.currencies === undefined) {
		throw new NodeApiError(this.getNode(), responseData as JsonObject, {
			message: 'No data got returned',
		});
	}

	const returnData: INodePropertyOptions[] = [];
	for (const currency of responseData.currencies) {
		const currencyCode = currency.currency_code;

		returnData.push({
			name: currencyCode,
			value: currencyCode,
		});
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}

export async function getFriends(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = '/get_friends';
	const responseData = await splitwiseApiRequest.call(this, 'GET', endpoint, {});

	if (responseData.friends === undefined) {
		throw new NodeApiError(this.getNode(), responseData as JsonObject, {
			message: 'No data got returned',
		});
	}

	const returnData: INodePropertyOptions[] = [];
	for (const friend of responseData.friends) {
		const friendName = `${friend.first_name} ${friend.last_name}`;
		const friendId = friend.id;

		returnData.push({
			name: friendName,
			value: friendId,
		});
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}

export async function getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = '/get_groups';
	const responseData = await splitwiseApiRequest.call(this, 'GET', endpoint, {});

	if (responseData.groups === undefined) {
		throw new NodeApiError(this.getNode(), responseData as JsonObject, {
			message: 'No data got returned',
		});
	}

	const returnData: INodePropertyOptions[] = [];
	for (const group of responseData.groups) {
		const groupName = group.name;
		const groupId = group.id;

		returnData.push({
			name: groupName,
			value: groupId,
		});
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}
