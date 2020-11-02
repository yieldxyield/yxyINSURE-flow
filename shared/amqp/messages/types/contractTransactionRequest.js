const schemaVersions = {};

schemaVersions['1.0'] = {
  id: 'contractTransactionRequest',
  type: 'object',
  properties: {
    product: { type: 'string' },
    contractName: { type: 'string' },
    methodName: { type: 'string' },
    key: { type: 'string' },
    parameters: { type: 'array' },
  },
};

module.exports = schemaVersions;
