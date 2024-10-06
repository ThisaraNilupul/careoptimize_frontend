import React, { useState } from 'react';
import Card from '../../../components/BaseCard-component/Card';
import Button from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import { LuPlus, LuPencilLine, LuListOrdered, LuFileText, LuX, LuTrash2, LuHeartPulse } from "react-icons/lu";
import './DoctorProfile.css';


function DoctorProfile() {
    const [isOpenAddNewWorkAt, setIsOpenAddNewWorkAt] = useState(false);

    const handleOpenAddWorkAtPopup = () => {
        setIsOpenAddNewWorkAt(true);
    }

    const handleCloseAddWorkAtPopup = () => {
        setIsOpenAddNewWorkAt(false);
    }

  return (
    <div className='doctor-profile'>
        <div className='doctor-profile-button-container'>
            <Button text="Add New Work At" height="40px" width="300px" onClick={handleOpenAddWorkAtPopup}/>
        </div>
        <div className='doctor-profile-container'>
            <Card width="56%" height="46vh">
                <div className='card-title'>Doctor info  <SubButton icon={<LuPencilLine />} height="30px" width="60px"  /></div>
                <div className='card-content'>
                <div className='content-item'>
                        <div className='item-name'>Speciality</div>
                        <div className='item-value'></div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Name</div>
                        <div className='item-value'></div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Address</div>
                        <div className='item-value'> / Province</div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>NIC</div>
                        <div className='item-value'></div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Phone No</div>
                        <div className='item-value'></div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>email</div>
                        <div className='item-value'></div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Birthday</div>
                        <div className='item-value'></div>
                    </div>
                    <div className='content-item'>
                        <div className='item-name'>Gender</div>
                        <div className='item-value'></div>
                    </div>
                </div>
            </Card>
            <Card width="42%" height="76vh">
                <div className='workatcard-title'>Work at - (Hospital/Clinic info)</div>
                <div className='workatcard-content'>
                    <div className='workatcontent-item'>
                        
                            <div  className='workat'>
                                Work palce name
                                <div className='button-group'>
                                    <SubButton icon={<LuFileText />} height="30px" width="60px" />
                                </div>
                            </div>
                   
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
                    <form >
                        <div className='form-item'>
                            <label>Work Place Name</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='form-item'>
                            <label>Address No.</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='form-item'>
                            <label>Street</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='form-item'>
                            <label>Province</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='form-item'>
                            <label>Phone Number</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='form-item'>
                            <label>Email</label>
                            <input  type="text" name="firstName" />
                        </div>
                        <div className='PIedit-savebutton'>
                            <Button text="Add" type='submit' height="35px" width="200px" />
                        </div>
                    </form>
                </Card>
            </div>
        )}
    </div>
  )
}

export default DoctorProfile
