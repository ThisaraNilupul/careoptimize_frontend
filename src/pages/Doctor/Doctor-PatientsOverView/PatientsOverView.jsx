import React, { useEffect, useState } from 'react';
import Card from '../../../components/BaseCard-component/Card';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import { LuSearch, LuChevronRight, LuBookOpen, LuX, LuChevronsLeftRight } from "react-icons/lu";
// import { CiPaperplane } from "react-icons/ci";
import { BsHandIndexThumb } from "react-icons/bs";
import './PatientsOverView.css';

function PatientsOverView() {
  const [allPatientsList, setAllPatientsList] = useState([]);
  const [allOngoingTreatmentList, setAllOngoingTreatmentList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectPatient, setIsSelectPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isOpenOngoingTreatment, setIsOpenOngoingTreatment] = useState(false);
  const [selectedOngoingTreatment, setSelectedOngoingTreatment] = useState(null);

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
                    <SubButton icon={<BsHandIndexThumb />} height="30px" width="60px" onClick={() => handleSelectedPatientData(patient)} />
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
                <div className='s_value'>{`${selectedPatient.firstName} ${selectedPatient.lastName}`}</div>
              </div>
              <div className='s_item'>
                <div className='s_name'>Age</div>
                <div className='s_value'>{calculateAge(selectedPatient.birthday)}</div>
              </div>
              <div className='s_item'>
                <div className='s_name'>Gender</div>
                <div className='s_value'>{selectedPatient.gender}</div>
              </div>
              <div className='s_item'>
                <div className='s_name'>Phone No.</div>
                <div className='s_value'>{selectedPatient.phoneNumber}</div>
              </div>
              <div className='s_item'>
                <div className='s_name'>Email</div>
                <div className='s_value'>{selectedPatient.email}</div>
              </div>
              <div className='s_item'>
                <div className='s_name'>Address</div>
                <div className='s_value'>{selectedPatient.addressNo}/ {selectedPatient.street}/ {selectedPatient.city}/ {selectedPatient.province} province</div>
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
            <div className='ss_title'>Patient's Medical History</div>
            <div className='View-medical-history-button'>
                <SubTextButton text="View Medical History" height="40px" width="300px" />
            </div>
          </div>
        ) : (
          <div className='isSelectPatient-false'>
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
                          <Button text="Close Treatment" height="35px" width="180px" />
                        <div className='header-group-item'>
                            <div className='itemname'>Start Date: </div>
                            <div className='itemvalue'>{setdateFormat(selectedOngoingTreatment.startDate)}</div>
                        </div>
                        <LuChevronsLeftRight />
                        <div className='header-group-item'>
                            <div className='itemname'>End Date:</div>
                            <div className='itemvalue'>{setdateFormat(selectedOngoingTreatment.endDate)}</div>
                        </div>
                      </div>
                      <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseOngoingTreatment} />
                  </div>
                  <div className='treatment-details'>
                    <div className='details-group-one'>
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
