# n8n-nodes-splitwise

This is an n8n community node. It lets you use Splitwise in your n8n workflows.

Splitwise is a service that lets you split expenses with others. Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family. 

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Groups
  - Get information about a group
  - List the current user's groups

- Expenses
  - Get expense information
  - List the current user's expenses
  - Create an expense (in equally split mode)
  - Delete an expense
  - Restore an expense

## Credentials

To use this node you need to create an application in your Splitwise account. You can create one [here](https://secure.splitwise.com/apps).

Once you have created the app, you can use one of the following authentication methods with it in n8n:

- API Key
- OAuth 2.0

If you are using the API Key authentication method, you need to provide the API Key in the `API Key` field, you can generate one [here](https://secure.splitwise.com/apps).

If you are using the OAuth 2.0 authentication method, you need to copy the callback URL provided in the credentials window and paste it in the Callback URL field of your app in Splitwise. You can then enter the credentials in the `OAuth2` field in the credentials window in n8n. For Splitwise, the `OAuth2` field requires the following credentials:

- **Client ID** also known as the Consumer Key in Splitwise
- **Client Secret** also known as the Consumer Secret in Splitwise

## Compatibility

This node was tested against Splitwise API 3.0.0 and n8n 1.7.1.

## Usage

If you are new to n8n, it is recommended to read the [Getting Started](https://docs.n8n.io/try-it-out/) guide for a high-level overview of n8n.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Splitwise documentation](https://dev.splitwise.com/)
