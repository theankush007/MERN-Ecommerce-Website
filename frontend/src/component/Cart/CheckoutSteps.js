import { StepLabel, Typography,Stepper,Step } from '@material-ui/core';
import React, { Fragment } from 'react'
import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import "./CheckoutSteps.css"


const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            lable:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon />
        },
        {
            lable:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon />
        },
        {
            lable:<Typography>Shipping Details</Typography>,
            icon:<AccountBalanceIcon />
        }

    ];

    const stepStyle = {
        boxSizing:"border-box",
    };



  return (
    <Fragment>
        
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
            
            {steps.map((item,index)=>(
                <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                    <StepLabel style={{
                        color:activeStep >=index ? "tomato" : "rgba(0,0,0,0.649)",
                    }} 
                    
                    icon={item.icon}>{item.lable}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps