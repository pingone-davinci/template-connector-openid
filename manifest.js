/* eslint-disable camelcase */
const connectorOpenID = {
  name: 'OpenID Connector',
  description: 'OpenID Connector',
  connectorId: 'connectorOpenID',
  serviceName: 'connector-openid',
  connectorType: 'mfa',
  connectorCategories: [{ name: 'Authenticate', value: 'authenticate' }],
  connectorDetails:
    'Longer description',
  detailImage: null,
  metadata: {
    colors: {
      canvas: '#E0E0E0',
      dark: '#303030',
      canvasText: '#212529',
    },
    logos: {
      canvas: {
        imageFileName: 'pingidentity.svg',
      },
    },
  },

  sections: [{ name: 'General', value: 'general', default: true }],
  flowSections: [{ name: 'General', value: 'general' }],

  properties: {
    authType: {
      value: 'customAuth',
    },
    showPoweredBy: {
      preferredControlType: 'toggleSwitch',
      value: false,
    },
    skipButtonPress: {
      preferredControlType: 'toggleSwitch',
      value: true,
    },
    customAuth: {
      properties: {
        issuerUrl: {
          displayName: 'Issuer URL',
          preferredControlType: 'textField',
          value: '<issuer URL here>',
          disabled: true,
        },
        providerName: {
          displayName: 'Provider Name',
          preferredControlType: 'textField',
          value: '<Provider Name Here>',
          disabled: true,
        },
        authTypeDropdown: {
          disabled: true,
          displayName: 'Auth Type',
          preferredControlType: 'dropDown',
          required: true,
          options: [
            {
              name: 'Oauth2',
              value: 'oauth2',
            },
            {
              name: 'OpenId',
              value: 'openId',
            },
          ],
          enum: ['oauth2', 'openId'],
          value: 'openId',
        },
        skRedirectUri: {
          displayName: 'Redirect URI',
          preferredControlType: 'textField',
          disabled: true,
          initializeValue: 'SINGULARKEY_REDIRECT_URI',
          copyToClip: true,
        },
        clientId: {
          displayName: 'Client ID',
          preferredControlType: 'textField',
          required: true,
        },
        clientSecret: {
          displayName: 'Client Secret',
          preferredControlType: 'textField',
          hashedVisibility: true,
          required: true,
        },
        scope: {
          displayName: 'Scope',
          preferredControlType: 'textField',
          requiredValue: 'openid',
          value: 'openid',
          required: true,
        },
        grant: {
          displayName: 'Grant Type',
          value: 'authorizationCode',
        },
        authorizationEndpoint: {
          displayName: 'Authorization Endpoint',
          preferredControlType: 'textField',
          value: '<Authorization Endpoint Here>',
          disabled: true,
        },
        authorizationParams: {
          value: ['clientId', 'redirect_uri'], // add in other parameters such as grant type?
        },
        tokenEndpoint: {
          displayName: 'Token Endpoint',
          preferredControlType: 'textField',
          value: '<Token Endpoint Here>',
          disabled: true,
        },
        tokenParams: {
          value: ['clientId', 'redirect_uri', 'client_secret', 'code'],
        },
        tokenMethod: { value: 'POST' },
        userInfoEndpoint: {
          displayName: 'User Info Endpoint',
          preferredControlType: 'textField',
          value: '<User Info Endpoint Here>',
          disabled: true,
        },
        returnToUrl: {
          displayName: 'Application Return To URL',
          preferredControlType: 'textField',
          info: 'When using the embedded flow player widget and an IDP/Social Login connector, provide a callback URL to return back to the application.',
        },
        queryParams: {
          info: 'These values will be used for query parameters for Authorization URL.',
          displayName: 'Query Params',
          preferredControlType: 'keyValueList',
          hideLabel: true,
          required: false,
        },
        customAttributes: {
          displayName: 'Connector Attributes',
          preferredControlType: 'tableViewAttributes',
          info: 'These attributes will be available in User Connector Attribute Mapping.',
          sections: ['connectorAttributes'],
          value: [
            {
              name: 'sub',
              description: 'Sub',
              type: 'string',
              value: null,
              minLength: '1',
              maxLength: '300',
              required: true,
              attributeType: 'sk',
            },
          ],
        },
        userConnectorAttributeMapping: {
          preferredControlType: 'userConnectorAttributeMapping',
          newMappingAllowed: true,
          title1: null,
          title2: null,
          sections: ['attributeMapping'],
          value: {
            userPoolConnectionId: 'defaultUserPool',
            mapping: {
              username: {
                value1: 'sub',
              },
            },
          },
        },
        tokenAttributeMapping: {
          preferredControlType: 'mapping',
          newMappingAllowed: true,
          value: [
            {
              value1: 'accessToken',
              value2: 'data.access_token',
              deleteAllowed: false,
            },
            {
              value1: 'expiresIn',
              value2: 'data.expires_in',
              deleteAllowed: false,
            },
            {
              value1: 'idToken',
              value2: 'data.id_token',
              deleteAllowed: false,
            },
            {
              value1: 'refreshToken',
              value2: 'data.refresh_token',
              deleteAllowed: false,
            },
          ],
          title1: 'Token Properties',
          title2: 'UserPool Properties',
          placeholderAdd: 'Enter Attribute',
        },
      },
    },
    button: {
      displayName: 'OIDC Login',
      logo: '',
      showLogo: true,
      preferredControlType: 'button',
      css: {
        backgroundColor: '#75c88d',
        color: '#000000',
      },
      onClick: { location: '{{authorizationUrl}}' },
    },
    screenTemplateName: {},
  },
  capabilities: {
    loginFirstFactor: {
      type: 'trigger',
      title: 'OpenID Redirect',
      subTitle: 'OpenID Redirect',
      disableCreateUser: true,
      localOutputSchema: {
        output: {
          type: 'object',
          properties: {
            sub: {
              type: 'string',
            },
            aud: {
              type: 'string',
            },
            jti: {
              type: 'string',
            },
            iss: {
              type: 'string',
            },
            iat: {
              type: 'number',
            },
            exp: {
              type: 'number',
            },
            auth_time: {
              type: 'string',
            },
            tokens: {
              type: 'object',
              properties: {
                access_token: {
                  type: 'string',
                },
                refresh_token: {
                  type: 'string',
                },
                id_token: {
                  type: 'string',
                },
                token_type: {
                  type: 'string',
                },
                expires_at: {
                  type: 'number',
                },
              },
            },
            connectionId: {
              type: 'string',
            },
            connectorId: {
              type: 'string',
            },
          },
        },
      },
      respondToUser: true,
      userViews: [
        {
          screenTemplateName: 'LoginScreen1',
          items: [
            {
              propertyName: 'button',
              fields: {},
            },
            { propertyName: 'showPoweredBy' },
            { propertyName: 'skipButtonPress' },
          ],
        },
      ],
      flowConfigView: {
        items: [
          {
            propertyName: 'customAuth',
            items: [
              {
                propertyName: 'queryParams',
              },
            ],
          },
          {
            propertyName: 'button',
            fields: {},
          },
          {
            propertyName: 'showPoweredBy',
            fields: {},
          },
          { propertyName: 'skipButtonPress' },
        ],
      },
    },
  },
  accountConfigView: {
    componentViewSize: 'large',
    items: [
      {
        propertyName: 'customAuth',
        items: [
          {
            propertyName: 'providerName',
          },
          {
            propertyName: 'authTypeDropdown',
          },
          {
            propertyName: 'skRedirectUri',
          },
          {
            propertyName: 'issuerUrl',
          },
          {
            propertyName: 'authorizationEndpoint',
          },
          {
            propertyName: 'tokenEndpoint',
          },
          {
            propertyName: 'userInfoEndpoint',
          },
          {
            propertyName: 'clientId',
          },
          {
            propertyName: 'clientSecret',
          },
          {
            propertyName: 'scope',
          },
          {
            propertyName: 'state',
          },
          {
            propertyName: 'returnToUrl',
          },
        ],
      },
    ],
  },
};

module.exports = connectorOpenID;