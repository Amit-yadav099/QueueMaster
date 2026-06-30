const express = require('express');

const cors = require('cors');

const customerRoutes = require('./routes/customer.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;