const express = require('express');

const userController = require('../Controllers/userController')

const medicineController = require('../Controllers/medicineController')

const serviceController = require('../Controllers/serviceController')

const receptionController = require('../Controllers/receptionController')

const doctorController =  require('../Controllers/doctorController')

const patientController = require('../Controllers/patientController')

const appointmentController = require('../Controllers/appointmentController')

const invoiceController = require('../Controllers/invoiceController')

const jwtMiddleware = require("../Middlewares/jwtMiddleware")

const multerConfig = require('../Middlewares/multerMiddleware');

//create router object of express to define path
const router = new express.Router()

//using router object to define path

//Register API path - http://localhost:4000/register -  frontend ->
router.post('/register',userController.register)

router.post('/login',userController.login)

//Patient login
router.post('/registeruser',patientController.registeruser)

router.post('/loginuser',patientController.loginuser)

//reception login
router.post('/loginReception',receptionController.login)

//Doctor Login
router.post('/loginDoctor',doctorController.login)


//---------------------------------------Admin---------------------------------------------------------
//add Admin
router.post('/admin/add-admin',jwtMiddleware,multerConfig.single('profile'),userController.addNewAdmin)

//view Admin
router.get('/admin/all-admin',jwtMiddleware,userController.getAllAdmin)

//view single Admin
router.get('/admin/single-admin/:adminId',jwtMiddleware,userController.getSingleAdmin)

//update Admin
router.put('/admin/update-admin/:adminId',jwtMiddleware,multerConfig.single('profile'),userController.updateAdmin)

//update password
router.put('/admin/update-adminpassword/:adminId',jwtMiddleware,userController.updatePassword)

//delete Admin
router.delete('/admin/delete-admin/:adminId',jwtMiddleware,userController.deleteAdmin)

//-------------------------------------------MEDICINE------------------------------------------------------------
//Add medicine
router.post('/admin/add-medicine',jwtMiddleware,medicineController.addNewMedicine)

//get all medicine 
router.get('/admin/all-medicine',jwtMiddleware,medicineController.getAllMedicine)

//update medicine
router.put('/admin/update-medicine/:mid',jwtMiddleware,medicineController.updateMedicine)

//delete medicine
router.delete('/admin/delete-medicine/:mid',jwtMiddleware,medicineController.deleteMedicine)

//update stock
router.put('/reception/update-medicinestock/:mid',jwtMiddleware,medicineController.updateMedicineStocks)

//----------------------------------------------SERVICE---------------------------------------------------------

//add service
router.post('/admin/add-service',jwtMiddleware,serviceController.addNewService)

//get all service
router.get('/admin/all-service',jwtMiddleware,serviceController.getAllService)

//update service
router.put('/admin/update-service/:sid',jwtMiddleware,serviceController.updateService)

//delete service
router.delete('/admin/delete-service/:sid',jwtMiddleware,serviceController.deleteService)

//--------------------------------------reception----------------------------------------------------
//add reception
router.post('/admin/add-reception',jwtMiddleware,multerConfig.single('profileImage'),receptionController.addNewReception)

//view Reception
router.get('/admin/all-reception',jwtMiddleware,receptionController.getAllReception)

//single reception
router.get('/reception/single-reception/:recId',jwtMiddleware,receptionController.getSingleReception)

//edit reception
router.put('/admin/update-reception/:rid',jwtMiddleware,multerConfig.single('profileImage'),receptionController.updateReception)

//update password
router.put('/reception/update-password/:recId',jwtMiddleware,receptionController.updatePassword)

//delete reception
router.delete('/admin/delete-reception/:rid',jwtMiddleware,receptionController.deleteReception)


//------------------------------------------doctor----------------------------------------------------
//add doctor
router.post('/admin/add-doctor',jwtMiddleware,multerConfig.single('profileImage'),doctorController.addNewDoctor)

//view doctor
router.get('/admin/all-doctor',jwtMiddleware,doctorController.getAllDoctor)

//view doctor
router.get('/admin/all-doctorHome',doctorController.getAllDoctor)

//single doctor
router.get('/doctor/single-doctor/:docId',jwtMiddleware,doctorController.getSingleDoctor)

//edit doctor
router.put('/admin/update-doctor/:did',jwtMiddleware,multerConfig.single('profileImage'),doctorController.updateDoctor)

//update password
router.put('/doctor/update-password/:docId',jwtMiddleware,doctorController.updatePassword)

//delete doctor
router.delete('/admin/delete-doctor/:did',jwtMiddleware,doctorController.deleteDoctor)

//=======================================Patient=============================================================

//---------add Patient--------------
//add patient
router.post('/admin/add-patient',jwtMiddleware,multerConfig.single('profileImage'),patientController.addNewPatient)

//view patient
router.get('/admin/all-patient',jwtMiddleware,patientController.getAllPatient)

//view single patient
router.get('/admin/single-patient/:patientId',jwtMiddleware,patientController.getSinglePatient)

//update patient
router.put('/admin/update-patient/:pid',jwtMiddleware,multerConfig.single('profileImage'),patientController.updatePatient)

//delete patient
router.delete('/admin/delete-patient/:pid',jwtMiddleware,patientController.deletePatient)


//update healthinfo
router.put('/admin/update-healthinfo/:pid',jwtMiddleware,patientController.updateHealthInfo)

//==============================records=============================

//add medical records
router.post('/admin/add-record/:patientId',jwtMiddleware,patientController.addMedicalRecord)

//view user medical records
router.get('/admin/view-records/:patientId',jwtMiddleware,patientController.viewMedicalRecords)

//view all medical records
router.get('/reception/view-allrecords',jwtMiddleware,patientController.viewAllMedicalRecords)

//delete record
router.delete('/admin/delete-record/:rid',jwtMiddleware,patientController.deleteRecord)

////view single record
router.get('/reception/view-singlerecords/:recordId',jwtMiddleware,patientController.viewSingleMedicalRecords)

//-------------------------------appointment---------------------------------------------------------------
//add
router.post('/reception/new-appointment',jwtMiddleware,appointmentController.addAppointment)


//get all
router.get('/reception/view-appointments',jwtMiddleware,appointmentController.getAllAppointments)

//get single appointmnet
router.get('/reception/view-singleappointment/:patientId',jwtMiddleware,appointmentController.getAllAppointmentsOfPatient)

//get all appointments of doctor
router.get('/reception/view-doctorappointment/:doctorId',jwtMiddleware,appointmentController.getAllAppointmentsOfDoctor)

//update appointment
router.put('/reception/update-appointment/:appointmentId',jwtMiddleware,appointmentController.updateAppointment)

//delete appointment
router.delete('/reception/delete-appointment/:aid',jwtMiddleware,appointmentController.deleteAppointment)

//==============================invoice================================================

//add invoice
router.post('/reception/add-invoice',jwtMiddleware,invoiceController.addInvoice)

//get all invoice
router.get('/reception/all-invoice',jwtMiddleware,invoiceController.getAllInvoice)

//get single invocie
router.get('/reception/view-singleinvoice/:invoiceId',jwtMiddleware,invoiceController.getSingleInvoice)

//get all appointments of a single patient
router.get('/reception/view-allsingleinvoice/:patientId',jwtMiddleware,invoiceController.getAllInvoiceOfPatient)

//delete invoice
router.delete('/reception/delete-invoice/:invoiceId',jwtMiddleware,invoiceController.deleteInvoice)

//update invoice
router.put('/reception/update-invoice/:invoiceId',jwtMiddleware,invoiceController.updateInvoice)
//----------------------------------------------------------------------------------------------------
//add payment
router.post('/reception/add-payment',jwtMiddleware,invoiceController.addPayment)

//view all payment
router.get('/reception/all-payment',jwtMiddleware,invoiceController.getAllPayments)

//Delete payment
router.delete('/reception/delete-payment/:paymentId',jwtMiddleware,invoiceController.deletePayment)


module.exports = router