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


            <Dialog open={isOpenModal} onClose={() => setisOpenModal(false)} className='aiform' TransitionComponent={Transition}>
                <h4 className='mb-0 flex-items-center'>Sản phẩm dành riêng cho bạn</h4>
                <Button className='close_' onClick={() => setisOpenModal(false)}><MdClose /></Button>

            </Dialog>


        </>
    )
}

export default AIForm;