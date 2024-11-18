import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import Dialog from '@mui/material/Dialog';
import { IoIosSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AIForm = () => {

    const [isOpenModal, setisOpenModal] = useState(false);

    const context = useContext(MyContext);




    return (
        <>
            <Button className='formAI' onClick={() => {
                setisOpenModal(true);
            }}>
                <div className='info d-flex flex-column'>
                    <span className='label'>Tư Vấn</span>
                </div>
                {/* <span className='ml-auto'><FaAngleDown /></span> */}
            </Button>


            <Dialog open={isOpenModal} onClose={() => setisOpenModal(false)} className='locationModal' TransitionComponent={Transition}>
                <h4 className='mb-0'>Choose your Delivery Location</h4>
                <p>Enter your address and we will specify the offer for your area.</p>
                <Button className='close_' onClick={() => setisOpenModal(false)}><MdClose /></Button>

            </Dialog>


        </>
    )
}

export default AIForm;