const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes=require('./routes/user');
const userReportRoutes=require('./routes/user report');
const actionTeamRoutesRoutes=require('./routes/actionTeam');
const analyticsRoutes=require('./routes/analytics');
const adminRoutes=require('./routes/admin');

//Use the CORS middleware to allow requests from your Flutter app
app.use(cors());
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/userReport', userReportRoutes);
app.use('/actionTeam', actionTeamRoutesRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/admin', adminRoutes);




// Starting the server
app.listen(app.get('port'), () => {
    const serverURL = `http://localhost:${app.get('port')}`; 
    console.log(serverURL);
    console.log('Server on port', app.get('port'));
});