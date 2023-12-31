const { Router } = require('express');
const router = Router();
var con=require('../databases/database');
// const { route } = require('express/lib/application');
// const bodyParser = require('body-parser');
//const moment = require('moment');

router.get('/dashboard/fetchAllUserReports', (req,res) => {
    const status1='open';
    const status2='in progress';
    const query='select user_id, user_report_id, report_description, date_time, sub_location_name, incident_subtype_description, incident_criticality_level, image, status from user_report ur join sub_location sl on ur.sub_location_id=sl.sub_location_id join incident_subtype ist on ur.incident_subtype_id=ist.incident_subtype_id join incident_criticality ic on ur.incident_criticality_id=ic.incident_criticality_id order by date_time desc, case when status=? then 1 when status=? then 2 else 3 end;';
    // const query='call fetchReports(?)';
    con.query(query,[status1,status2],(error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({ status: 'Internal server error', error: error.message });
        }
        // const reportsWithBase64Images = results.map(report => {
        //     // Check if report.image is not null
        //     if (report.image) {
        //         // Convert BLOB to base64
        //         console.log(report.image);
        //         const imageBase64 = Buffer.from(report.image).toString('base64');
        //         report.image = `data:image/png;base64,${imageBase64}`; // Assuming the image is in png format
        //         console.log(report.image);
        //     }
        //     return report;
        // });
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});

// router.get('/dashboard/fetchAllActionReports', (req,res) => {
//     const query='select action_report_id,reported_by,surrounding_image,report_description,question_one,question_two,question_three,question_four,question_five,resolution_description,proof_image,user_report_id,action_team_id,action_team_name,date_time from action_report join action_team using (action_team_id)'
//     con.query(query,(error, results) => {
//         if(error){
//             console.log(error);
//             return res.status(500).json({ status: 'Internal server error' });
//         }
//         var result = JSON.parse(JSON.stringify(results));
//         console.log(result.length)
//         console.log(result)      
//         return res.status(200).json(result);
//     });
// });

router.get('/dashboard/fetchAllActionReports', (req,res) => {
    const temp='approval pending';
    const query='select atr.action_report_id,reported_by,surrounding_image,atr.report_description,question_one,question_two,question_three,question_four,question_five,resolution_description,proof_image,user_report_id,atr.action_team_id,action_team_name,atr.date_time,ast.status,incident_subtype_description from action_report atr join action_team using (action_team_id) join assigned_tasks ast using (user_report_id) join user_report using (user_report_id) join incident_subtype using (incident_subtype_id) order by case when ast.status =? then 0 else 1 end'
    con.query(query,[temp],(error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({ status: 'Internal server error' });
        }
        // const reportsWithBase64Images = results.map(report => {
        //     // Check if report.image is not null
        //     if (report.surrounding_image) {
        //         // Convert BLOB to base64
        //         console.log(report.surrounding_image);
        //         const imageBase64 = Buffer.from(report.surrounding_image).toString('base64');
        //         report.surrounding_image = `data:image/png;base64,${imageBase64}`; // Assuming the image is in png format
        //         console.log(report.surrounding_image);
        //     }
        //     if (report.proof_image) {
        //         // Convert BLOB to base64
        //         console.log(report.proof_image);
        //         const imageBase64 = Buffer.from(report.proof_image).toString('base64');
        //         report.proof_image = `data:image/png;base64,${imageBase64}`; // Assuming the image is in png format
        //         console.log(report.proof_image);
        //     }
        //     return report;
        // });
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});

router.get('/dashboard/fetchDepartments', (req,res) => {
    const query='select department_id, department_name from departments';
    con.query(query, (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching departments');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});

router.get('/dashboard/fetchActionTeams', (req,res) => {
    const department_id=req.query.department_id;
    const query='select action_team_id, action_team_name from action_team where department_id=?';
    con.query(query, [department_id], (error,results) => {
        if(error){
            console.log(error);
            console.log('error in fetching departments');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        var result = JSON.parse(JSON.stringify(results));
        console.log(result.length)
        console.log(result)      
        return res.status(200).json(result);
    });
});


router.post('/dashboard/insertAssignTask' , (req,res) => {
    const user_report_id=req.body.user_report_id;
    const user_id=req.body.user_id;
    const action_team_id=req.body.action_team_id;
    const incident_criticality_id=req.body.incident_criticality_id;
    const query1='insert into assigned_tasks (user_report_id,user_id,action_team_id) values (?,?,?)';
    con.query(query1,[user_report_id,user_id,action_team_id],(error,results) => {
        if(error){
            console.log(error);
            console.log('error in inserting in assigned_tasks table');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        console.log(results)
        console.log('inserted in assigned_tasks table')
        const query2='update user_report set incident_criticality_id=? where user_report_id=?';
        con.query(query2,[incident_criticality_id,user_report_id],(error2,results2) => {
            if(error2){
                console.log(error2);
                console.log('error updating criticality in user_report table');
                return res.status(500).json({status: 'Internal Server Error'});
            }
            console.log(results2)
            return res.status(200).json({status: 'updated criticality in user_report table'});
        });
    });
});

router.delete('/dashboard/deleteUserReport/:user_report_id',(req,res) =>{
    const user_report_id = req.params.user_report_id;
    const query = 'delete from user_report where user_report_id=?';
    con.query(query,[user_report_id],(error,result) =>{
        if(error){
            console.log(error);
            console.log('error deleting user report');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        console.log(result);
        return res.status(200).json({status: 'deleted user report'});
    });
});

router.delete('/dashboard/deleteActionReport/:action_report_id',(req,res) =>{
    const action_report_id = req.params.action_report_id;
    const query = 'delete from action_report where action_report_id=?';
    con.query(query,[action_report_id],(error,result) =>{
        if(error){
            console.log(error);
            console.log('error deleting action report');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        console.log(result);
        return res.status(200).json({status: 'deleted action report'});
    });
});

router.post('/dashboard/approvedActionReport', (req,res) => {
    const user_report_id=req.body.user_report_id;
    const action_report_id=req.body.action_report_id;
    const query='call actionReportIDinAssignedTasks(?,?)';
    con.query(query,[user_report_id,action_report_id],(error,results) => {
        if(error){
            console.log(error);
            console.log('error in approving action report');
            return res.status(500).json({status: 'Internal Server Error'});
        }
        console.log(results);
        return res.status(200).json({status: 'action report approved'});
    })
});

module.exports = router;