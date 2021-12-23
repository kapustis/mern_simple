const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'cli', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 3001;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUriCloud'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      })
    app.listen(PORT, () => console.log(`Server run! on port ${PORT}`));
  } catch (errorInfo) {
    console.log('Server Error -', errorInfo.message)
    process.exit(1)
  }
}

start();
