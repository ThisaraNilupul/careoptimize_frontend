import React, { useEffect, useState } from 'react';
import './DoctorAddTreatment.css';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import { LuSearch, LuSendHorizonal, LuChevronRight, LuX, LuCheck } from "react-icons/lu";
import Card from '../../../components/BaseCard-component/Card';
import { ReactComponent as DoctorOne } from '../../../assets/Doctor1.svg';
import AddIcon from '@mui/icons-material/Add';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import ButtonMain from '../../../components/BaseButton-component/Button';
import { green, yellow } from '@mui/material/colors';

const greenMain = green.A400;
const greenHover = green.A700;
const yellowMain = yellow.A400;
const yellowHover = yellow.A700;

function DoctorAddTreatment() {
  const doctorID = localStorage.getItem('userId');
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectPatient, setIsSelectPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isOpneNewTreatmentForm, setIsOpneNewTreatmentForm] = useState(false);
  const [isOpenAddCheckupForm, setIsOpenAddCheckupForm] = useState(false);
  const [isOpenAddTreatmentForm, setIsOpenAddTreatmentForm] = useState(false);
  const [doctorProfileData, setDoctorProfileData] = useState({});
  const [checkup, setCheckup] = useState({ testName: '', evaluationDate: ''});
  const [checkupList, setCheckupList] = useState([]);
  const [treatmentPlan, setTreatmentPlan] = useState({
    drugName: '',
    dosage: '',
    hourly: '',
    times: [],
    mealInstruction: ''
  });
  const [treatmentList, setTreatmentList] = useState([]);
  const [newTreatmentForm, setNewTreatmentForm] = useState({
    patientId: '',
    patientName: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    diagnosis: '',
    diagnosisDescription: '',
    prescription: '',
    checkups: checkupList,
    startDate: '',
    endDate: '',
    days: '', 
    treatmentPlans: treatmentList,
    doctorInfo: {
      doctorId: '',
      firstName: '',
      lastName: '',
      title: '',
      doctorPhone: '',
      doctorEmail: '',
    },
    hospitalInfo: {
      name: '',
      addressNo: '',
      street: '',
      city: '',
      province: '',
      hospitalPhone: '',
      hospitalEmail: '',
    },
  });
  const [checkboxState, setCheckboxState] = useState({
    Morning: false,
    Noon: false,
    Evening: false,
    Night: false,
    Daily: false
  });
  const [radioState, setRadioState] = useState('');
  const [notification, setNotification] = useState(null);
  const [isOpenSelectClinic, setIsOpenSelectClinic] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/add-teatment/all-patients`)
    .then((res) => res.json())
    .then((data) => {
      setAllPatientsList(data);
      setFilteredPatients(data);
    })
    .catch((error) => {
      console.log(error);
      setNotification({
          status: 'failed',
          message: error.data.msg,
        })
    });
  }, []);


  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/profile/${doctorID}`,{
        method: "GET",
        headers: {'content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((data) => {
        setDoctorProfileData(data);
        setNewTreatmentForm(prevForm => ({
          ...prevForm,
          doctorInfo: {
            doctorId: doctorID,
            firstName: data.firstName,
            lastName: data.lastName,
            title: data.doctorInfo.specialistArea,
            doctorPhone: data.phoneNumber,
            doctorEmail: data.email
          }
        }));
        console.log('doctor', doctorProfileData);
    })
    .catch((error => { console.log(error) }));
  }, [ ])

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = allPatientsList.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
    setFilteredPatients(filtered);
  }

  const handleSelectedPatientData = (patient) => {
    setSelectedPatient(patient);
    setIsSelectPatient(true);

    setNewTreatmentForm(prevForm => ({
      ...prevForm,
      patientId: patient._id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      gender: patient.gender,
      age: calculateAge(patient.birthday),
      phone: patient.phoneNumber,
      email: patient.email
    }));
  }

  const handleAddSelectedClinic = (workatId) => {
    fetch(`http://localhost:5000/api/doctor/profile/${doctorID}/work-at/${workatId}`, {
      method: "GET",
      headers: {'content-type': 'application/json'}
  })
  .then((res)=>res.json())
  .then((data)=>{
      setNewTreatmentForm(prevForm => ({
        ...prevForm,
        hospitalInfo: {
          name: data.placeName,
          addressNo: data.h_addressNo,
          street: data.h_street,
          city: data.h_city,
          province: data.h_province,
          hospitalPhone: data.h_phoneNumber,
          hospitalEmail: data.h_email,
        }
      }))
      setIsOpenSelectClinic(false);
  })
  .catch((error) => {
      console.log(error);
      setNotification({
          status: 'failed',
          message: error.data.msg,
        })
  });
  }

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
   }
  
  const handleOpneNewTreatment = () => {
    setIsOpneNewTreatmentForm(true);
  }

  const handleCloseNewTreatment = () => {
    setIsOpneNewTreatmentForm(false);
  }

  const handelOpenAddCheckupform = () => {
    setIsOpenAddCheckupForm(true);
  }

  const handelCloseAddCheckupform = () => {
    setIsOpenAddCheckupForm(false);
  }

  const handleOpenAddTreatmentForm = () => {
    setIsOpenAddTreatmentForm(true);
  }

  const handleCloseAddTreatmentForm = () => {
    setIsOpenAddTreatmentForm(false);
  }

  const handlleOpenSelectClinic = () => {
    setIsOpenSelectClinic(true);
  }

  const handleChackupChange = (e) => {
    const {name, value} = e.target;
    setCheckup({...checkup, [name]: value});
  }

  const handelAddCheckup = () => {
    const updatedCheckupList = [...checkupList, checkup];
    setCheckupList(updatedCheckupList);
    setCheckup({ testName: '', evaluationDate: ''});
    setNewTreatmentForm(prevForm => ({
      ...prevForm,
      checkups: updatedCheckupList
    }));
  };

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setTreatmentPlan(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const handletreatmetInputChange = (e) => {
    const {name,value} = e.target;
    setNewTreatmentForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleTimeChange = (e) => {
    const {value, checked} = e.target;

    setCheckboxState(prevState => ({
      ...prevState,
      [value]: checked
    }));

    if(checked) {
      setTreatmentPlan(prevState => ({
        ...prevState,
        times: [...prevState.times, value]
      }))
    }else{
      setTreatmentPlan(prevState => ({
        ...prevState,
        times: prevState.times.filter(time => time !== value)
      }));
    }
  };

  const handleMealChange = (e) => {
    setRadioState(e.target.value);
    setTreatmentPlan({
      ...treatmentPlan,
      mealInstruction: e.target.value
    });
  };

  const handleDoctorInfoChange = (e) => {
    const { name, value } = e.target;
    setNewTreatmentForm((prevForm) => ({
      ...prevForm,
      doctorInfo: { ...prevForm.doctorInfo, [name]: value },
    }));
  };

  const handleHospitalInfoChange = (e) => {
    const { name, value } = e.target;
    setNewTreatmentForm((prevForm) => ({
      ...prevForm,
      hospitalInfo: { ...prevForm.hospitalInfo, [name]: value },
    }));
  };

  const handleAddTreatment = () => {
    const updatedTreatmentList = [...treatmentList, treatmentPlan];
    setTreatmentList(updatedTreatmentList);
    setNewTreatmentForm(prevForm => ({
      ...prevForm,
      treatmentPlans: updatedTreatmentList
    }));
    setTreatmentPlan({
      drugName: '',
      dosage: '',
      hourly: '',
      times: [],
      mealInstruction: ''
    });
    setCheckboxState({
      Morning: false,
      Noon: false,
      Evening: false,
      Night: false,
      Daily: false
    });
    setRadioState('');
  }

  const closeNotification = () => {
    setNotification(null);
  };

  // console.log("treatmentform", newTreatmentForm);

  const handleSubmitNewTreatmentForm = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/doctor/addTreatment', newTreatmentForm);
      setNotification({
        status: 'success',
        message: response.data.msg,
      });
      setIsOpneNewTreatmentForm(false);
    }catch (error) {
      setNotification({
        status: 'falied',
        message: error.response.data
    })
    }
  }

  return (
    <div className='doctoraddtreatment'>
      <div className='leftside'>
        <div className='searchbar'>
          <label>Search patient by name</label>
          <div className='searchbar-input-button'>
            <div className='searchbar-input-wrapper'>
              <input className='search-input' type='text' value={searchQuery} onChange={handleSearchChange} placeholder="Enter patient name"/>
              <LuSearch className="search-icon" />
            </div>
          </div>
        </div>
        <Card width="40vw" height="72vh">
          <div className='title'>Patients List</div>
          <div className='header'>
            <div className='name'>Name</div>
            <div className='contact'>Contact No.</div>
            <div className='view-button'>Select</div>
          </div>
          <div className='patient-list-container'>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <div key={index} className='patient-list'>
                    <div className='name'>{`${patient.firstName} ${patient.lastName}`}</div>
                    <div className='contact'>{patient.phoneNumber}</div>
                    <div className='view-button'>
                      <SubButton icon={<LuSendHorizonal />} height="30px" width="60px" onClick={() => handleSelectedPatientData(patient)} />
                    </div>
                </div>
              ))
            ) : (
              <div>No patients available</div>
            )}
          </div>
        </Card>
      </div>
      <div className='rightside'>
        <Card width="39vw" height="84vh">
          <div className='title'>Schedule a New Treatment Plan</div>
          {isSelectPatient ? (
            <div className='isSelectPatient-true'>
              <div className='s_title'>Patient Info</div>
              <div className='s_item-container'>
                <div className='s_item'>
                  <div className='s_name'>Name</div>
                  <div className='s_value'>: {`${selectedPatient.firstName} ${selectedPatient.lastName}`}</div>
                </div>
                <div className='s_item'>
                  <div className='s_name'>Age</div>
                  <div className='s_value'>: {calculateAge(selectedPatient.birthday)}</div>
                </div>
                <div className='s_item'>
                  <div className='s_name'>Gender</div>
                  <div className='s_value'>: {selectedPatient.gender}</div>
                </div>
                <div className='s_item'>
                  <div className='s_name'>Phone No.</div>
                  <div className='s_value'>: {selectedPatient.phoneNumber}</div>
                </div>
                <div className='s_item'>
                  <div className='s_name'>Email</div>
                  <div className='s_value'>: {selectedPatient.email}</div>
                </div>
              </div>
              <div className='s_title'>Patient's Health Issues & Allergies</div>
              <div className='hia_item-container'>
                {selectedPatient.healthIssues.length > 0 ? (
                  selectedPatient.healthIssues.map((healthissue, index) => (
                    <div key={index} className='hia_item-true' >
                      <LuChevronRight />
                      <div>{healthissue.issue}</div>
                    </div>
                  ))
                ) : (
                  <div className='hia_item-false'>No Health Issues & Allergies</div>
                )}
              </div>
              <div className='button-group'>
                <ButtonMain text="View Medical History" height="35px" width="300px" variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<ImportContactsIcon />}/>
                <ButtonMain text="Add New Treatment" height="35px" width="300px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handleOpneNewTreatment} icon={<AddIcon />}/>
              </div>
            </div>
          ) : (
            <div className='isSelectPatient-false'>
                <DoctorOne width="20%" height="30%" />
                <div className='noteone'>No patient selected</div>
                <div  className='notetwo'>Please choose a patient to schedule a new treatment plan.</div>
            </div>
          )}
        </Card>
      </div>
      {isOpneNewTreatmentForm && (
        <div className="popup">
          <Card width="50%" height="95vh">
            <div className="popup-title">Add New Treatment
                <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseNewTreatment} />
            </div>
            <div className='header-title'>Doctor's Note</div>
            <div className='scrollable'>
              <div className='form'>
                <div className='form-part-one'>
                  <div className='part-content'>
                    <div className='part-item'>
                      <label>Patient's Name</label>
                      <input type="text" name="patientName" value={newTreatmentForm.patientName} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Gender</label>
                      <input  type="text" name="gender" value={newTreatmentForm.gender} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Age</label>
                      <input  type="text" name="age" value={newTreatmentForm.age} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Phone No.</label>
                      <input  type="text" name="phone" value={newTreatmentForm.phone} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Email</label>
                      <input size="49" type="text" name="email" value={newTreatmentForm.email} onChange={handletreatmetInputChange} required/>
                    </div>
                  </div>
                </div>
                <div className='break-line'></div>
                <div className='form-part-Two'>
                  <div className='parttwo-content'>
                    <div className='parttwo-item'>
                      <label>Medical Diagnosis</label>
                      <input  type="text" name="diagnosis" value={newTreatmentForm.diagnosis} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='parttwo-item'>
                      <label>Description of the diagnosis</label>
                      <textarea  type="text" name="diagnosisDescription" value={newTreatmentForm.diagnosisDescription} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='parttwo-item'>
                      <label>Medical Advice/Prescription</label>
                      <textarea  type="text" name="prescription" value={newTreatmentForm.prescription} onChange={handletreatmetInputChange} required/>
                    </div>
                    <div className='parttwo-prescription'>
                      <ButtonMain text="Add Prescription (img)" height="28px" width="250px" variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<AddIcon />}/>
                      <div className='prescription-img'>prescription.jpj</div>
                    </div>
                    <div className='parttwo-medicalcheckup'>
                      <ButtonMain text="Add Medical CheckUp" height="28px" width="235px" onClick={handelOpenAddCheckupform} variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<AddIcon />}/>
                      {isOpenAddCheckupForm && (
                        <div className='addcheckup-form'>
                         <div className='addcheckup-content'>
                          <div className='addcheckup-item'>
                            <label>CheckUp/Test Name</label>
                            <input type="text" name="testName" value={checkup.testName} onChange={handleChackupChange} required/>
                          </div>
                          <div className='addcheckup-date'>
                            <label>Evaluation Date</label>
                            <input  type="date" name="evaluationDate" value={checkup.evaluationDate} onChange={handleChackupChange} required/>
                          </div>
                          </div> 
                          <div className='addcheckup-button'>
                            <ButtonMain text="Close" height="25px" width="80px" onClick={handelCloseAddCheckupform} variant="outlined" color="error"/>
                            <ButtonMain text="Add" height="25px" width="80px" onClick={handelAddCheckup} variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                          </div>
                        </div> 
                      )}
                      <div className='medical-checkup-content'>
                        <div className='content-header'>
                          <div className='test-name'>CheckUp/Test Name</div>
                          <div className='test-name'>Evaluation Date</div>
                        </div>
                        <div className='content-list'>
                          {checkupList.map((checkup, index) => (
                            <div key={index} className='content-item'>
                                <div className='test-name'>{checkup.testName}</div>
                                <div className='test-name'>{checkup.evaluationDate}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='parttwo-treatmentplan'>
                      <ButtonMain text="Add Treatment Plan" height="28px" width="235px" onClick={handleOpenAddTreatmentForm} variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<AddIcon />}/>
                    </div>
                    {isOpenAddTreatmentForm && (
                        <div className='addtreatment-form'>
                          <div className='druginfo'>Drug info</div>
                          <div className='addtreatment-content'>
                            <div className='addtreatment-item'>
                              <label>Drug Name</label>
                              <input type="text" name="drugName" value={treatmentPlan.drugName} onChange={handleInputChange} required/>
                            </div>
                            <div className='addtreatment-item'>
                              <label>Tap/Cap At a Time</label>
                              <input  type="text" name="dosage" value={treatmentPlan.dosage} onChange={handleInputChange} required/>
                            </div>
                            <div className='addtreatment-item'>
                              <label>Every Hourly</label>
                              <input  type="text" name="hourly" value={treatmentPlan.hourly} onChange={handleInputChange} required/>
                            </div>
                            <div className='addtreatment-item'>
                              <label>Time</label>
                              <div className='checkbox-group'>
                                <div className='checkbox-item'>
                                  <input type='checkbox' name='time' value="Morning" checked={checkboxState.Morning} onChange={handleTimeChange} /> Morning
                                </div>
                                <div className='checkbox-item'>
                                  <input type='checkbox' name='time' value="Noon" checked={checkboxState.Noon} onChange={handleTimeChange} /> Noon
                                </div>
                                <div className='checkbox-item'>
                                  <input type='checkbox' name='time' value="Evening" checked={checkboxState.Evening} onChange={handleTimeChange} /> Evening
                                </div>
                                <div className='checkbox-item'>
                                  <input type='checkbox' name='time' value="Night" checked={checkboxState.Night} onChange={handleTimeChange} /> Night
                                </div>
                                <div className='checkbox-item'>
                                  <input type='checkbox' name='time' value="Daily" checked={checkboxState.Daily} onChange={handleTimeChange} /> Daily
                                </div>
                              </div>
                            </div>
                            <div className='addtreatment-item'>
                              <label>Before/After Meals</label>
                              <div className='checkbox-group'>
                                <div className='checkbox-item'>
                                  <input type='radio' name='mealInstruction' value='Before Meals' checked={radioState === 'Before Meals'}  onChange={handleMealChange} /> Before Meals
                                </div>
                                <div className='checkbox-item'>  
                                  <input type='radio' name='mealInstruction' value='After Meals' checked={radioState === 'After Meals'} onChange={handleMealChange} /> After Meals
                                </div>  
                              </div>
                            </div>
                          </div>
                          <div className='addtreatment-button'>
                            <ButtonMain text="Close" height="25px" width="80px" onClick={handleCloseAddTreatmentForm} variant="outlined" color="error"/>
                            <ButtonMain text="Add" height="25px" width="80px" onClick={handleAddTreatment}  variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                          </div>
                        </div> 
                      )}
                    <div className='parttwo-treatmetdates'>
                      <div className='treatmetdates-item'>
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={newTreatmentForm.startDate} onChange={handletreatmetInputChange} required/>
                      </div>
                      <div className='treatmetdates-item'>
                        <label>End Date</label>
                        <input  type="date" name="endDate" value={newTreatmentForm.endDate} onChange={handletreatmetInputChange} required/>
                      </div>
                      <div className='treatmetdates-item'>
                        <label>No. of Days</label>
                        <input  type="text" name="days" value={newTreatmentForm.days} onChange={handletreatmetInputChange} required/>
                      </div>
                    </div>
                    <div className='treatmet-content'>
                        <div className='treatmetcontent-header'>
                          <div className='test-drugName'>Drug Name</div>
                          <div className='test-times'>Time</div>
                          <div className='test-dosage'>Tap/Cap At a Time</div>
                          <div className='test-hourly'>Every Hourly</div>
                          <div className='test-mealInstruction'>Before/After Meals</div>
                        </div>
                        <div className='treatmetcontent-list'>
                          {treatmentList.map((plan, index) => (
                            <div key={index} className='treatmetcontent-values'>
                              <div className='test-drugName'>{plan.drugName}</div>
                              <div className='test-times'>{plan.times.join(',')}</div>
                              <div className='test-dosage'>{plan.dosage}</div>
                              <div className='test-hourly'>{plan.hourly}</div>
                              <div className='test-mealInstruction'>{plan.mealInstruction}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>
                </div>
                <div className='break-line'></div>
                <div className='doctor-info'>Doctor's Info</div>
                <div className='form-part-one'>
                  <div className='part-content'>
                    <div className='part-item'>
                      <label>First Name</label>
                      <input  type="text" name="firstName" value={newTreatmentForm.doctorInfo.firstName} onChange={handleDoctorInfoChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Last Name</label>
                      <input  type="text" name="lastName" value={newTreatmentForm.doctorInfo.lastName} onChange={handleDoctorInfoChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Title</label>
                      <input  type="text" name="title" value={newTreatmentForm.doctorInfo.title} onChange={handleDoctorInfoChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Phone No.</label>
                      <input  type="text" name="doctorPhone" value={newTreatmentForm.doctorInfo.doctorPhone} onChange={handleDoctorInfoChange} required/>
                    </div>
                    <div className='part-item'>
                      <label>Email</label>
                      <input size="49"  type="text" name="doctorEmail" value={newTreatmentForm.doctorInfo.doctorEmail} onChange={handleDoctorInfoChange} required/>
                    </div>
                  </div>
                </div>
                <div className='hospital-info'>
                  <div className='form-part-Two'>
                    <div className='selectclinic-button'>
                      <ButtonMain text="Select The Clinic" height="28px" width="200px" onClick={handlleOpenSelectClinic} variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<AddIcon />}/>
                      {isOpenSelectClinic && (
                        <div className='addtreatment-form'>
                            <div className='clinic-list'>
                              {doctorProfileData.workAt && doctorProfileData.workAt.map((workat, index) => (
                                  <div key={index} className='workat'>
                                      {workat.placeName}
                                      <div className='button-group'>
                                          <SubButton icon={<LuCheck />} height="27px" width="60px"  onClick={() => handleAddSelectedClinic(workat._id)}/>
                                      </div>
                                  </div>
                              ))}
                            </div>
                        </div>
                      )}
                      </div>
                    <div className='parttwo-content'>
                      <div className='parttwo-item'>
                        <label>Hospital/Clinic Name</label>
                        <input  type="text" name="name" value={newTreatmentForm.hospitalInfo.name} onChange={handleHospitalInfoChange} required/>
                      </div>
                    </div>
                  </div>
                  <div className='form-part-one'>
                    <div className='part-content'>
                      <div className='part-item'>
                        <label>Address No.</label>
                        <input  type="text" name="addressNo" value={newTreatmentForm.hospitalInfo.addressNo} onChange={handleHospitalInfoChange} required/>
                      </div>
                      <div className='part-item'>
                        <label>Street</label>
                        <input  type="text" name="street" value={newTreatmentForm.hospitalInfo.street} onChange={handleHospitalInfoChange} required/>
                      </div>
                      <div className='part-item'>
                        <label>City</label>
                        <input  type="text" name="city" value={newTreatmentForm.hospitalInfo.city} onChange={handleHospitalInfoChange} required/>
                      </div>
                      <div className='part-item'>
                        <label>Province</label>
                        <input  type="text" name="province" value={newTreatmentForm.hospitalInfo.province} onChange={handleHospitalInfoChange} required/>
                      </div>
                      <div className='part-item'>
                        <label>Phone No.</label>
                        <input size="9" type="text" name="hospitalPhone" value={newTreatmentForm.hospitalInfo.hospitalPhone} onChange={handleHospitalInfoChange} required/>
                      </div>
                      <div className='part-item'>
                        <label>Email</label>
                        <input size="31" type="text" name="hospitalEmail" value={newTreatmentForm.hospitalInfo.hospitalEmail} onChange={handleHospitalInfoChange} required/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='form-submitbutton'>
                  <ButtonMain text="Create" height="35px" width="200px" onClick={handleSubmitNewTreatmentForm}  variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<AddCircleIcon />}/>
                </div>    
              </div>
            </div>
          </Card>
        </div>
      )}
      {notification && (
            <Notification 
                status={notification.status}
                message={notification.message}
                height={notification.height}
                width={notification.width}
                onClose={closeNotification}
            />
        )}
    </div>
  )
}

export default DoctorAddTreatment;
