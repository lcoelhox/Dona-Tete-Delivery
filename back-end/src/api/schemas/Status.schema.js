const joi = require('joi');

const statusSchema = joi.object({
  status: joi.string().valid('Pendente', 'Preparando', 'Em Trânsito', 'Entregue').required(),
});

module.exports = statusSchema;