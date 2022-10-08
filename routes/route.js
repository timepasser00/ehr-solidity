const express=require('express');
const {setPInfo,
    addClient,
    currentUser,
    approve,
    setMedInfo,
    addEmployee,
    getMedInfo,
    getCreditScore,
    confirmDisease,
    healthStatus,
    getId,
    getPInfo,
    hospitalCnt,
    labCnt,
    medRecordCnt,
    patientCnt,
    reffer,
    approveRefferedDoctor
} =require('../controller/routeController')
const router=express.Router()

//to get patient details
// router.get('/patientDetails',getPatient)
router.post('/labCnt',labCnt);
router.post('/currentUser',currentUser);
router.post('/patientDetails',setPInfo)
router.post('/owner',addClient)
router.post('/approve',approve)
router.post('/setMedInfo',setMedInfo)
router.post('/institution',addEmployee)
router.post('/getMedInfo',getMedInfo);
router.post('/getPInfo',getPInfo);
router.post('/creditScore',getCreditScore)
router.post('/confirm',confirmDisease)
router.get('/status',healthStatus)
router.post('/getId',getId);
router.post('/hCnt',hospitalCnt);
router.post('/getMedRecordCnt',medRecordCnt)
router.post('/patientCnt',patientCnt)
router.post('/reffer',reffer)
router.post('/approveRefferedDoctor',approveRefferedDoctor)

module.exports=router 
