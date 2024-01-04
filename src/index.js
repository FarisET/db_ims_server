const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes=require('./routes/user');
const userReportRoutes=require('./routes/user report');
const actionTeamRoutesRoutes=require('./routes/actionTeam');
const analyticsRoutes=require('./routes/analytics');
const adminRoutes=require('./routes/admin');
const cloudinary=require('./routes/imageUpload');

//Use the CORS middleware to allow requests from your Flutter app
app.use(cors());
// Settings
// app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());

//landing page
app.get('/', (req, res) => {
    res.send('backend is running');
});
// Routes
app.use('/user', userRoutes);
app.use('/userReport', userReportRoutes);
app.use('/actionTeam', actionTeamRoutesRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/admin', adminRoutes);
app.use('/img',cloudinary);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
