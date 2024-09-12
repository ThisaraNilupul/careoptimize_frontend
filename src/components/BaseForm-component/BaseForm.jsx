import React from 'react';
import './BaseForm.css';

const BaseForm = ({ fields, onSubmit}) => {
    return (
        <form onSubmit={onSubmit} className='baseForm'>
            <div className="scrollable-container">
                {fields.map((field, index) => (
                    <div key={index}>
                        {/* <label>{field.label}</label> */}
                        <input type={field.type} name={field.name} value={''} placeholder={field.placeholder} required/>
                    </div>
                ))}
            </div>    
            <button type="submit">Register</button>
        </form>
    );
};

export default BaseForm;
