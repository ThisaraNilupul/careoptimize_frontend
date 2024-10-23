import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../components/BaseCard-component/Card';
import ButtonMain from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import { LuSearch, LuChevronRight, LuBookOpen, LuX, LuChevronsLeftRight, LuSendHorizonal } from "react-icons/lu";
import { CiCircleQuestion, CiWarning } from "react-icons/ci";
import { RiFeedbackLine } from "react-icons/ri";
import { ReactComponent as DoctorOne } from '../../../assets/Doctor1.svg';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GppBadIcon from '@mui/icons-material/GppBad';
import UpdateIcon from '@mui/icons-material/Update';
import VerifiedIcon from '@mui/icons-material/Verified';
import './PatientsOverView.css';
import { green, yellow, red } from '@mui/material/colors';

const redMain = red.A400;
const redHover = red.A700;
const greenMain = green.A400;
const greenHover = green.A700;
const yellowMain = yellow.A400;
const yellowHover = yellow.A700;

function PatientsOverView() {
  const doctorID = localStorage.getItem('userId');
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [allOngoingTreatmentList, setAllOngoingTreatmentList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectPatient, setIsSelectPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isOpenOngoingTreatment, setIsOpenOngoingTreatment] = useState(false);
  const [selectedOngoingTreatment, setSelectedOngoingTreatment] = useState(null);
  const [isClickCloseTreatment, setIsClickCloseTreatment] = useState(false);
  const [reason, setReason] = useState('');
  const [addTOMedicalHistory, setAddToMedicalHistory] = useState(false);
  const [isOpenCheckupList, setIsOpenCheckupList] = useState(false);
  const [isSelecteCheckup, setIsSelecteCheckup] = useState(false);
  const [selectedCheckup, setSelectedCheckup] = useState(null);
  const [doctorProfileData, setDoctorProfileData] = useState({});
  const [feedbackNote, setFeedbackNote] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = allPatientsList.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
    setFilteredPatients(filtered);
  }

  const handleSelectedPatientData = async (patient) => {
    setSelectedPatient(patient);
    await fetch(`http://localhost:5000/api/doctor/treatments/${patient._id}`)
    .then((res) => res.json())
    .then((data) => {
      setAllOngoingTreatmentList(data);
    })
    .catch((error) => {
      console.log(error);
      setNotification({
          status: 'failed',
          message: error.data.msg,
        })
    });
    setIsSelectPatient(true);
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

  const closeNotification = () => {
    setNotification(null);
  };

  const setdateFormat = (date) => {
    const ndate = new Date(date);
    const formattedDate = ndate.toISOString().split('T')[0];

    return formattedDate
  }

  //open on-going treatment
  const handleOpenOngoingTreatment = (treatment) => {
    setSelectedOngoingTreatment(treatment);
    setIsOpenOngoingTreatment(true);
  }

  const handleCloseOngoingTreatment = () => {
    setIsOpenOngoingTreatment(false);
  }

  const handleOpenCheckupList = () => {
    setIsOpenOngoingTreatment(false);
    setIsSelecteCheckup(false);
    setIsOpenCheckupList(true);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/profile/${doctorID}`,{
        method: "GET",
        headers: {'content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((data) => {
        setDoctorProfileData(data);
    })
    .catch((error => { console.log(error) }));
  }, [isSelecteCheckup]);

  const handleSelecteCheckup = (checkup) => {
    setSelectedCheckup(checkup);
    setIsSelecteCheckup(true);
  }

  const handelSUbmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const feedbackData = {
        userId: selectedOngoingTreatment.patientId,
        assignById: selectedOngoingTreatment.doctorInfo.doctorId,
        assignByfirstName: selectedOngoingTreatment.doctorInfo.firstName,
        assignBylastName:  selectedOngoingTreatment.doctorInfo.lastName,
        treatmentId: selectedOngoingTreatment._id,
        evaluateById: doctorID,
        evaluateByfirstName: doctorProfileData.firstName,
        evaluateBylastName: doctorProfileData.lastName,
        testName: selectedCheckup.testName,
        status,
        feedback: feedbackNote,
      };

      const response = await axios.post('http://localhost:5000/api/doctor/checkup/feedback', feedbackData);
      setNotification({
        status: 'success',
        message: response.data.msg || response.msg,
      });
      setIsSelecteCheckup(false);
    }catch (error) {
      console.error('Error submitting feedback:', error);
      setNotification({
        status: 'failed',
        message: error.data.msg,
      });
    }finally {
      setIsSubmitting(false);
    }

  }

  const handleCloseCheckupList = () => {
    setIsOpenCheckupList(false);
    setIsOpenOngoingTreatment(true);
  }

  const handelOpenCloseTreatment = () => {
    setIsClickCloseTreatment(true);
  }

  const handelReasonChange = (e) => {
    setReason(e.target.value);
  }

  const handleCheckboxChange = (e) => {
    setAddToMedicalHistory(true);
  }

  const areAllCheckupsEvaluated = (checkups) => {
    return checkups.every(checkup => checkup.evaluated === true);
  };

  const handleCloseTreatment = async () => {
    if(!areAllCheckupsEvaluated(selectedOngoingTreatment.checkups)) {
      alert("All checkups must be evaluated before closing the treatment.");
      return;
    }

    if (!reason) {
      setNotification({
        status: 'failed',
        message: 'Please provide a reason for closing the treatment.'
      });
      return;
    }

    try {
      const closeData = {
        treatmentId: selectedOngoingTreatment._id,
        reason,
        closedDate: new Date(),
        addTOMedicalHistory
      }

      const response = await axios.post(`http://localhost:5000/api/doctor/closeTreatment`, closeData);
      setIsClickCloseTreatment(false);
      setIsOpenOngoingTreatment(false);
      setNotification({
        status: 'success',
        message: response.data.msg || response.msg,
      });
    } catch (error) {
      setNotification({
        status: 'failed',
        message: error.data.msg,
      });
    }
  }

  const handleCloseCloseTreatment = () => {
    setIsClickCloseTreatment(false);
  }

  const handleCloseOpenCheckupList = () => {
    setIsClickCloseTreatment(false);
    setIsOpenCheckupList(true);
  }

  return (
    <div className='patientsoverview'>
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
        <div className='title'>Patient's Over-View</div>
        {isSelectPatient ? (
          <div className='isSelect-Patient-true'>
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
              <div className='s_item'>
                <div className='s_name'>Address</div>
                <div className='s_value'>: {selectedPatient.addressNo}/ {selectedPatient.street}/ {selectedPatient.city}/ {selectedPatient.province} province</div>
              </div>
            </div>
            <div className='s_title'>Patient's Relative Info</div>
            <div className='hia_item-container'>
                <div className='hia_item-true-header' >
                    <div className='hia_item-name'>Relative Name</div>
                    <div className='hia_item-relation'>Relationship</div>
                    <div className='hia_item-contact'>Phone No.</div>
                </div>
              {selectedPatient.relatives.length > 0 ? (
                selectedPatient.relatives.map((relative, index) => (
                  <div key={index} className='hia_item-true-vlues' >
                    <LuChevronRight />
                    <div className='hia_item-name'>{relative.firstName} {relative.lastName}</div>
                    <div className='hia_item-relation'>{relative.relationship}</div>
                    <div className='hia_item-contact'>{relative.phoneNumber}</div>
                  </div>
                ))
              ) : (
                <div className='hia_item-false'>No Relatives available</div>
              )}
            </div>
            <div className='s_title'>Patient's Health Issues & Allergies</div>
            <div className='hia_item-container'>
              {selectedPatient.healthIssues.length > 0 ? (
                selectedPatient.healthIssues.map((healthissue, index) => (
                  <div key={index} className='hia_item-true-vlues' >
                    <LuChevronRight />
                    <div className='hia_item-issue'>{healthissue.issue}</div>
                  </div>
                ))
              ) : (
                <div className='hia_item-false'>No Health Issues & Allergies</div>
              )}
            </div>
            <div className='ss_title'>Patient's On-going treatments</div>
            <div className='hia_item-container'>
                <div className='hia_item-true-header' >
                    <div className='hia_item-diagnosis'>Diagnosis</div>
                    <div className='hia_item-date'>Start Date</div>
                    <div className='hia_item-date'>End Date</div>
                    <div className='hia_item-button'>Open</div>
                </div>
              {allOngoingTreatmentList.length > 0 ? (
                allOngoingTreatmentList.map((treatment, index) => (
                  <div key={index} className='hia_item-true-vlues' >
                    <LuChevronRight />
                    <div className='hia_item-diagnosis'>{treatment.diagnosis}</div>
                    <div className='hia_item-date'>{setdateFormat(treatment.startDate)}</div>
                    <div className='hia_item-date'>{setdateFormat(treatment.endDate)}</div>
                    <div className='hia_item-button'><SubButton icon={<LuBookOpen />} height="30px" width="60px" onClick={() => handleOpenOngoingTreatment(treatment)}/></div>
                  </div>
                ))
              ) : (
                <div className='hia_item-false'>No On-going Treatments</div>
              )}
            </div>
            {/* <div className='ss_title'>Pending Checkups Results Evalutation</div>
            <div className='hia_item-container'>
                <div className='hia_item-true-header' >
                    <div className='hia_item-diagnosis'>Checkup</div>
                    <div className='hia_item-evaluate-date'>Evaluation Date</div>
                    <div className='hia_item-button'>Open</div>
                </div>
              {allOngoingTreatmentList.length > 0 ? (
                allOngoingTreatmentList.map((treatment, index) => (
                  <div key={index} className='hia_item-true-vlues' >
                    <LuChevronRight />
                    <div className='hia_item-diagnosis'>{treatment.diagnosis}</div>
                    <div className='hia_item-evaluate-date'>{setdateFormat(treatment.startDate)}</div>
                    <div className='hia_item-button'><SubButton icon={<RiFeedbackLine />} height="30px" width="60px" onClick={() => handleOpenOngoingTreatment(treatment)}/></div>
                  </div>
                ))
              ) : (
                <div className='hia_item-false'>No Pending Checkups to evaluate</div>
              )}
            </div> */}
            <div className='ss_title'>Patient's Medical History</div>
            <div className='View-medical-history-button'>
                <ButtonMain text="View Medical History" height="35px" width="250px" variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<ImportContactsIcon />}/>
            </div>
          </div>
        ) : (
          <div className='isSelectPatient-false'>
              <DoctorOne width="20%" height="30%" />
              <div className='noteone'>No patient selected</div>
              <div  className='notetwo'>Please choose a patient to check the patient's over view.</div>
          </div>
        )}
      </Card>
    </div>
    {isOpenOngoingTreatment && (
            <div className='popup'>
                <Card width="70%" height="80vh">
                  <div className="popup-title">
                      <div className='title-closebutton'>
                          On-going Treatment
                          <ButtonMain text="Close Treatment" height="28px" width="198px" variant="outlined" color="error" onClick={handelOpenCloseTreatment} icon={<GppBadIcon />}/>
                          <ButtonMain text="Update Shedule" height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<UpdateIcon />}/>
                          {selectedOngoingTreatment.checkups.length > 0 ? (
                          <ButtonMain text="Assigned Checkups" height="28px" width="220px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handleOpenCheckupList} icon={<VerifiedIcon />}/>
                          ) : (<div className='header-group-item'><div className='t-itemvalue'>No Checkups Assigned</div></div>)}
                      </div>
                      <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseOngoingTreatment} />
                  </div>
                  <div className='treatment-details'>
                    <div className='details-group-one'>
                      <div className='datereange-group-item'>
                        <div className='header-group-item'>
                            <div className='t-itemname'>Start Date : </div>
                            <div className='t-itemvalue'>{setdateFormat(selectedOngoingTreatment.startDate)}</div>
                        </div>
                        <LuChevronsLeftRight />
                        <div className='header-group-item'>
                            <div className='t-itemname'>End Date :</div>
                            <div className='t-itemvalue'>{setdateFormat(selectedOngoingTreatment.endDate)}</div>
                        </div>
                      </div>
                      <div className='group-item'>
                        <div className='itemname'>Diagnosis</div>
                        <div className='itemvalue'>{selectedOngoingTreatment.diagnosis}</div>
                      </div>
                      <div className='group-item-des'>
                        <div className='itemname'>Diagnosis description</div>
                        <div className='itemvalue'>{selectedOngoingTreatment.diagnosisDescription}</div>
                      </div>
                      <div className='group-item-des'>
                        <div className='itemname'>prescription</div>
                        <div className='itemvalue'>{selectedOngoingTreatment.prescription}</div>
                      </div>
                    </div>
                  </div>
                  <div className='treatment-shedule'>
                    <div className='shedule-header'>
                      Current Treatment Shedule
                    </div>
                    <div className='shedule-container'>
                      <div className='scontainer-header'>
                        <div className='drugname'>Drug Name</div>
                        <div className='time'>Time</div>
                        <div className='tap-cap'>Tap/Cap At a Time</div>
                        <div className='hourly'>Every Hourly</div>
                        <div className='meals'>Before/After Meals</div>
                      </div>
                      <div className='scontainer-scrollable'>
                        {selectedOngoingTreatment.treatmentPlans.map((t_items, index) => (
                        <div key={index} className='scontainer-values'>
                          <div className='v-drugname'>{t_items.drugName}</div>
                          <div className='v-time'>
                            {t_items.times.map((time, i) => (
                                <div key={i} className='time'>
                                    <div className='timetab' 
                                         style={{
                                            backgroundColor: time === "Morning" ? "#00FF9C" :
                                            time === "Evening" ?   "#EC53B0" :
                                            time === "Night" ?   "#80B3FF" :
                                            time === "Daily" ?   "#DCF2F1" :
                                            time === "Noon" ? "#FFE700" : "transparent"
                                        }}   
                                    >{time}</div>
                                </div>
                            ))}
                          </div>
                          <div className='v-tap-cap'>{t_items.dosage}</div>
                          <div className='v-hourly'>{t_items.hourly}</div>
                          <div className='v-meals'>
                            <div className='mealtab' style={{
                                        backgroundColor: t_items.mealInstruction === "After Meals" ? "rgb(86, 255, 71)" : 
                                        t_items.mealInstruction === "Before Meals" ? "rgb(71, 249, 255)" : "transparent"
                            }}>{t_items.mealInstruction}</div></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
            </div>
    )}
    {isOpenCheckupList && (
      <div className='popup'>
        <Card width="70%" height="80vh">
          <div className="popup-title">
            Checkup List        
            <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseCheckupList} />
          </div>
          <div className='checkup-popup-content'>
            <div className='checkuplist-container'>
              <div className='checkuplist-header'>
                <div className='testname'>Test Name</div>
                <div className='evaluation'>Evaluation date</div>
                <div className='feedback'>Feedback</div>
              </div>
              <div className='checkuplist'>
                {selectedOngoingTreatment.checkups.map((checkup, index) => (
                  <div key={index} className='checkup'>
                    <div className='testname'>{checkup.testName}</div>
                    <div className='evaluation'>{setdateFormat(checkup.evaluationDate)}</div>
                    <SubButton icon={<RiFeedbackLine />} height="30px" width="60px" onClick={() => handleSelecteCheckup(checkup)}/>
                  </div>
                ))}
              </div>
            </div>
            {isSelecteCheckup ? (
            <div className='checkup-feedback-form'>
              {selectedCheckup.evaluated ? (
                  <div className='checkup-feedback-evaluated'>
                    <div>Selected Checkup is already evaluaded.</div>

                  </div>
              ) : (
                <div>
                  <div className='feedback-form-title'>
                    Feedback Form
                  </div>
                  <form onSubmit={handelSUbmitFeedback}>
                  <div className='feedback-content'>
                      <div className='feedback_item'>
                        <div className='f_name'>Test Name</div>
                        <div className='f_value'>: {selectedCheckup.testName}</div>
                      </div>
                      <div className='feedback_item'>
                        <div className='f_name'>Assigned By</div>
                        <div className='f_value'>: {selectedOngoingTreatment.doctorInfo.firstName} {selectedOngoingTreatment.doctorInfo.lastName}</div>
                      </div>
                      <div className='feedback_item'>
                        <div className='f_name'>Evaluated By</div>
                        <div className='f_value'>: {doctorProfileData.firstName} {doctorProfileData.lastName}</div>
                      </div>
                      <div className='feedback_item'>
                        <div className='f_name'>Status</div>
                        <div className='status_value'>
                          <div className='positive'>
                            <input type='radio' value='Positive' checked={status === 'Positive'} onChange={(e) => setStatus(e.target.value)} />
                            Positive
                          </div>
                          <div className='negative'>
                            <input type='radio' value='Negative' checked={status === 'Negative'} onChange={(e) => setStatus(e.target.value)} />
                            Negative
                          </div>
                        </div>
                      </div>
                      <div className='feedback_note'>
                        <div className='f_name'>Feedback note</div>
                        <textarea value={feedbackNote} onChange={(e) => setFeedbackNote(e.target.value)} required />
                      </div>
                      <div className='feedback_button'>
                        <ButtonMain text={isSubmitting ? 'Submitting...' : 'Submit'} type='submit' disabled={isSubmitting}  height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<VerifiedIcon />}/>
                      </div>
                  </div>
                  </form>
                </div>
              )}
            </div>
            
            ) : (
              <div className='checkup-feedback-form-false'>
                <div>Select a checkup to evaluate & give a feedback</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    )}
    {isClickCloseTreatment && (
      <div className='popup'>
        
        <Card width="40%" height="40vh">
          <div className="popup-title">
            Close Ongoing Treatment         
            <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseCloseTreatment} />
          </div>
          {areAllCheckupsEvaluated(selectedOngoingTreatment.checkups) ? (
            <div>
              <div className='werning-message'>
                {React.cloneElement(<CiCircleQuestion /> , { size: 20, color: "#970000", })}
                <div className='w-msg'>Are you sure want to close this ongoing treatment ?</div>
              </div>  
              <div className='reason-container'>
                <label>Reason for closing the treatment</label>
                <input type='text' value={reason} onChange={handelReasonChange}/>
              </div>
              <div className='addmh-container'>
                <input type='checkbox' checked={addTOMedicalHistory} onChange={handleCheckboxChange} />
                <div className='addmh-note'>Add to the patient's medical history.</div>
              </div>
              <div className='ct-button'>
                <SubTextButton text="Close Treatment" height="28px" width="200px" onClick={handleCloseTreatment} />
              </div>
            </div>
             ) : (
              <div className='treatmentclose-false'>
                  {React.cloneElement(<CiWarning /> , { size: 40, color: "#970000", })}
                  <div className='treatmentclose-false-note'>
                    Assigned checkup or checkups are not evaluated yet !<br/>
                    Please, Evaluated checkups that are not evaluated yet, before close the treatmenat.
                  </div>
                  <ButtonMain text="Open Checkups" height="28px" width="160px" onClick={handleCloseOpenCheckupList} />
              </div>
            )}
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

export default PatientsOverView
