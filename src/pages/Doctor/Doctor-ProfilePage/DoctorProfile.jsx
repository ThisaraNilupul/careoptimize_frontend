import React, { useEffect, useState } from 'react';
import Card from '../../../components/BaseCard-component/Card';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import Notification from '../../../components/AlertNotification-component/Notification';
import { LuPlus, LuPencilLine, LuListOrdered, LuFileText, LuX, LuTrash2, LuHeartPulse } from "react-icons/lu";
import axios from 'axios';
import './DoctorProfile.css';
import SubTextButton from '../../../components/BaseButton-component/SubTextButton';


function DoctorProfile() {
    const doctorID = localStorage.getItem('userId');
    const [doctorProfileData, setDoctorProfileData] = useState({
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
        doctorInfo: '',
        workAt: [],
    });
    const [addWorkAtFormData, setAddWorkAtFormData] = useState({ 
        placeName: '',
        h_addressNo: '',
        h_street: '',
        h_city: '',
        h_province: '',
        h_phoneNumber: '',
        h_email: '' 
    });
    const [editWorkAtData, setEditWorkAtData] = useState({
        placeName: '',
        h_addressNo: '',
        h_street: '',
        h_city: '',
        h_province: '',
        h_phoneNumber: '',
        h_email: ''
    });
    const [addQulificationData, setAddQulificationData] = useState({
        eduLevel: '',
        specialistArea: ''
    })
    const [isOpenAddNewWorkAt, setIsOpenAddNewWorkAt] = useState(false);
    const [isOpenWorkAt, setIsOpenWorkAt] = useState(false);
    const [isOpenUpdateWorkAt, setIsOpenUpdateWorkAt] = useState(false);
    const [isOpenAddQulification, setIsOpenAddQulification] = useState(false);
    const [isOpenEditDoctorProfileData, setIsOpenEditDoctorProfileData] = useState(false);
    const [editDoctorProfileData, setEditDoctorProfileData] = useState({
        firstName: '',
        lastName: '',
        addressNo: '',
        street: '',
        city: '',
        province: '',
        phoneNumber: '',
        email: '',
        eduLevel: '',
        specialistArea: ''
    });
    const [selectedWorkAt, setSelectedWorkAt] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/doctor/profile/${doctorID}`,{
            method: "GET",
            headers: {'content-type': 'application/json'}
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('patientdata', data);
            setDoctorProfileData((prevState) => ({
                ...prevState,
                ...data
            }));
            console.log('doctor', doctorProfileData);
        })
        .catch((error => { console.log(error) }));
    }, [notification])

    const handleOpenAddWorkAtPopup = () => {
        setIsOpenAddNewWorkAt(true);
    }

    const { placeName, h_addressNo, h_street, h_city, h_province, h_phoneNumber, h_email } = addWorkAtFormData;
    const onChange = (e) => setAddWorkAtFormData({...addWorkAtFormData, [e.target.name]: e.target.value});

    const onSubmitAddWorkAtInfo = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`http://localhost:5000/api/doctor/profile/${doctorID}/work-at`, 
                {
                    placeName, h_addressNo, h_street, h_city, h_province, h_phoneNumber, h_email
                }
            );
            console.log(response);
            setNotification({
                status: 'success',
                message: response.data.msg,
              })
            setIsOpenAddNewWorkAt(false);
        }catch (error) {
            setNotification({
                status: 'falied',
                message: error.response.data
            })
        }
    }

    const handleCloseAddWorkAtPopup = () => {
        setIsOpenAddNewWorkAt(false);
    }

    const handleOpenWorkAt = (workAtID) => {
        fetch(`http://localhost:5000/api/doctor/profile/${doctorID}/work-at/${workAtID}`, {
            method: "GET",
            headers: {'content-type': 'application/json'}
        })
        .then((res)=>res.json())
        .then((data)=>{
            setSelectedWorkAt(data);
            // setNotification({
            //     status: 'success',
            //     message: data.data,
            //   })
            setIsOpenWorkAt(true);
        })
        .catch((error) => {
            console.log(error);
            setNotification({
                status: 'failed',
                message: error.data.msg,
              })
        });
    }

    const handleDeleteWorkAt = () => {
        fetch(`http://localhost:5000/api/doctor/profile/${doctorID}/work-at/${selectedWorkAt._id}`,{
            method: "DELETE",
            headers: {'content-type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.msg == 'Work-at info deleted successfully.'){
                setDoctorProfileData(prevState => ({
                    ...prevState,
                    workAt: prevState.workAt.filter(workat => workat._id !== selectedWorkAt._id)
                }));
    
            }
            console.log(data);
            setNotification({
                status: 'success',
                message: data.msg,
            })
            handleCloseWorkAt();  
        })
        .catch((error) => {
            console.error('Error deleting work-at:', error)
            setNotification({
                status: 'failed',
                message: error.data.msg,
            });
        });
    }

    const handleOpenUpdateWorkAt = () => {
        setEditWorkAtData({
            placeName: selectedWorkAt.placeName,
            h_addressNo: selectedWorkAt.h_addressNo,
            h_street: selectedWorkAt.h_street,
            h_city: selectedWorkAt.h_city,
            h_province: selectedWorkAt.h_province,
            h_phoneNumber: selectedWorkAt.h_phoneNumber,
            h_email: selectedWorkAt.h_email
        });
        setIsOpenWorkAt(false);
        setIsOpenUpdateWorkAt(true);
    }

    const handleUpdateWorkAt = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/doctor/profile/${doctorID}/work-at/${selectedWorkAt._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(editWorkAtData),
        })
        .then((res) => res.json())
        .then((data) => {
            setNotification({
                status: 'success',
                message: data.msg,
            })
            setIsOpenUpdateWorkAt(false);  
        })
        .catch((err) => {
            console.error('Error updating work-at:',err);
            setNotification({
                status: 'failed',
                message: err.data.msg,
            });
        });
    }

    const handleCloseUpdateWorkAt = () => {
        setIsOpenUpdateWorkAt(false);
    }

    const handleCloseWorkAt = () => {
        setIsOpenWorkAt(false);
    }

    const handleOpenAddQulification = () => {
        setIsOpenAddQulification(true);
    }

    const { eduLevel, specialistArea } = addQulificationData;
    const onChangeAddQulification = (e) => setAddQulificationData({...addQulificationData, [e.target.name]: e.target.value});

    const onSubmitAddQulification = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.put(`http://localhost:5000/api/doctor/profile/${doctorID}/doctor-info`, 
                {
                    eduLevel , specialistArea
                }
            );
            console.log(response);
            setNotification({
                status: 'success',
                message: response.data.msg,
              })
            setIsOpenAddQulification(false);
        }catch (error) {
            setNotification({
                status: 'falied',
                message: error.response.data
            })
        }
    }

    const handleCloseAddQulification = () => {
        setIsOpenAddQulification(false);
    }

    const handleOpenEditDoctorProfile = () => {
        setEditDoctorProfileData({
            firstName: doctorProfileData.firstName,
            lastName: doctorProfileData.lastName,
            addressNo: doctorProfileData.addressNo,
            street: doctorProfileData.street,
            city: doctorProfileData.city,
            province: doctorProfileData.province,
            phoneNumber: doctorProfileData.phoneNumber,
            email: doctorProfileData.email,
            eduLevel: doctorProfileData.doctorInfo.eduLevel,
            specialistArea: doctorProfileData.doctorInfo.specialistArea
        })
        setIsOpenEditDoctorProfileData(true);
    }

    const handleUpdateDoctorProfile = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/doctor/profile/${doctorID}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(editDoctorProfileData),
        })
        .then((res) => res.json())
        .then((data) => {
            setNotification({
                status: 'success',
                message: data.msg,
            })
            setIsOpenEditDoctorProfileData(false);  
        })
        .catch((err) => {
            console.error('Error updating Profile:',err);
            setNotification({
                status: 'failed',
                message: err.data.msg,
            });
        });
    }


    const handleCloseEditDoctorProfile = () => {
        setIsOpenEditDoctorProfileData(false);
    }
    
    const closeNotification = () => {
        setNotification(null);
    };

  return (
    <div className='doctor-profile'>
        <div className='doctor-profile-button-container'>
            <Button text="Add New Work At" height="40px" width="300px" onClick={handleOpenAddWorkAtPopup}/>
            {(!doctorProfileData.doctorInfo) && (
                <Button text="Add Qulifications" height="40px" width="300px" onClick={handleOpenAddQulification} />
            )}
        </div>
        <div className='doctor-profile-container'>
            <Card width="56%" height="56vh">
                <div className='card-title'>Doctor info  <SubButton icon={<LuPencilLine />} height="30px" width="60px" onClick={handleOpenEditDoctorProfile}/></div>
                <div className='card-content'>
                    <div className='content-item'>
                        <div className='item-name'>Name</div>
                        <div className='item-value'>: Dr. {doctorProfileData.firstName} {doctorProfileData.lastName}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Speciality</div>
                        <div className='item-value'>: {doctorProfileData.doctorInfo.specialistArea}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Qulification</div>
                        <div className='item-value'>: {doctorProfileData.doctorInfo.eduLevel}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Address</div>
                        <div className='item-value'>: {doctorProfileData.addressNo} / {doctorProfileData.street} / {doctorProfileData.city} / {doctorProfileData.province} Province</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>NIC</div>
                        <div className='item-value'>: {doctorProfileData.nic}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Phone No</div>
                        <div className='item-value'>: {doctorProfileData.phoneNumber}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>email</div>
                        <div className='item-value'>: {doctorProfileData.email}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Birthday</div>
                        <div className='item-value'>: {doctorProfileData.birthday}</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Gender</div>
                        <div className='item-value'>: {doctorProfileData.gender}</div>
                    </div>
                </div>
            </Card>
            <Card width="42%" height="76vh">
                <div className='workatcard-title'>Work at - (Hospital/Clinic info)</div>
                <div className='workatcard-content'>
                    <div className='workatcontent-item'>
                        {doctorProfileData.workAt && doctorProfileData.workAt.map((workat, index) => (
                            <div key={index} className='workat'>
                                {workat.placeName}
                                <div className='button-group'>
                                    <SubButton icon={<LuFileText />} height="30px" width="60px" onClick={() => handleOpenWorkAt(workat._id)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </Card>
        </div>
        {isOpenAddNewWorkAt && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add New Work-at Info
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseAddWorkAtPopup} />
                    </div>
                    <form onSubmit={onSubmitAddWorkAtInfo}>
                        <div className='form-item'>
                            <label>Work Place Name</label>
                            <input  type="text" name="placeName" value={placeName} onChange={onChange} />
                        </div>
                        <div className='form-item'>
                            <label>Address No.</label>
                            <input  type="text" name="h_addressNo" value={h_addressNo} onChange={onChange} />
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input  type="text" name="h_street" value={h_street} onChange={onChange} />
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input  type="text" name="h_city" value={h_city} onChange={onChange} />
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input  type="text" name="h_province" value={h_province} onChange={onChange} />
                        </div>
                        <div className='form-item'>
                            <label>Phone Number</label>
                            <input  type="text" name="h_phoneNumber" value={h_phoneNumber} onChange={onChange} />
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input  type="text" name="h_email" value={h_email} onChange={onChange} />
                        </div>
                        <div className='PIedit-savebutton'>
                            <SubTextButton text="Add" type='submit' height="28px" width="200px" />
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {isOpenWorkAt && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Work-at Info
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseWorkAt} />
                    </div>
                    <div className='card-content'>
                        <div className='content-item'>
                            <div className='work-item-name'>Work Place Name</div>
                            <div className='item-value'>: {selectedWorkAt.placeName}</div>
                        </div>
                        <div className='content-item'>
                            <div className='work-item-name'>Address</div>
                            <div className='item-value'>: {selectedWorkAt.h_addressNo} / {selectedWorkAt.h_street} / {selectedWorkAt.h_city} / {selectedWorkAt.h_province} Province</div>
                        </div>
                        <div className='content-item'>
                            <div className='work-item-name'>Phone No</div>
                            <div className='item-value'>: {selectedWorkAt.h_phoneNumber}</div>
                        </div>
                        <div className='content-item'>
                            <div className='work-item-name'>email</div>
                            <div className='item-value'>: {selectedWorkAt.h_email}</div>
                        </div>
                        <div className='relativebutton-group'>
                            <SubButton icon={<LuTrash2 />} height="30px" width="60px" onClick={handleDeleteWorkAt}/>
                            <SubButton icon={<LuPencilLine />} height="30px" width="60px"  onClick={handleOpenUpdateWorkAt}/>
                        </div>
                    </div>    
                </Card>
            </div>
        )}
        {isOpenUpdateWorkAt && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Edit Work-at Info
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseUpdateWorkAt} />
                    </div>
                    <form onSubmit={handleUpdateWorkAt}>
                        <div className='form-item'>
                            <label>Work Place Name</label>
                            <input  type="text" name="placeName" value={editWorkAtData.placeName} onChange={(e) => setEditWorkAtData({...editWorkAtData, placeName: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Address No.</label>
                            <input  type="text" name="h_addressNo" value={editWorkAtData.h_addressNo} onChange={(e) => setEditWorkAtData({...editWorkAtData, h_addressNo: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input  type="text" name="h_street" value={editWorkAtData.h_street} onChange={(e) => setEditWorkAtData({...editWorkAtData, h_street: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input  type="text" name="h_city" value={editWorkAtData.h_city} onChange={(e) => setEditWorkAtData({...editWorkAtData, h_city: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input  type="text" name="h_province" value={editWorkAtData.h_province} onChange={(e) => setEditWorkAtData({...editWorkAtData, h_province: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Phone Number</label>
                            <input  type="text" name="h_phoneNumber" value={editWorkAtData.h_phoneNumber} onChange={(e) => setEditWorkAtData({...editWorkAtData, h_phoneNumber: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input  type="text" name="h_email" value={editWorkAtData.h_email} onChange={(e) => setEditWorkAtData({...editWorkAtData, h_email: e.target.value})} required/>
                        </div>
                        <div className='PIedit-savebutton'>
                            <SubTextButton text="Update & Save" type='submit' height="28px" width="200px" />
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {isOpenAddQulification && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Add Qulifications
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseAddQulification} />
                    </div>
                    <form onSubmit={onSubmitAddQulification}>
                        <div className='form-item'>
                            <label>Specialist Area</label>
                            <input  type="text" name="specialistArea" value={specialistArea} onChange={onChangeAddQulification} required/>
                        </div>
                        <div className='form-item'>
                            <label>Education Level (Qulifications)</label>
                            <input  type="text" name="eduLevel" value={eduLevel} onChange={onChangeAddQulification} required/>
                        </div>
                        <div className='PIedit-savebutton'>
                            <SubButton text="Add" type='submit' height="28px" width="200px" />
                        </div>
                    </form>
                </Card>
            </div>
        )}
        {isOpenEditDoctorProfileData && (
            <div className="popup">
                <Card width="50%" height="60vh">
                    <div className="popup-title">Edit Profile
                        <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseEditDoctorProfile} />
                    </div>
                    <form onSubmit={handleUpdateDoctorProfile}>
                        <div className='form-item'>
                            <label>First Name</label>
                            <input  type="text" name="firstName" value={editDoctorProfileData.firstName} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, firstName: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input  type="text" name="lastName" value={editDoctorProfileData.lastName} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, lastName: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Address No.</label>
                            <input  type="text" name="addressNo" value={editDoctorProfileData.addressNo} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, addressNo: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input  type="text" name="street" value={editDoctorProfileData.street} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, street: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input  type="text" name="city" value={editDoctorProfileData.city} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, city: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input  type="text" name="province" value={editDoctorProfileData.province} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, province: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Phone Number</label>
                            <input  type="text" name="phoneNumber" value={editDoctorProfileData.phoneNumber} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, phoneNumber: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input  type="text" name="email" value={editDoctorProfileData.email} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, email: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Qulifications</label>
                            <input  type="text" name="eduLevel" value={editDoctorProfileData.eduLevel} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, eduLevel: e.target.value})} required/>
                        </div>
                        <div className='form-item'>
                            <label>Specialist Area</label>
                            <input  type="text" name="specialistArea" value={editDoctorProfileData.specialistArea} onChange={(e) => setEditDoctorProfileData({...editDoctorProfileData, specialistArea: e.target.value})} required/>
                        </div>
                        <div className='PIedit-savebutton'>
                            <SubTextButton text="Update & Save" type='submit' height="28px" width="200px" />
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
                onClose={closeNotification}
            />
        )}
    </div>
  )
}

export default DoctorProfile
