const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./utils/MongooseUtil');

const app = express();
const PORT = process.env.PORT || 3000;

// ================= MIDDLEWARE =================
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ================= API =================
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// ================= DEPLOY CLIENT =================

// 👉 ADMIN
app.use('/admin', express.static(path.join(__dirname, '../client-admin/dist')));

// 👉 CUSTOMER
app.use('/', express.static(path.join(__dirname, '../client-customer/dist')));

// 👉 FALLBACK (FIX LỖI EXPRESS MỚI)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client-customer/dist/index.html'));
});

// ================= RUN =================
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});