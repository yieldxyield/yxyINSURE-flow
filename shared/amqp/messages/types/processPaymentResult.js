const schemaVersions = {};

schemaVersions['1.0'] = {
  id: 'processPaymentResult',
  type: 'object',
  properties: {
    policyId: { type: 'string' },
    error: { type: 'string' },
  },
};

module.exports = schemaVersions;
