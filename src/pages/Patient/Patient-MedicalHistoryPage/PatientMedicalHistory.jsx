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

function PatientMedicalHistory() {
  const patientId = localStorage.getItem('userId');
  const [allMedicalHistory, setAllMedicalHistory] = useState([]);
  const [groupedTreatmentsHistory, setGroupedTreatmentsHistory] = useState({});
  const [expandedYears, setExpandedYears] = useState([]);
  const [isOpenSelectedTreatment, setIsOpenSelectedTreatment] = useState(false);
  const [selectedTreatmenyHistory, setSelectedTreatmenyHistory] = useState(null);

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
    if (allMedicalHistory.length > 0) {
      const grouped = groupTreatmentsByYear(allMedicalHistory);
      setGroupedTreatmentsHistory(grouped);
    }
  }, [allMedicalHistory]);

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

  return (
    <div className='medicalhistory'>
      <div className='filter'>
        <SubTextButton text="Apply Filter" height="28px" width="200px" />
      </div>
      <div className='medicalhistory-conten'>
        <Card width="55vw" height="78vh">
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
        <Card width="24vw" height="78vh">
            <div className='treatmenthistory-title'>Medical Checkups History</div>
        </Card>
      </div>
      {isOpenSelectedTreatment && (
        <div className="popup">
            <Card width="96vw" height="86vh">
                <div className="popup-title">
                    <div className='download-copy-title'>
                        Treatment Info
                        <SubTextButton text="Download PDF copy" height="28px" width="200px" />
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
    </div>
  );
}

export default PatientMedicalHistory;
