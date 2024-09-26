import React, { useEffect, useState } from 'react';
import Card from '../../../components/BaseCard-component/Card';
import './PatientProfile.css';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import { LuPlus, LuPencilLine, LuListOrdered, LuFileText, LuX } from "react-icons/lu";
import axios from 'axios';

function PatientProfile() {
    const [patinerProfileData, setPatientProfileData] = useState({
        firstName: '',
        lastName: '',
        addressNo: '',
        street: '',
        city: '',
        province: '',
        nic: '',
        phoneNumber: '',
        email: '',
        birthday: '',
        gender: '',
        bloodType: '',
        height: '',
        weight: '',
        healthIssues: [],
        relatives: []
    });
    const [addRelativeFormData, setAddRelativeFormData] = useState({
        firstName: '',
        lastName: '',
        addressNo: '',
        street: '',
        city: '',
        province: '',
        nic: '',
        phoneNumber: '',
        email: '',
        relationship: ''
    })
    const [isPIeditpopupOpen, setIsPIeditpopupOpen] = useState(false);
    const [isAddHIssueOpen, setIsAddHIssueOpen] = useState(false);
    const [isOpenAllHIpopup, setIsOpenAllHIpopup] = useState(false);
    const [isOpenRelative, setIsOpenRelative] = useState(false);
    const [isOpenAddRelative, setIsOpenAddRelative] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/patient/profile/66e2a68ca560dfd45794e53a",{
        method: "GET",
        headers: {'content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('patientdata', data);
        setPatientProfileData((prevState) => ({
            ...prevState,
            ...data
        }));
        console.log('patient', patinerProfileData);
    })
    .catch((error => { console.log(error) }));
  }, []);  

  const handlePIeditButtonClick = () => {
    setIsPIeditpopupOpen(true);
  }

  const handlePIClose = () => {
    setIsPIeditpopupOpen(false);
  }

  const handelAddHIButton = () => {
    setIsAddHIssueOpen(true);
  }

  const handleAddHIClose = () => {
    setIsAddHIssueOpen(false);
  }

  const handleOpenHI = () => {
    setIsOpenAllHIpopup(true);
  }

  const handleCloseHI = () => {
    setIsOpenAllHIpopup(false);
  }

  const handleOpenRelative = () => {
    setIsOpenRelative(true);
  }

  const handleCloseRelative = () => {
    setIsOpenRelative(false);
  }

  const handleOpenAddRelative = () => {
    setIsOpenAddRelative(true);
  }

  const handleCloseAddRelative = () => {
    setIsOpenAddRelative(false);
  }

  const {firstName, lastName, addressNo, street, city, province, nic, phoneNumber, email, relationship} = addRelativeFormData;
  const onChange = (e) => setAddRelativeFormData({...addRelativeFormData, [e.target.name]: e.target.value});

  const onSubmitAddRelative = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post('http://localhost:5000/api/patient/profile/66e2a68ca560dfd45794e53a/relative', 
            {
                firstName, lastName, addressNo, street, city, province, nic, phoneNumber, email, relationship
            }
        );
        window.alert(response.msg);
    }catch (error){
        console.log(error.msg);
    }
  }


  return (
    <div className='patient-profile'>
        <div className='patient-profile-button-container'>
        <Button text="Add Medical Data" height="40px" width="300px" />
        <Button text="Add Relative" height="40px" width="300px" onClick={handleOpenAddRelative}/>
        </div>
        <div className='patient-profile-container'>
            <Card width="56%" height="76vh">
                <div className='card-title'>Personal info  <SubButton icon={<LuPencilLine />} height="30px" width="60px" onClick={handlePIeditButtonClick} /></div>
                <div className='card-content'>
                    <div className='content-item'>
                        <div className='item-name'>Name</div>
                        <div className='item-value'>{patinerProfileData.firstName} {patinerProfileData.lastName}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Address</div>
                        <div className='item-value'>{patinerProfileData.addressNo}, {patinerProfileData.street}, {patinerProfileData.city} / {patinerProfileData.province} Province</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>NIC</div>
                        <div className='item-value'>{patinerProfileData.nic}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Phone No</div>
                        <div className='item-value'>{patinerProfileData.phoneNumber}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>email</div>
                        <div className='item-value'>{patinerProfileData.email}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Birthday</div>
                        <div className='item-value'>{patinerProfileData.birthday}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Gender</div>
                        <div className='item-value'>{patinerProfileData.gender}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Blood Type</div>
                        <div className='item-value'>{patinerProfileData.bloodType}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Height</div>
                        <div className='item-value'>{patinerProfileData.height}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Weight</div>
                        <div className='item-value'>{patinerProfileData.weight}</div>
                    </div>
                    <div className='content-item'>
                        <Card width="100%" height="22vh">
                            <div className='card-title'>Health Issues  
                                <div className='button-group'>
                                    <SubButton icon={<LuPlus />} height="30px" width="60px" onClick={handelAddHIButton}/>
                                    <SubButton icon={<LuListOrdered />} height="30px" width="60px" onClick={handleOpenHI}/>
                                </div>
                            </div>
                            <div className='card-content'>
                                 <div className='item-scrollable'>
                                    {patinerProfileData.healthIssues && patinerProfileData.healthIssues.map((issue, index) => {
                                        <div key={index} className='health-issue-item'>
                                            {issue.issue}
                                        </div>
                                    })}
                                 </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
            <Card width="42%" height="76vh">
                <div className='card-title'>My Relatives</div>
                <div className='relativecard-content'>
                    <div className='relativecontent-item'>
                        {patinerProfileData.relatives && patinerProfileData.relatives.map((relative, index) => (
                            <div key={index} className='relative'>
                                {relative.firstName} {relative.lastName}
                                <div className='button-group'>
                                    <SubButton icon={<LuFileText />} height="30px" width="60px" onClick={handleOpenRelative}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
        {isPIeditpopupOpen && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Edit Personal Info
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handlePIClose} />
                    </div>
                    <form >
                        <div className='form-item'>
                            <label>First Name</label>
                            <input  type="text" placeholder="First Name" value={patinerProfileData.firstName} />
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text" placeholder="Last Name" value={patinerProfileData.lastName} />
                        </div>
                        <div className='form-item'>
                            <label>AddressNo</label>
                            <input type="text" placeholder="AddressNo" value={patinerProfileData.addressNo} />
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input type="text" placeholder="Street" value={patinerProfileData.street} />
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text" placeholder="City" value={patinerProfileData.city} />
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input type="text" placeholder="Province" value={patinerProfileData.province} />
                        </div>
                        <div className='form-item'>
                            <label>PhoneNo</label>
                            <input type="text" placeholder="PhoneNo" value={patinerProfileData.phoneNumber} />
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input type="text" placeholder="Email" value={patinerProfileData.email} />
                        </div>
                        <div className='form-item'>
                            <label>Height</label>
                            <input type="text" placeholder="Height" value={patinerProfileData.height} />
                        </div>
                        <div className='form-item'>
                            <label>Weight</label>
                            <input type="text" placeholder="Weight" value={patinerProfileData.weight} />
                        </div>
                    </form>
                    <div className='button'>
                        <Button text="Save" height="35px" width="200px" />
                    </div>
                </Card>
            </div>
        )}
        {isAddHIssueOpen && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add Health Issues
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleAddHIClose} />
                    </div>
                </Card>
            </div>
        )}
        {isOpenAllHIpopup && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Health Issues
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseHI} />
                    </div>
                </Card>
            </div>
        )}
        {isOpenRelative && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Relative Info
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseRelative} />
                    </div>
                    <div className='card-content'>
                        <div className='content-item'>
                            <div className='item-name'>Name</div>
                            <div className='item-value'>{patinerProfileData.firstName} {patinerProfileData.lastName}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>Address</div>
                            <div className='item-value'>{patinerProfileData.addressNo}, {patinerProfileData.street}, {patinerProfileData.city} / {patinerProfileData.province} Province</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>NIC</div>
                            <div className='item-value'>{patinerProfileData.nic}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>Phone No</div>
                            <div className='item-value'>{patinerProfileData.phoneNumber}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>email</div>
                            <div className='item-value'>{patinerProfileData.email}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>Relationship</div>
                            <div className='item-value'>{patinerProfileData.birthday}</div>
                        </div>
                    </div>    
                </Card>
            </div>
        )}
        {isOpenAddRelative && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add Relative
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseAddRelative} />
                    </div>
                    <form onSubmit={onSubmitAddRelative}>
                        <div className='form-item'>
                            <label>First Name</label>
                            <input  type="text" placeholder="First Name" name="firstName" value={firstName} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>AddressNo</label>
                            <input type="text" placeholder="AddressNo" name="addressNo" value={addressNo} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input type="text" placeholder="Street" name="street" value={street} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text" placeholder="City" name="city" value={city} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input type="text" placeholder="Province" name="province" value={province} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>NIC</label>
                            <input type="text" placeholder="NIC" name="nic" value={nic} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>PhoneNo</label>
                            <input type="text" placeholder="PhoneNo" name="phoneNumber" value={phoneNumber} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Relationship</label>
                            <input type="text" placeholder="Relationship" name="relationship" value={relationship} onChange={onChange} required/>
                        </div>
                        <button type='submit'>save</button>
                    </form>
                    <div className='button'>
                        <Button text="Save" height="35px" width="200px" />
                    </div>
                </Card>
            </div>
        )}
   </div> 
  )
}

export default PatientProfile;
