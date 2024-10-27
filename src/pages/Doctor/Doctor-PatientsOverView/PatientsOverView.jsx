import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../components/BaseCard-component/Card';
import ButtonMain from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import CloseButton from '../../../components/BaseButton-component/CloseButton';
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { TbActivityHeartbeat, TbReportMedical, TbThumbUp, TbZoomCancel  } from "react-icons/tb";
import { LuSearch, LuChevronRight, LuBookOpen, LuX, LuChevronsLeftRight, LuSendHorizonal, LuCheck } from "react-icons/lu";
import DownloadIcon from '@mui/icons-material/Download';
import { CiCircleQuestion, CiWarning } from "react-icons/ci";
import { RiFeedbackLine } from "react-icons/ri";
import { ReactComponent as DoctorOne } from '../../../assets/Doctor1.svg';
import { ReactComponent as Emptypaper } from '../../../assets/emptypaper.svg';
import { ReactComponent as MedicalHistory } from '../../../assets/medicalHistory.svg';
import { ReactComponent as Checkup } from '../../../assets/checkups.svg';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GppBadIcon from '@mui/icons-material/GppBad';
import UpdateIcon from '@mui/icons-material/Update';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddIcon from '@mui/icons-material/Add';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './PatientsOverView.css';
import { green, yellow, blueGrey } from '@mui/material/colors';

const greyMain = blueGrey.A100;
const greyHover = blueGrey.A200;
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
  const [isOpneNewTreatmentForm, setIsOpneNewTreatmentForm] = useState(false);
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
  const [isOpenSelectClinic, setIsOpenSelectClinic] = useState(false);
  const [isOpenMedicalHistory, setIsOpenMedicalHistory] = useState(false);
  const [allMedicalHistory, setAllMedicalHistory] = useState([]);
  const [groupedTreatmentsHistory, setGroupedTreatmentsHistory] = useState({});
  const [expandedYears, setExpandedYears] = useState([]);
  const [isOpenSelectedTreatment, setIsOpenSelectedTreatment] = useState(false);
  const [selectedTreatmenyHistory, setSelectedTreatmenyHistory] = useState(null);
  const [historyType, setHistoryType] = useState(10);

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

  //add new treatment plan
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

  //open patient's medical history

  useEffect(() => {
    const getMedicalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/medical-history/${newTreatmentForm.patientId}`);
        
        if (response.data && response.data.length > 0) {
          setAllMedicalHistory(response.data);
        } else {
          console.log("No treatments found for the patient.");
        }
      } catch (error) {
        setAllMedicalHistory([]);
        console.log("Error fetching treatments history", error);
      }
    };
    
    getMedicalHistory();
  }, [newTreatmentForm.patientId]); 

  const handleOpenMedicalHistory = () => {
    if (allMedicalHistory.length > 0) {
      const grouped = groupTreatmentsByYear(allMedicalHistory);
      setGroupedTreatmentsHistory(grouped);
    } else {
      setGroupedTreatmentsHistory([]);
    }
    setIsOpenMedicalHistory(true);  
  }

  const groupTreatmentsByYear = (treatments) => {
    return treatments.reduce((acc, treatment) => {
      const year = new Date(treatment.closedDate).getFullYear();
      
      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(treatment);
      return acc;
    }, {});
  };

  const toggleYear = (year) => {
    setExpandedYears((prevExpanded) => 
        prevExpanded.includes(year) ? prevExpanded.filter((y) => y !== year) : [...prevExpanded, year]
    );
  };

  const handleCloseMedicalHistory = () => {
    setIsOpenMedicalHistory(false);
  }

  const setdateFormatMH = (date) => {
    const ndate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    const formattedDate = ndate.split('T')[0];

    return formattedDate;
  };

  const setDateFormatwithyear = (date) => {
    const ndate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    const formattedDate = ndate.split('T')[0];

    return formattedDate;
  }

  const handleChange = (event) => {
    setHistoryType(event.target.value);
  };

  const handelOpenTreatment = (treatment) => {
    setSelectedTreatmenyHistory(treatment);
    setIsOpenSelectedTreatment(true);
  }

  const handelCloseTreatment = () => {
    setIsOpenSelectedTreatment(false);
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
        <div className='title'>Schedule a New Treatment Plan</div>
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
                <div className='hia_item-false'>
                  <Emptypaper width="10%" height="20%" />
                  No relatives have been added for this patient.
                </div>
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
                <div className='hia_item-false'>
                  <Emptypaper width="10%" height="20%" />
                  No reported health issues or allergies for this patient.
                </div>
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
                <div className='hia_item-false'>
                  <Emptypaper width="10%" height="20%" />
                  There are no ongoing treatments for this patient at the moment.
                </div>
              )}
            </div>
            <div className='ss_title'>Patient's Medical History</div>
            <div className='View-medical-history-button'>
                <ButtonMain text="View Medical History" height="35px" width="300px" variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} onClick={handleOpenMedicalHistory} icon={<ImportContactsIcon />}/>
            </div>
            <div className='add-treatment-plan-button'>
                {allOngoingTreatmentList.length > 0 && (
                  <div className='wraning-note'><AnnouncementIcon />Note: "This patient currently has an ongoing treatment plan in place."</div>
                )}
                <ButtonMain text="Add New Treatment" height="35px" width="300px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handleOpneNewTreatment} icon={<AddIcon />}/>
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
                  <form >
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
                        <ButtonMain text={isSubmitting ? 'Submitting...' : 'Submit'} type='submit' disabled={isSubmitting}  height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handelSUbmitFeedback} icon={<VerifiedIcon />}/>
                      </div>
                  </div>
                  </form>
                </div>
              )}
            </div>
            
            ) : (
              <div className='checkup-feedback-form-false'>
                <Checkup width="20%" height="25%" />
                <div>Select a checkup result to evaluate and add your feedback.</div>
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
                      <ButtonMain text="Add Prescription (img)" height="28px" width="250px" variant="contained" color="#000000" bgColor={greyMain} bgHoverColor={greyHover} icon={<AddIcon />}/>
                      <div className='prescription-img'>prescription.jpj</div>
                    </div>
                    <div className='parttwo-medicalcheckup'>
                      <ButtonMain text="Add Medical CheckUp" height="28px" width="235px" onClick={handelOpenAddCheckupform} variant="contained" color="#000000" bgColor={greyMain} bgHoverColor={greyHover} icon={<AddIcon />}/>
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
                      <ButtonMain text="Add Treatment Plan" height="28px" width="235px" onClick={handleOpenAddTreatmentForm} variant="contained" color="#000000" bgColor={greyMain} bgHoverColor={greyHover} icon={<AddIcon />}/>
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
                      <ButtonMain text="Select The Clinic" height="28px" width="200px" onClick={handlleOpenSelectClinic} variant="contained" color="#000000" bgColor={greyMain} bgHoverColor={greyHover} icon={<AddIcon />}/>
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
      {isOpenMedicalHistory && (
        <div className="popup">
          <Card width="50%" height="89vh">
            <div className="popup-title">
                <div className='select-type-history'>
                  Medical History
                  <FormControl variant="standard" sx={{ m: 0.8, minWidth: 200, height: 10 }} size="small">
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={historyType}
                      label="historyType"
                      onChange={handleChange}
                    >
                      <MenuItem value={10} selected>Treatments History</MenuItem>
                      <MenuItem value={20}>Checkups History</MenuItem>
                    </Select>
                  </FormControl>  
                </div>
                <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseMedicalHistory} />
            </div>
            <div className='dmh-filter'>
              <ButtonMain text="Apply Filter" height="28px" width="160px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<FilterAltIcon />}/>
            </div>
            <div>
              <div className='medicalhistory-container'>
                {groupedTreatmentsHistory.length === 0 ? (
                <div className='medicalhistory-container-false'>
                  <MedicalHistory width="25%" height="30%" />
                  No medical history has been recorded for this patient.
                </div>
                ) : (
                  Object.keys(groupedTreatmentsHistory).map((year) => (
                    <div key={year} className='years-list'>
                      <div className='yeargroup' onClick={() => toggleYear(year)}>
                        <div className='i-year'>
                        <TbActivityHeartbeat />{year} - treatments
                        </div>
                        {expandedYears.includes(year) ? <TfiAngleUp /> : <TfiAngleDown />}</div>
                      <div>
                        {expandedYears.includes(year) && (
                            <div className='treatment-list'>
                                {groupedTreatmentsHistory[year].map((treatment) => (
                                <div key={treatment._id} className='treatment'>
                                    <div className='treatment-name'><div className='t-tag'>Diagnosis :</div>{treatment.treatmentInfo.diagnosis}</div>
                                    <div className='treatment-date'><div className='t-tag'>Start at :</div>{setdateFormatMH(treatment.treatmentInfo.startDate)}</div>
                                    <div className='treatment-date'><div className='t-tag'>Closed at :</div>{setdateFormatMH(treatment.closedDate)}</div>
                                    <SubButton icon={<TbReportMedical />} height="29px" width="35px" onClick={() => handelOpenTreatment(treatment)}/>
                                </div>
                                ))}
                            </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>  
        </div>
      )}
      {isOpenSelectedTreatment && (
        <div className="popup">
            <Card width="96vw" height="89vh">
                <div className="popup-title">
                    <div className='download-copy-title'>
                        Treatment Info
                        <ButtonMain text="Download PDF" height="28px" width="200px"  variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<DownloadIcon />}/>
                    </div>
                    <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handelCloseTreatment} />
                </div>
                <div className='dmh-info-container'>
                    <div className='doctor-info'>
                        <div className='title'>Closed Reason</div>
                        <div className='closedreason'>
                            <div className='ad-item'>{selectedTreatmenyHistory.doctorReason}</div>
                            <div className='ad-item'>{setDateFormatwithyear(selectedTreatmenyHistory.closedDate)}</div>
                        </div>
                        <div className='title'>Assigned by</div>
                        <div className='adoctor-info'>
                            <div className='ad-item'>Dr. {selectedTreatmenyHistory.treatmentInfo.doctorInfo.firstName} {selectedTreatmenyHistory.treatmentInfo.doctorInfo.lastName}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.title}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.doctorPhone}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.doctorEmail}</div>
                        </div>
                        <div className='adclinic-info'>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.hospitalInfo.name}</div>
                            <div className='ad-item'>
                                {selectedTreatmenyHistory.treatmentInfo.hospitalInfo.addressNo} / {selectedTreatmenyHistory.treatmentInfo.hospitalInfo.street} / {selectedTreatmenyHistory.treatmentInfo.hospitalInfo.city} <br/> {selectedTreatmenyHistory.treatmentInfo.hospitalInfo.province} Province
                            </div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.hospitalInfo.hospitalPhone}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.hospitalInfo.hospitalEmail}</div>
                        </div>
                        <div className='title'>Patient's Info</div>
                        <div className='closedreason'>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.patientName}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.gender}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.age} years old</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.phone}</div>
                            <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.email}</div>
                        </div>
                    </div>
                    <div className='treatment-info'>
                        <div className='title'>Treatment Info</div>
                        <div className='t-detalis'>
                            <div className='detail-item'>
                                <div className='ditem-name'>Treatment Id</div>
                                <div className='ditem-value'>: {selectedTreatmenyHistory.treatmentInfo._id}</div>
                            </div>
                            <div className='detail-item'>
                                <div className='ditem-name'>Date range</div>
                                <div  className='ditem-value'>: {setDateFormatwithyear(selectedTreatmenyHistory.treatmentInfo.startDate)}  -  {setDateFormatwithyear(selectedTreatmenyHistory.treatmentInfo.endDate)}
                                    <div>: Assigned for {selectedTreatmenyHistory.treatmentInfo.days} days</div>
                                </div>
                            </div>
                            <div className='detail-item'>
                                <div className='ditem-name'>Diagnosis</div>
                                <div className='ditem-value'>: {selectedTreatmenyHistory.treatmentInfo.diagnosis}</div>
                            </div>
                            <div className='detail-item'>
                                <div className='ditem-name'>Description</div>
                                <div className='ditem-value'>: {selectedTreatmenyHistory.treatmentInfo.diagnosisDescription}</div>
                            </div>
                            <div className='detail-item'>
                                <div className='ditem-name'>Prescription</div>
                                <div className='ditem-value'>: {selectedTreatmenyHistory.treatmentInfo.prescription}</div>
                            </div>
                        </div>
                        <div className='title'>Treatment Shedule</div>
                        <div>
                            <div className='sheduleheader'>
                                <div className='sh-name'>Drug Name</div>
                                <div className='sh-time'>Time</div>
                                <div className='sh-dosage'>Dosage</div>
                                <div className='sh-houtly'>Every Hourly</div>
                                <div className='sh-meal'>Before/After Meals</div>
                            </div>
                            <div>
                                <div className='sedule-items'>
                                {selectedTreatmenyHistory.treatmentInfo.treatmentPlans.map((item, index) => (
                                    <div key={index} className='shedulevalues'>
                                        <div className='sh-name'>{item.drugName}</div>
                                        <div className='sh-time'>{item.times.map((time, i) => (
                                            <div key={i} className='time'>
                                                <div className='sh-timetab' style={{
                                                    backgroundColor: time === "Morning" ? "#00FF9C" :
                                                    time === "Evening" ?   "#EC53B0" :
                                                    time === "Night" ?   "#80B3FF" :
                                                    time === "Daily" ?   "#DCF2F1" :
                                                    time === "Noon" ? "#FFE700" : "transparent"
                                                }}>{time}</div>
                                            </div>
                                        ))}</div>
                                        <div className='sh-dosage'>{item.dosage}</div>
                                        <div className='sh-houtly'>{item.hourly}</div>
                                        <div className='sh-meal'>
                                            <div className='sh-mealtab' style={{
                                                backgroundColor: item.mealInstruction === "After Meals" ? "rgb(86, 255, 71)" : 
                                                item.mealInstruction === "Before Meals" ? "rgb(71, 249, 255)" : "transparent"
                                            }}>
                                                {item.mealInstruction}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='checkups-info'>
                        <div className='title'>Assigned Checkups Info</div>
                        <div className='checkups-container'>
                            <div className='checkup-header'>
                                <div className='ch-name'>Test Name</div>
                                <div className='ch-date'>Eva.Date</div>
                                <div className='ch-status'>Status</div>
                            </div>
                            <div className='checkup-items'>
                                {selectedTreatmenyHistory.treatmentInfo.checkups.length > 0 ? (<>
                                    {selectedTreatmenyHistory.treatmentInfo.checkups.map((checkup, index) => (
                                        <div key={index} className='checkup'>
                                            <div className='ch-name'>{checkup.testName}</div>
                                            <div className='ch-date'>{setDateFormatwithyear(checkup.evaluationDate)}</div>
                                            <div className='ch-status'>{checkup.evaluated ? <TbThumbUp /> : <TbZoomCancel /> }</div>
                                        </div>
                                    ))}
                                </>) : (
                                    <div>No checkups are assigned</div>
                                )}  
                            </div>
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

export default PatientsOverView
