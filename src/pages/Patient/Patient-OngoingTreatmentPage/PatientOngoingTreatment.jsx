import React, { useState } from 'react';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import Card from '../../../components/BaseCard-component/Card';
import './PatientOngoingTreatment.css';
import { LuX } from "react-icons/lu";


function PatientOngoingTreatment() {
  const [isOpneNewTreatmentForm, setIsOpneNewTreatmentForm] = useState(false);

  const handleOpneNewTreatment = () => {
    setIsOpneNewTreatmentForm(true);
  }

  const handleCloseNewTreatment = () => {
    setIsOpneNewTreatmentForm(false);
  }


  return (
    <div className='patient-OngoingTreatment-container'>
      <Button text="New Treatment" height="40px" width="300px" className="add-event-button" onClick={handleOpneNewTreatment} />
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
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Gender</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Age</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Phone No.</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Email</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                  </div>
                </div>
                <div className='break-line'></div>
                <div className='form-part-Two'>
                  <div className='parttwo-content'>
                    <div className='parttwo-item'>
                      <label>Medical Diagnosis</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='parttwo-item'>
                      <label>Description of the diagnosis</label>
                      <textarea  type="text" name="firstName" required/>
                    </div>
                    <div className='parttwo-item'>
                      <label>Medical Advice/Prescription</label>
                      <textarea  type="text" name="firstName" required/>
                    </div>
                    <div className='parttwo-prescription'>
                      <SubTextButton text="Add Prescription (img)" height="35px" width="200px"/>
                      <div className='prescription-img'>prescription.jpj</div>
                    </div>
                    <div className='parttwo-medicalcheckup'>
                      <SubTextButton text="Add Medical CheckUp" height="35px" width="200px"/>
                      <div className='medical-checkup-content'>
                        <div className='content-header'>
                          <div className='test-name'>CheckUp/Test Name</div>
                          <div className='test-name'>Evaluation Date</div>
                        </div>
                        <div className='content-list'></div>
                      </div>
                    </div>
                    <div className='parttwo-treatmentplan'>
                      <SubTextButton text="Add Treatment Plan" height="35px" width="200px"/>
                    </div>
                    <div className='parttwo-treatmetdates'>
                      <div className='treatmetdates-item'>
                        <label>Start Date</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='treatmetdates-item'>
                        <label>End Date</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='treatmetdates-item'>
                        <label>No. of Days</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                    </div>
                    <div className='treatmet-content'>
                        <div className='treatmetcontent-header'>
                          <div className='test-name'>Drug Name</div>
                          <div className='test-name'>Time</div>
                          <div className='test-name'>Tap/Cap At a Time</div>
                          <div className='test-name'>Every Hourly</div>
                          <div className='test-name'>Before/After Meals</div>
                        </div>
                        <div className='content-list'></div>
                      </div>
                  </div>
                </div>
                <div className='break-line'></div>
                <div className='doctor-info'>Doctor's Info</div>
                <div className='form-part-one'>
                  <div className='part-content'>
                    <div className='part-item'>
                      <label>First Name</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Last Name</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Title</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Phone No.</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                    <div className='part-item'>
                      <label>Email</label>
                      <input  type="text" name="firstName" required/>
                    </div>
                  </div>
                </div>
                <div className='hospital-info'>
                  <div className='form-part-Two'>
                    <div className='parttwo-content'>
                      <div className='parttwo-item'>
                        <label>Hospital/Clinic Name</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                    </div>
                  </div>
                  <div className='form-part-one'>
                    <div className='part-content'>
                      <div className='part-item'>
                        <label>Address No.</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='part-item'>
                        <label>Street</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='part-item'>
                        <label>City</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='part-item'>
                        <label>Province</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='part-item'>
                        <label>Phone No.</label>
                        <input  type="text" name="firstName" required/>
                      </div>
                      <div className='part-item'>
                        <label>Email</label>
                        <input  type="text" name="firstName" required/>
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
    </div>
  )
}

export default PatientOngoingTreatment
