import React, { useEffect, useState } from 'react';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import Card from '../../../components/BaseCard-component/Card';
import './PatientOngoingTreatment.css';
import { LuX, LuChevronsLeftRight } from "react-icons/lu";


function PatientOngoingTreatment() {
  const userID = localStorage.getItem('userId');
  const [allOnGoingTreatments, setAllOnGoingTreatments] = useState([]);
  const [selectedOngoingTreatment, setSelectedOngoingTreatment] = useState(null);
  const [isOpenTreatment, setIsOpenTreatment] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/treatments/${userID}`)
    .then((res) => res.json())
    .then((data) => {
      setAllOnGoingTreatments(data);
    })
    .catch((error) => {
      console.log(error);
      setNotification({
          status: 'failed',
          message: error.data.msg,
        })
    });
  }, []);

  const handleOpenCurrentTreatment = (treatment) => {
    setSelectedOngoingTreatment(treatment)
    setIsOpenTreatment(true);
  }

  const handleCloseCurrentTreatment = () => {
    setIsOpenTreatment(false);
  }

  const setdateFormat = (date) => {
    const ndate = new Date(date);
    const formattedDate = ndate.toISOString().split('T')[0];

    return formattedDate
  }

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className='patient-OngoingTreatment-container'>
      {allOnGoingTreatments.length > 0 ? (
        allOnGoingTreatments.map((treatmet, index) => (
          <div key={index} className='card-container'>
            <Card width="390px" height="200px">
              <div className='t_card-item'>
                <div className='t_itemname'>Treatment Id</div>
                <div className='t_itemvalue'>{treatmet._id}</div>
              </div>
              <div className='t_card-item'>
                <div className='t_itemname'>Diagnosis Name</div>
                <div className='t_itemvalue'>{treatmet.diagnosis}</div>
              </div>
              <div className='t_card-item'>
                <div className='t_itemname'>Start Date</div>
                <div className='t_itemvalue'>{setdateFormat(treatmet.startDate)}</div>
              </div>
              <div className='t_card-item'>
                <div className='t_itemname'>End Date</div>
                <div className='t_itemvalue'>{setdateFormat(treatmet.endDate)}</div>
              </div>
              <div className='t_card-item'>
                <div className='t_itemname'>Days to Complete</div>
                <div className='t_itemvalue'>{treatmet.days}</div>
              </div>
              <div className='card-button'>
                <SubTextButton text="Open" height="28px" width="100px" onClick={() => handleOpenCurrentTreatment(treatmet)}/>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <div className='patient-OngoingTreatment-container-false'>There is no On-going Treatments currently going on.</div>
      )}
      {isOpenTreatment && (
            <div className='popup'>
                <Card width="70%" height="80vh">
                  <div className="popup-title">
                      <div className='title-closebutton'>
                          On-going Treatment -
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
                      <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseCurrentTreatment} />
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

export default PatientOngoingTreatment
