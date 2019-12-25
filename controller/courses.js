const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const crsModel = mongoose.model('course');

router.get('/add', (req, res)=>{
    res.render('addCourse')
});

router.post('/add', (req, res)=>{
    console.log(req.body);

    var courseData = new crsModel();
    courseData.courseId = Math.ceil(Math.random() * 100000000);
    courseData.courseName = req.body.courseName;
    courseData.courseDuration = req.body.courseDuration;
    courseData.courseFee = req.body.courseFee;
    courseData.save((err, suc)=>{
        if(err)
        {
            console.log('err to store data');
            res.send('err to store data')
        }
        else{
            res.redirect('/course/list')
        }
    });
    
});

// base url : /course/list
router.get('/list', (req,res)=>{

    // setting:
    // var course = new crsModel();
    // course.courseName = "reactjs";
    // course.courseId = "1",
    // course.save();

    crsModel.find((err, docs)=>{
        if(err) {
            res.send("Err to show list");
        }
        else{
            // res.send("Succces to show list")
            console.log(docs)
            res.render('list', {data: docs});
        }
    });
});

// update.
router.get('/update', (req, res)=>{
    res.render('updateCourse');
});

router.post('/update', (req, res)=>{
    var courseData = new crsModel();
    const id  = req.body.courseId;
    const name = req.body.courseName
    const dur = req.body.courseDuration
    const fee = req.body.courseFee
    let value = crsModel.updateOne(
        {courseId: id},
        {
            $set : {courseName: name,
                    courseDuration : dur,
                    courseFee : fee}
        },
        (err, docs)=>{
        if(err)
        { 
            res.send("Err to update.")
        }
        else
        { 
            // console.log(raw.result.nModified + " document(s) updated");
            // res.render('list', {data: docs})
            console.log(docs)
            res.redirect('/course/list')
        }
        }
    );
    // ANOTHER LOGIC:
    // var query = {courseId : id}
    // var newValues = {$set : {courseName : name, courseDuration: dur, courseFee: fee}}
    // crsModel.updateOne(query, newValues, (err, raw)=>{
    //     if(err)
    //     { 
    //         res.send("Err to update.")
    //     }
    //     else
    //     { 
    //         // console.log(raw.result.nModified + " document(s) updated");
    //         console.log(raw)
    //         // res.render('list', {data: docs})
    //         res.redirect('/course/list')
    //     }
    // })
});

// Delete data:
router.get('/delete', (req, res)=>{
    res.render('deleteCourse');
});

router.post('/delete', (req, res)=>{
    const id  = req.body.courseId;
    const name = req.body.courseName;
    if(id)
    {
        crsModel.deleteOne({courseId:id}, (err, docs)=>{
            if(err)
            {
                console.log("Err to delete course");
            }
            else
            {
                console.log(docs);
                res.redirect('/course/list');
            }
        });
    }   
    if(name)
    {
        crsModel.deleteMany({courseName:name}, (err, docs)=>{
            if(err)
            {
                console.log("Err to delete course");
            }
            else
            {
                console.log(docs);
                res.redirect('/course/list');
            }
        });
    }
});

module.exports = router;