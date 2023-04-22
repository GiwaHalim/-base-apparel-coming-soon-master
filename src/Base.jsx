import MyImage from '/images/logo.svg';
import IconArrow from '/images/icon-arrow.svg';
import ErrorIcon from '/images/icon-error.svg';
import { useState } from 'react';
import Joi from 'joi';
import MobileHero from '/images/hero-mobile.jpg'




const Base = () => {
    const[formInput, setFormInput] = useState({
        email: ''
    })
    const[errors, setErrors] = useState({})

    const emailChange = (event) =>{
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormInput = {...formInput}

        newFormInput[fieldName] = fieldValue
        setFormInput(newFormInput)
    }

    const schema = Joi.object({
        email: Joi.string().email({tlds: { allow: ['com', 'net'] } }).required()
    })

    const validate = () =>{
        const err = schema.validate(formInput, {abortEarly: false})

        if (!err.error) return null

        const errors = {}
        for(let item of err.error.details){
            errors[item.path[0]] = item.message

            return errors
        }
    }
    const submit = (e) => {
        e.preventDefault()
        // console.log(validate());
        setErrors(validate() || {});
        if(errors) return

        //call the server
        
    }
    
    return ( 
            <div className="left">
                <div className="image">
                    <img src={MyImage} alt="logo" className='base'/>
                </div>
                <div className='mobile-img'>
                    <img src={MobileHero} alt="" className='mobile-hero'/>
                </div>

                <form onSubmit={submit} className="form">
                    <h1>WE&apos;RE <span>COMING SOON</span></h1>
                    <p>Hello fellow shoppers! We&apos;re currently building our new fashion store. Add your email to stay up-to-date with annoucement and our launch deals</p>
                    <div className="input">
                        <input className='mail' name='email' placeholder='Email Address' value={formInput.email} onChange={emailChange}/>
                        <button type="submit" className='arrow'><img src={IconArrow} alt="arrow" /></button>
                        {errors.email && <img className='error-icon' src={ErrorIcon} alt="icon-logo" />}
                    </div>
                    {errors.email && <div className='error'>{errors.email}</div>}
                </form>
            </div>
     );
}
 
export default Base;