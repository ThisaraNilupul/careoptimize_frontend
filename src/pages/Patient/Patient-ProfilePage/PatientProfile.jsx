import React, { useEffect, useState } from 'react';
import Card from '../../../components/BaseCard-component/Card';
import './PatientProfile.css';
import SubButton from '../../../components/BaseButton-component/SubButton';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';
import CloseButton from '../../../components/BaseButton-component/CloseButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import { LuPlus, LuPencilLine, LuListOrdered, LuFileText, LuX, LuTrash2, LuHeartPulse } from "react-icons/lu";
import axios from 'axios';
import { green, yellow, red } from '@mui/material/colors';
import ButtonMain from '../../../components/BaseButton-component/Button';
import AddIcon from '@mui/icons-material/Add';

const redMain = red.A400;
const redHover = red.A700;
const greenMain = green.A400;
const greenHover = green.A700;
const yellowMain = yellow.A400;
const yellowHover = yellow.A700;

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
        biodata: '',
        healthIssues: [],
        relatives: []
    });
    const [editPIData, setEditPIData] = useState({
        firstName: '',
        lastName: '',
        addressNo: '',
        street: '',
        city: '',
        province: '',
        phoneNumber: '',
        email: '',
        height: '',
        weight: '',
    })
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
    });
    const [addMedicalBioFormData, setAddMedicalBioFormData] = useState({
        bloodType: '',
        height: '',
        weight: ''
    })
    const [editRelativeData, setEditRelativeData] = useState({
        firstName: '',
        lastName: '',
        addressNo: '',
        street: '',
        city: '',
        province: '',
        nic: '',
        phoneNumber: '',
        email: '',
        relationship: '',
    });
    const [issue, setIssue] = useState("")
    const [selectedIssue, setSelectedIssue] = useState('');
    const [issueDescription, setIssueDescription] = useState({ issue: ''});
    const [isPIeditpopupOpen, setIsPIeditpopupOpen] = useState(false);
    const [isAddHIssueOpen, setIsAddHIssueOpen] = useState(false);
    const [isOpenAllHIpopup, setIsOpenAllHIpopup] = useState(false);
    const [isOpenRelative, setIsOpenRelative] = useState(false);
    const [isOpenAddRelative, setIsOpenAddRelative] = useState(false);
    const [isOpneUpdateRelative, setIsOpenUpdateRelative] = useState(false);
    const [isOpenUpdateHI, setIsOpenUpdateHI] = useState(false);
    const [isOpenAddMedicalBioData, setIsOpenMedicalBioData] = useState(false);
    const [selectedRelative, setSelectedRelative] = useState(null); 
    const [notification, setNotification] = useState(null);
    const userID = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:5000/api/patient/profile/${userID}`,{
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
  }, [notification]);  

  const handlePIeditButtonClick = () => {
    setEditPIData({
        firstName: patinerProfileData.firstName,
        lastName: patinerProfileData.lastName,
        addressNo: patinerProfileData.addressNo,
        street: patinerProfileData.street,
        city: patinerProfileData.city,
        province: patinerProfileData.province,
        phoneNumber: patinerProfileData.phoneNumber,
        email: patinerProfileData.email,
        height: patinerProfileData.biodata.height,
        weight: patinerProfileData.biodata.weight,
    });
    setIsPIeditpopupOpen(true);
  }

  const handlePIClose = () => {
    setIsPIeditpopupOpen(false);
  }

  const handleUpdatePI = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/patient/profile/${userID}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(editPIData),  
    })
    .then((res) => res.json())
    .then((data) => {
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          });
        setIsPIeditpopupOpen(false); 
    })
    .catch((error) => {
        setNotification({
            status: 'success',
            message: error.data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          });
    })
  }

  const handelAddHIButton = () => {
    setIsAddHIssueOpen(true);
  }
  
  const handleAddHealthIssue = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/patient/profile/${userID}/health-issues`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({issue}),
    })
    .then((res) => res.json())
    .then((data) => {
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
          setIsAddHIssueOpen(false);  
    })
    .catch(err => console.error(err));
  }

  const handleAddHIClose = () => {
    setIsAddHIssueOpen(false);
  }

  const handleOpenHI = () => {
    setIsOpenAllHIpopup(true);
  }

  const handleDeleteHealthIssue = async (issueID) => {
    fetch(`http://localhost:5000/api/patient/profile/${userID}/health-issues/${issueID}`,{
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.msg == 'Health issue deleted successfully'){
            setPatientProfileData(prevData => ({
                ...prevData,
                healthIssues: prevData.healthIssues.filter(issue => issue._id !== issueID)
            }));
        }
        console.log(data);
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
        })
    })
    .catch(error => console.error('Error deleting Issue:', error));
  }

  const handleCloseHI = () => {
    setIsOpenAllHIpopup(false);
  }

  const handleOpenUpdateHealthIssue = (issue, issueId) => {
    setSelectedIssue(issueId);
    setIssueDescription(issue);
    console.log('issueId:', selectedIssue + 'issue', issueDescription);
    setIsOpenAllHIpopup(false);
    setIsOpenUpdateHI(true);
  }

  const handleUpdateHealthIssue = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/patient/profile/${userID}/health-issues/${selectedIssue}`,{
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({issue: issueDescription}),
    })
    .then((res) => res.json())
    .then((data) => {
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
          setIsOpenUpdateHI(false);
          setIsOpenAllHIpopup(true);
    })
    .catch((error => {console.log(error)}));
  }

  const handleCloseUpdateHealthIssue = () => {
    setIsOpenUpdateHI(false);
    setIsOpenAllHIpopup(true);
  }

  const handleOpenRelative = (relativeId) => {
    fetch(`http://localhost:5000/api/patient/profile/${userID}/${relativeId}`, {
        method: "GET",
        headers: {'content-type': 'application/json'}
    })
    .then((res)=>res.json())
    .then((data)=>{
        setSelectedRelative(data);
        setIsOpenRelative(true);
    })
    .catch((error => {console.log(error)}));
  }

  const handleDeleteRelative = () => {
    fetch(`http://localhost:5000/api/patient/profile/${userID}/${selectedRelative._id}`,{
        method: "DELETE",
        headers: {'content-type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.msg == 'Relative deleted successfully'){
            setPatientProfileData(prevState => ({
                ...prevState,
                relatives: prevState.relatives.filter(rel => rel._id !== selectedRelative._id)
            }));

        }
        console.log(data);
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
        handleCloseRelative();  
    })
    .catch(error => console.error('Error deleting relative:', error));
  }

  const handleOpenUpdateRelative = (relative) => {
    setEditRelativeData({
        firstName: selectedRelative.firstName,
        lastName: selectedRelative.lastName,
        addressNo: selectedRelative.addressNo,
        street: selectedRelative.street,
        city: selectedRelative.city,
        province: selectedRelative.province,
        nic: selectedRelative.nic,
        phoneNumber: selectedRelative.phoneNumber,
        email: selectedRelative.email,
        relationship: selectedRelative.relationship,
    });
    setIsOpenRelative(false);
    setIsOpenUpdateRelative(true);
  }

  const handleUpdateRelative = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/patient/profile/${userID}/${selectedRelative._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(editRelativeData),
    })
    .then((res) => res.json())
    .then((data) => {
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
        setIsOpenUpdateRelative(false);  
    })
    .catch(err => console.error(err));
  }

  const handleCloseUpdateRelative = () => {
    setIsOpenUpdateRelative(false);
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

  const handleOpenAddMBData = () => {
    setIsOpenMedicalBioData(true);
  }

  const {bloodType, height, weight} = addMedicalBioFormData;
  const onChangeMBData = (e) => setAddMedicalBioFormData({...addMedicalBioFormData, [e.target.name]: e.target.value});

  const onSubmitAddMedicalBioData = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/patient/profile/${userID}/medical-bio`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({bloodType, height, weight}),
    })
    .then((res) => res.json())
    .then((data) => {
        setNotification({
            status: 'success',
            message: data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
          setIsOpenMedicalBioData(false);  
    })
    .catch(err => console.error(err));
  }

  const handleCloseAddMBData = () => {
    setIsOpenMedicalBioData(false);
  }

  const {firstName, lastName, addressNo, street, city, province, nic, phoneNumber, email, relationship} = addRelativeFormData;
  const onChange = (e) => setAddRelativeFormData({...addRelativeFormData, [e.target.name]: e.target.value});

  const onSubmitAddRelative = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post(`http://localhost:5000/api/patient/profile/${userID}/relative`, 
            {
                firstName, lastName, addressNo, street, city, province, nic, phoneNumber, email, relationship
            }
        );
        console.log(response);
        setNotification({
            status: 'success',
            message: response.data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
        setIsOpenAddRelative(false);
    }catch (error){
        setNotification({
            status: 'success',
            message: error.response.data.msg,
            backgroundColor: 'rgba(117, 248, 132, 1)',
        })
    }
  }

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className='patient-profile'>
        <div className='patient-profile-button-container'>
         {(!patinerProfileData.biodata.bloodType || !patinerProfileData.biodata.height || !patinerProfileData.biodata.weight) && (
            <ButtonMain text="Add Medical Data" height="35px" width="220px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handleOpenAddMBData} icon={<AddIcon />}/>
        )}
        <ButtonMain text="Add Relative" height="35px" width="220px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handleOpenAddRelative} icon={<AddIcon />}/>
        </div>
        <div className='patient-profile-container'>
            <Card width="56%" height="76vh">
                <div className='card-title'>Personal info  <SubButton icon={<LuPencilLine />} height="30px" width="60px" onClick={handlePIeditButtonClick} /></div>
                <div className='card-content'>
                    <div className='content-item'>
                        <div className='item-name'>Name</div>
                        <div className='item-value'>: {patinerProfileData.firstName} {patinerProfileData.lastName}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Address</div>
                        <div className='item-value'>: {patinerProfileData.addressNo}, {patinerProfileData.street}, {patinerProfileData.city} / {patinerProfileData.province} Province</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>NIC</div>
                        <div className='item-value'>: {patinerProfileData.nic}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Phone No</div>
                        <div className='item-value'>: {patinerProfileData.phoneNumber}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>email</div>
                        <div className='item-value'>: {patinerProfileData.email}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Birthday</div>
                        <div className='item-value'>: {patinerProfileData.birthday}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Gender</div>
                        <div className='item-value'>: {patinerProfileData.gender}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Blood Type</div>
                        <div className='item-value'>: {patinerProfileData.biodata.bloodType}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Height</div>
                        <div className='item-value'>: {patinerProfileData.biodata.height}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Weight</div>
                        <div className='item-value'>: {patinerProfileData.biodata.weight}</div>
                    </div>
                </div>    
                <div className='card-title'>Health Issues  
                    <div className='button-group'>
                        <SubButton icon={<LuPlus />} height="30px" width="60px" onClick={handelAddHIButton}/>
                        <SubButton icon={<LuListOrdered />} height="30px" width="60px" onClick={handleOpenHI}/>
                    </div>
                </div>
                <div className='card-content'>            
                    <div className='content-item'>        
                            <div className='card-content'>
                                 <div className='item-scrollable'>
                                    {patinerProfileData.healthIssues && patinerProfileData.healthIssues.map((issue, index) => (
                                        <div key={index} className='health-issue-item'>
                                            <LuHeartPulse /> {issue.issue}
                                        </div>
                                    ))}
                                 </div>
                            </div>
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
                                    <SubButton icon={<LuFileText />} height="30px" width="60px" onClick={() => handleOpenRelative(relative._id)}/>
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
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handlePIClose} />
                    </div>
                    <form onSubmit={handleUpdatePI}>
                        <div className='form-item'>
                            <label>First Name</label>
                            <input  type="text" name="firstName" value={editPIData.firstName} onChange={(e) => setEditPIData({...editPIData, firstName: e.target.value})} />
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={editPIData.lastName} onChange={(e) => setEditPIData({...editPIData, lastName: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>AddressNo</label>
                            <input type="text" name="addressNo" value={editPIData.addressNo} onChange={(e) => setEditPIData({...editPIData, addressNo: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input type="text" name="street" value={editPIData.street} onChange={(e) => setEditPIData({...editPIData, street: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text" name="city" value={editPIData.city} onChange={(e) => setEditPIData({...editPIData, city: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input type="text" name="province" value={editPIData.province} onChange={(e) => setEditPIData({...editPIData, province: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>PhoneNo</label>
                            <input type="text" name="phoneNumber" value={editPIData.phoneNumber} onChange={(e) => setEditPIData({...editPIData, phoneNumber: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input type="text" name="email" value={editPIData.email} onChange={(e) => setEditPIData({...editPIData, email: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>Height</label>
                            <input type="text" name="height" value={editPIData.height} onChange={(e) => setEditPIData({...editPIData, height: e.target.value})}/>
                        </div>
                        <div className='form-item'>
                            <label>Weight</label>
                            <input type="text" name="weight" value={editPIData.weight} onChange={(e) => setEditPIData({...editPIData, weight: e.target.value})}/>
                        </div>
                        <div className='PIedit-savebutton'>
                            <ButtonMain text="Edit & Save" type='submit' height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {isAddHIssueOpen && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add Health Issues
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleAddHIClose} />
                    </div>
                    <form onSubmit={handleAddHealthIssue}>
                        <div className='healthissueform-item'>
                            <label>Health issue discription</label>
                            <textarea  type="text" name="issue"  value={issue}  onChange={(e) => setIssue(e.target.value)} required/>
                        </div>
                        <div className='healthissueadd-button'>
                            <ButtonMain text="Save" type='submit' height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {isOpenUpdateHI && issueDescription && (
              <div className="popup">
              <Card width="50%" height="60vh">
                  <div className="popup-title">Update Health Issues
                      <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseUpdateHealthIssue} />
                  </div>
                  <form onSubmit={handleUpdateHealthIssue}>
                      <div className='healthissueform-item'>
                          <label>Health issue discription</label>
                          <textarea  type="text" name="issue"  value={issueDescription}  onChange={(e) => setIssueDescription(e.target.value)} required/>
                      </div>
                      <div className='healthissueadd-button'>
                          <ButtonMain text="Save" type='submit' height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                      </div>
                  </form>
              </Card>
          </div>
        )} 
        {isOpenAllHIpopup && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Health Issues
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseHI} />
                    </div>
                    <div className='popup-content'>
                        {patinerProfileData.healthIssues && patinerProfileData.healthIssues.map((issue, index) => (
                            <div key={index} className='health-issue'>
                                <div className='item-name'>
                                 <LuHeartPulse /> {issue.issue}
                                </div>
                                <div className='button-group'>
                                    <SubButton icon={<LuPencilLine />} height="30px" width="60px" onClick={() => handleOpenUpdateHealthIssue(issue.issue, issue._id)}/>
                                    <SubButton icon={<LuTrash2 />} height="30px" width="60px" onClick={() => handleDeleteHealthIssue(issue._id)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        )}
        {isOpenRelative && selectedRelative && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Relative Info
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseRelative} />
                    </div>
                    <div className='card-content'>
                        <div className='content-item'>
                            <div className='item-name'>Name</div>
                            <div className='item-value'>: {selectedRelative.firstName} {selectedRelative.lastName}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>Address</div>
                            <div className='item-value'>: {selectedRelative.addressNo}, {selectedRelative.street}, {selectedRelative.city} / {selectedRelative.province} Province</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>NIC</div>
                            <div className='item-value'>: {selectedRelative.nic}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>Phone No</div>
                            <div className='item-value'>: {selectedRelative.phoneNumber}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>email</div>
                            <div className='item-value'>: {selectedRelative.email}</div>
                        </div>
                        <div className='content-item'>
                            <div className='item-name'>Relationship</div>
                            <div className='item-value'>: {selectedRelative.relationship}</div>
                        </div>
                        <div className='relativebutton-group'>
                            <SubButton icon={<LuTrash2 />} height="30px" width="60px" onClick={handleDeleteRelative}/>
                            <SubButton icon={<LuPencilLine />} height="30px" width="60px" onClick={handleOpenUpdateRelative}/>
                        </div>
                    </div>    
                </Card>
            </div>
        )}
        {isOpenAddRelative && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add Relative
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseAddRelative} />
                    </div>
                    <form onSubmit={onSubmitAddRelative}>
                        <div className='form-item'>
                            <label>First Name</label>
                            <input  type="text" name="firstName" value={firstName} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text"  name="lastName" value={lastName} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>AddressNo</label>
                            <input type="text"  name="addressNo" value={addressNo} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input type="text"  name="street" value={street} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text" name="city" value={city} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input type="text" name="province" value={province} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>NIC</label>
                            <input type="text" name="nic" value={nic} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>PhoneNo</label>
                            <input type="text" name="phoneNumber" value={phoneNumber} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input type="text" name="email" value={email} onChange={onChange} required/>
                        </div>
                        <div className='form-item'>
                            <label>Relationship</label>
                            <input type="text" name="relationship" value={relationship} onChange={onChange} required/>
                        </div>
                        <div className='relative-savebutton'>
                         <ButtonMain text="Save" type='submit' height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {isOpneUpdateRelative && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Edit Relative Info 
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseUpdateRelative} />
                    </div>
                    <form onSubmit={handleUpdateRelative}>
                        <div className='form-item'>
                            <label>First Name</label>
                            <input  type="text" name="firstName" value={editRelativeData.firstName} onChange={(e) => setEditRelativeData({...editRelativeData, firstName: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text"  name="lastName" value={editRelativeData.lastName} onChange={(e) => setEditRelativeData({...editRelativeData, lastName: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>AddressNo</label>
                            <input type="text"  name="addressNo" value={editRelativeData.addressNo} onChange={(e) => setEditRelativeData({...editRelativeData, addressNo: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input type="text"  name="street" value={editRelativeData.street} onChange={(e) => setEditRelativeData({...editRelativeData, street: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text" name="city" value={editRelativeData.city} onChange={(e) => setEditRelativeData({...editRelativeData, city: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input type="text" name="province" value={editRelativeData.province} onChange={(e) => setEditRelativeData({...editRelativeData, province: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>NIC</label>
                            <input type="text" name="nic" value={editRelativeData.nic} onChange={(e) => setEditRelativeData({...editRelativeData, nic: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>PhoneNo</label>
                            <input type="text" name="phoneNumber" value={editRelativeData.phoneNumber} onChange={(e) => setEditRelativeData({...editRelativeData, phoneNumber: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input type="text" name="email" value={editRelativeData.email} onChange={(e) => setEditRelativeData({...editRelativeData, email: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Relationship</label>
                            <input type="text" name="relationship" value={editRelativeData.relationship} onChange={(e) => setEditRelativeData({...editRelativeData, relationship: e.target.value})} required/>
                        </div>
                        <div className='relative-savebutton'>
                        <ButtonMain text="Edit & Save" type='submit' height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                    </div>
                    </form>
                </Card>
            </div>
        )}
        {isOpenAddMedicalBioData && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add Medical-Bio Info
                        <CloseButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseAddMBData} />
                    </div>
                    <form onSubmit={onSubmitAddMedicalBioData}>
                        <div className='form-item'>
                            <label>Blood type</label>
                            <input list="bloodType" name="bloodType"  type="text" value={bloodType} onChange={onChangeMBData}  required/>
                            <datalist id='bloodType'>
                                <option value="O+" />
                                <option value="O-" />
                                <option value="A+" />
                                <option value="A-" />
                                <option value="B+" />
                                <option value="B-" />
                                <option value="AB+" />
                                <option value="AB-" />
                            </datalist>
                        </div>
                        <div className='form-item'>
                            <label>Height</label>
                            <input type="text"  name="height" value={height} onChange={onChangeMBData} required/>
                        </div>
                        <div className='form-item'>
                            <label>Weight</label>
                            <input type="text"  name="weight" value={weight} onChange={onChangeMBData} required/>
                        </div>
                        <div className='relative-savebutton'>
                            <ButtonMain text="Save" type='submit' height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover}/>
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {notification && (
            <Notification 
                status={notification.status}
                message={notification.message}
                height={notification.height}
                width={notification.width}
                backgroundColor={notification.backgroundColor}
                onClose={closeNotification}
            />
        )}
   </div> 
  )
}

export default PatientProfile;
