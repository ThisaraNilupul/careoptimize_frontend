import React, { useEffect, useState } from 'react';
import Card from '../../../components/BaseCard-component/Card';
import './PatientMedicalHistory.css';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import CloseButton from '../../../components/BaseButton-component/CloseButton';
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { TbActivityHeartbeat, TbReportMedical, TbThumbUp, TbZoomCancel  } from "react-icons/tb";
import { LuX } from "react-icons/lu";
import axios from 'axios';
import ButtonMain from '../../../components/BaseButton-component/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';
import { green , yellow } from '@mui/material/colors';

const greenMain = green.A400;
const greenHover = green.A700;
const yellowMain = yellow.A400;
const yellowHover = yellow.A700;

function PatientMedicalHistory() {
  const patientId = localStorage.getItem('userId');
  const [allMedicalHistory, setAllMedicalHistory] = useState([]);
  const [allCheckupsHistory, setAllCheckupsHistory] = useState([]);
  const [groupedTreatmentsHistory, setGroupedTreatmentsHistory] = useState({});
  const [groupedCheckupsHistory, setGroupedCheckupsHistory] = useState({});
  const [expandedYears, setExpandedYears] = useState([]);
  const [expandedCheckupsYears, setExpandedCheckupsYears] = useState([]);
  const [isOpenSelectedTreatment, setIsOpenSelectedTreatment] = useState(false);
  const [selectedTreatmenyHistory, setSelectedTreatmenyHistory] = useState(null);
  const [isOpenSelectedCheckup, setIsOpenSelectedCheckup] = useState(false);
  const [selectedCheckupHistory, setSelectedCheckupHistory] = useState(null);

  useEffect(() => {
    const getMedicalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/medical-history/${patientId}`);
        
        if (response.data && response.data.length > 0) {
          setAllMedicalHistory(response.data);
        } else {
          console.log("No treatments found for the patient.");
        }
      } catch (error) {
        console.log("Error fetching treatments history", error);
      }
    };
    
    getMedicalHistory();
  }, [patientId]);
  
  useEffect(() => {
    const getCheckupsHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/checkups-history/${patientId}`);

        if (response.data && response.data.length > 0) {
          setAllCheckupsHistory(response.data);
        } else {
          console.log("No Checkups history found for the patient.");
        }
      } catch (error) {
          console.log("Error fetching Checkups history: ", error);
      }      
    }

    getCheckupsHistory();
  }, [patientId]);


  useEffect(() => {
    if (allMedicalHistory.length > 0) {
      const grouped = groupTreatmentsByYear(allMedicalHistory);
      setGroupedTreatmentsHistory(grouped);
    }
  }, [allMedicalHistory]);

  useEffect(() => {
    if (allCheckupsHistory.length > 0) {
      const grouped = groupCheckupsByYear(allCheckupsHistory);
      setGroupedCheckupsHistory(grouped);
    }
  }, [allCheckupsHistory]);

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

  const groupCheckupsByYear = (checkups) => {
    return checkups.reduce((acc, checkup) => {
      const year = new Date(checkup.createdAt).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(checkup);
      return acc;
    }, {});
  }

  const toggleYear = (year) => {
    setExpandedYears((prevExpanded) => 
        prevExpanded.includes(year) ? prevExpanded.filter((y) => y !== year) : [...prevExpanded, year]
    );
  };

  const toggleCheckupsYear = (year) => {
    setExpandedCheckupsYears((prevExpanded) => 
      prevExpanded.includes(year) ? prevExpanded.filter((y) => y !== year) : [...prevExpanded, year]
    );
  }

  const setdateFormat = (date) => {
    const ndate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    const formattedDate = ndate.split('T')[0];

    return formattedDate;
  };

  const setDateFormatwithyear = (date) => {
    const ndate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    const formattedDate = ndate.split('T')[0];

    return formattedDate;
  }

  const handelOpenTreatment = (treatment) => {
    setSelectedTreatmenyHistory(treatment);
    setIsOpenSelectedTreatment(true);
  }

  const handelCloseTreatment = () => {
    setIsOpenSelectedTreatment(false);
  }

  const handleOpenCheckup = (checkup) => {
    setSelectedCheckupHistory(checkup);
    setIsOpenSelectedCheckup(true);
  }

  const handleCloseCheckup = () => {
    setIsOpenSelectedCheckup(false);
  }

  return (
    <div className='medicalhistory'>
      <div className='filter'>
        <ButtonMain text="Apply Filter" height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<FilterAltIcon />}/>
      </div>
      <div className='medicalhistory-conten'>
        <Card width="48vw" height="78vh">
          <div className='treatmenthistory-title'>Treatments History</div>
          <div className='treatmenthistory-container'>
            {Object.keys(groupedTreatmentsHistory).length === 0 ? (
              <div className='treatmenthistory-container-false'>No medical history available for this patient.</div>
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
                                <div className='treatment-date'><div className='t-tag'>Start at :</div>{setdateFormat(treatment.treatmentInfo.startDate)}</div>
                                <div className='treatment-date'><div className='t-tag'>Closed at :</div>{setdateFormat(treatment.closedDate)}</div>
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
        </Card>
        <Card width="31vw" height="78vh">
            <div className='treatmenthistory-title'>Medical Checkups History</div>
            <div className='checkupshistory-container'>
              {Object.keys(groupedCheckupsHistory).length === 0 ? (
                <div className='checkupshistory-container-false'>No Checkups history available for this patient.</div>
              ) : (
                Object.keys(groupedCheckupsHistory).map((year) => (
                  <div key={year} className='years-list'>
                    <div className='Checkup-yeargroup' onClick={() => toggleCheckupsYear(year)}>
                      <div className='i-year'>
                      <TbActivityHeartbeat />{year} - Checkups
                      </div>
                      {expandedCheckupsYears.includes(year) ? <TfiAngleUp /> : <TfiAngleDown />}</div>
                    <div>
                      {expandedCheckupsYears.includes(year) && (
                          <div className='checkup-list'>
                              {groupedCheckupsHistory[year].map((checkup) => (
                              <div key={checkup._id} className='checkup'>
                                  <div className='checkup-name'><div className='t-tag'>Test :</div>{checkup.testName}</div>
                                  <div className='checkup-date'><div className='t-tag'>Evaluated on :</div>{setdateFormat(checkup.createdAt)}</div>
                                  <SubButton icon={<TbReportMedical />} height="29px" width="35px" onClick={() => handleOpenCheckup(checkup)}/>
                              </div>
                              ))}
                          </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
        </Card>
      </div>
      {isOpenSelectedTreatment && (
        <div className="popup">
            <Card width="96vw" height="86vh">
                <div className="popup-title">
                    <div className='download-copy-title'>
                        Treatment Info
                        <ButtonMain text="Download PDF" height="28px" width="200px"  variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<DownloadIcon />}/>
                    </div>
                    <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handelCloseTreatment} />
                </div>
                <div className='info-container'>
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
      {isOpenSelectedCheckup && (
        <div className="popup">
          <Card width="36vw" height="86vh">
              <div className="popup-title">
                    <div className='download-copy-title'>
                        Checkup Info
                    </div>
                    <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseCheckup} />
              </div>
              <div className='Checkupinfo-container'>
              <ButtonMain text="Download PDF" height="28px" width="200px"  variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<DownloadIcon />}/>
                <div className='checkup-info'>
                  <div className='title'>Checkup Info</div>
                  <div className='checkup-detalis'>
                      <div className='detail-item'>
                          <div className='checkup-name'>Checkup Id</div>
                          <div className='ditem-value'>: {selectedCheckupHistory._id}</div>
                      </div>
                      <div className='detail-item'>
                          <div className='checkup-name'>Test Name</div>
                          <div className='ditem-value'>: {selectedCheckupHistory.testName}</div>
                      </div>
                      <div className='detail-item'>
                          <div className='checkup-name'>Evaluated On</div>
                          <div className='ditem-value'>: {setDateFormatwithyear(selectedCheckupHistory.createdAt)}</div>
                      </div>
                      <div className='detail-item'>
                          <div className='checkup-name'>status</div>
                          <div className='ditem-value'>: {selectedCheckupHistory.status}</div>
                      </div>
                      <div className='detail-item'>
                          <div className='checkup-name'>Doctor's Feedback</div>
                          <div className='ditem-value'>: {selectedCheckupHistory.feedback}</div>
                      </div>
                  </div>
                </div>
                <div className='doctor-info'>
                  <div className='title'>Assigned By</div>
                  <div className='adoctor-info'>
                      <div className='ad-item'>Dr. {selectedCheckupHistory.assignByfirstName} {selectedCheckupHistory.assignBylastName}</div>
                      <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.title}</div>
                      <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.doctorPhone}</div>
                      <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.doctorEmail}</div>
                  </div>
                  <div className='title'>Evaluated By</div>
                  <div className='adoctor-info'>
                      <div className='ad-item'>Dr. {selectedCheckupHistory.evaluateByfirstName} {selectedCheckupHistory.evaluateBylastName}</div>
                      <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.title}</div>
                      <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.doctorPhone}</div>
                      <div className='ad-item'>{selectedTreatmenyHistory.treatmentInfo.doctorInfo.doctorEmail}</div>
                  </div>
                </div>
              </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PatientMedicalHistory;
