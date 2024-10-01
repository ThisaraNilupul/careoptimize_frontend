import React, { useState } from 'react';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Card from '../../../components/BaseCard-component/Card';
import './PatientOngoingTreatment.css';
import { LuX } from "react-icons/lu";


function PatientOngoingTreatment() {
  const [isOpneNewTreatmentForm, setIsOpneNewTreatmentForm] = useState(false);
  const [isOpenTreatment, setIsOpenTreatment] = useState(false);
  const [isOpenAddCheckupForm, setIsOpenAddCheckupForm] = useState(false);
  const [isOpenAddTreatmentForm, setIsOpenAddTreatmentForm] = useState(false);
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


  const handleOpneNewTreatment = () => {
    setIsOpneNewTreatmentForm(true);
  }

  const handleCloseNewTreatment = () => {
    setIsOpneNewTreatmentForm(false);
  }

  const handleOpenCurrentTreatment = () => {
    setIsOpenTreatment(true);
  }

  const handleCloseCurrentTreatment = () => {
    setIsOpenTreatment(false);
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

  console.log("newTreatmentForm:", newTreatmentForm );

  return (
    <div className='patient-OngoingTreatment-container'>
      <Button text="New Treatment" height="40px" width="300px" className="add-event-button" onClick={handleOpneNewTreatment} />
      <div className='card-container'>
        <Card width="390px" height="200px">
          <div className='card-item'>
            <div className='itemname'>Treatment Id</div>
            <div className='itemvalue'>001</div>
          </div>
          <div className='card-item'>
            <div className='itemname'>Diagnosis Name</div>
            <div className='itemvalue'></div>
          </div>
          <div className='card-item'>
            <div className='itemname'>Start Date</div>
            <div className='itemvalue'></div>
          </div>
          <div className='card-item'>
            <div className='itemname'>End Date</div>
            <div className='itemvalue'></div>
          </div>
          <div className='card-item'>
            <div className='itemname'>Days to Complete</div>
            <div className='itemvalue'></div>
          </div>
          <div className='card-button'>
            <SubTextButton text="Open" height="28px" width="100px" onClick={handleOpenCurrentTreatment}/>
          </div>
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
                      <input  type="text" name="patientName" value={newTreatmentForm.patientName} onChange={handletreatmetInputChange} required/>
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
                      <input  type="text" name="email" value={newTreatmentForm.email} onChange={handletreatmetInputChange} required/>
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
                      <SubTextButton text="Add Prescription (img)" height="35px" width="200px"/>
                      <div className='prescription-img'>prescription.jpj</div>
                    </div>
                    <div className='parttwo-medicalcheckup'>
                      <SubTextButton text="Add Medical CheckUp" height="35px" width="200px" onClick={handelOpenAddCheckupform}/>
                      {isOpenAddCheckupForm && (
                        <div className='addcheckup-form'>
                         <div className='addcheckup-content'>
                          <div className='addcheckup-item'>
                            <label>CheckUp/Test Name</label>
                            <input  type="text" name="testName" value={checkup.testName} onChange={handleChackupChange} required/>
                          </div>
                          <div className='addcheckup-date'>
                            <label>Evaluation Date</label>
                            <input  type="date" name="evaluationDate" value={checkup.evaluationDate} onChange={handleChackupChange} required/>
                          </div>
                          </div> 
                          <div className='addcheckup-button'>
                            <SubTextButton text="Add" height="25px" width="80px" onClick={handelAddCheckup}/>
                            <SubTextButton text="Close" height="25px" width="80px" onClick={handelCloseAddCheckupform}/>
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
                      <SubTextButton text="Add Treatment Plan" height="35px" width="200px" onClick={handleOpenAddTreatmentForm}/>
                    </div>
                    {isOpenAddTreatmentForm && (
                        <div className='addtreatment-form'>
                          <div className='druginfo'>Drug info</div>
                          <div className='addtreatment-content'>
                            <div className='addtreatment-item'>
                              <label>Drug Name</label>
                              <input  type="text" name="drugName" value={treatmentPlan.drugName} onChange={handleInputChange} required/>
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
                            <SubTextButton text="Add" height="25px" width="80px" onClick={handleAddTreatment} />
                            <SubTextButton text="Close" height="25px" width="80px" onClick={handleCloseAddTreatmentForm}/>
                          </div>
                        </div> 
                      )}
                    <div className='parttwo-treatmetdates'>
                      <div className='treatmetdates-item'>
                        <label>Start Date</label>
                        <input  type="date" name="startDate" value={newTreatmentForm.startDate} onChange={handletreatmetInputChange} required/>
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
                      <input  type="text" name="doctorEmail" value={newTreatmentForm.doctorInfo.doctorEmail} onChange={handleDoctorInfoChange} required/>
                    </div>
                  </div>
                </div>
                <div className='hospital-info'>
                  <div className='form-part-Two'>
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
                        <input  type="text" name="hospitalPhone" value={newTreatmentForm.hospitalInfo.hospitalPhone} onChange={handleHospitalInfoChange} required/>
                      </div>
                      <div className='part-item'>
                        <label>Email</label>
                        <input  type="text" name="hospitalEmail" value={newTreatmentForm.hospitalInfo.hospitalEmail} onChange={handleHospitalInfoChange} required/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='form-submitbutton'>
                  <SubTextButton text="Create" height="35px" width="200px"/>
                </div>    
              </div>
            </div>
          </Card>
        </div>
      )}
      {isOpenTreatment && (
        <div className='popup'>
          <Card width="70%" height="80vh">
            <div className="popup-title">
                <div className='title-closebutton'>
                    On-going Treatment
                    <Button text="Close Treatment" height="35px" width="180px" />
                </div>
                <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseCurrentTreatment} />
            </div>
            <div className='treatment-details'>
              <div className='details-group-one'>
                <div className='group-item'>
                  <div className='itemname'>Treatment Id</div>
                  <div className='itemvalue'>001</div>
                </div>
                <div className='group-item'>
                  <div className='itemname'>Start Date</div>
                  <div className='itemvalue'>001</div>
                </div>
                <div className='group-item'>
                  <div className='itemname'>End Date</div>
                  <div className='itemvalue'>001</div>
                </div>
              </div>
              <div className='details-group-two'>
                <div className='group-item'>
                  <div className='itemname'>Doctor's Notes</div>
                  <div className='itemvalue'><SubTextButton text="Open" height="26px" width="100px" /></div>
                </div>
                <div className='group-item'>
                  <div className='itemname'>Medical CheckUp Info</div>
                  <div className='itemvalue'><SubTextButton text="Open" height="26px" width="100px" /></div>
                </div>
              </div>
            </div>
            <div className='treatment-shedule'>
              <div className='shedule-header'>Current Treatment Shedule</div>
              <div className='shedule-container'>
                <div className='scontainer-header'>
                  <div className='drugname'>Drug Name</div>
                  <div className='time'>Time</div>
                  <div className='tap-cap'>Tap/Cap At a Time</div>
                  <div className='hourly'>Every Hourly</div>
                  <div className='meals'>Before/After Meals</div>
                </div>
                <div className='scontainer-scrollable'>
                  <div className='scontainer-values'>
                    <div className='drugname'>Drug Name</div>
                    <div className='time'>
                      <div className='timetab'>Morning</div>
                      <div className='timetab'>Noon</div>
                      <div className='timetab'>Night</div>
                    </div>
                    <div className='tap-cap'>2 tabs/cap</div>
                    <div className='hourly'>every '8' hours</div>
                    <div className='meals'><div className='mealtab'>Before</div></div>
                  </div>
                  <div className='scontainer-values'>
                    <div className='drugname'>Drug Name</div>
                    <div className='time'>
                      <div className='timetab'>Morning</div>
                      <div className='timetab'>Night</div>
                    </div>
                    <div className='tap-cap'>2 tabs/cap</div>
                    <div className='hourly'>every '8' hours</div>
                    <div className='meals'><div className='mealtab'>Before</div></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default PatientOngoingTreatment
