import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";
import Slide from '@mui/material/Slide';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem, FormGroup, Checkbox } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AIForm = () => {
    const [isOpenModal, setisOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        goal: "",
        diet: "",
        healthConditions: [],
        allergies: [],
        activityLevel: "",
        additionalInfo: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: prevData[name].includes(value)
                ? prevData[name].filter((item) => item !== value)
                : [...prevData[name], value],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    };

    return (
        <>
            <Button className='formAI' onClick={() => setisOpenModal(true)}>
                <div className='info d-flex flex-column'>
                    <span className='label'>Tư Vấn</span>
                </div>
            </Button>

            <Dialog open={isOpenModal} onClose={() => setisOpenModal(false)} className='aiform' TransitionComponent={Transition}>
                <div className="dialogContent">
                    <h4 className='mb-0 flex-items-center'>Sản phẩm dành riêng cho bạn</h4>
                    <Button className='close_' onClick={() => setisOpenModal(false)}><MdClose /></Button>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Họ và tên"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                            autoFocus
                        />

                        <TextField
                            label="Tuổi"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                            type="number"
                        />

                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Giới tính</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className='ml-2'
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="other" control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            label="Cân nặng (kg)"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                            type="number"
                        />

                        <TextField
                            label="Chiều cao (cm)"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                            type="number"
                        />

                        <TextField
                            select
                            label="Mục tiêu dinh dưỡng"
                            name="goal"
                            value={formData.goal}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        >
                            <MenuItem value="weight_loss">Giảm cân</MenuItem>
                            <MenuItem value="weight_gain">Tăng cân</MenuItem>
                            <MenuItem value="maintain_weight">Duy trì cân nặng</MenuItem>
                            <MenuItem value="muscle_gain">Tăng cơ</MenuItem>
                            <MenuItem value="vitamin_support">Bổ sung vitamin</MenuItem>
                            <MenuItem value="digestive_support">Hỗ trợ tiêu hóa</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Chế độ ăn uống"
                            name="diet"
                            value={formData.diet}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        >
                            <MenuItem value="meat">Ăn mặn</MenuItem>
                            <MenuItem value="vegan">Ăn chay</MenuItem>
                            <MenuItem value="keto">Keto</MenuItem>
                            <MenuItem value="gluten_free">Không gluten</MenuItem>
                            <MenuItem value="no_sugar">Không đường</MenuItem>
                        </TextField>

                        <FormGroup row className='ml-3 mt-2 mb-2'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="healthConditions"
                                        value="diabetes"
                                        checked={formData.healthConditions.includes("diabetes")}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Tiểu đường"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="healthConditions"
                                        value="high_blood_pressure"
                                        checked={formData.healthConditions.includes("high_blood_pressure")}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Huyết áp cao"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="healthConditions"
                                        value="high_cholesterol"
                                        checked={formData.healthConditions.includes("high_cholesterol")}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Cholesterol cao"
                            />
                        </FormGroup>

                        <FormGroup row className='ml-3 mt-2'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="allergies"
                                        value="lactose"
                                        checked={formData.allergies.includes("lactose")}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Lactose"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="allergies"
                                        value="gluten"
                                        checked={formData.allergies.includes("gluten")}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Gluten"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="allergies"
                                        value="nuts"
                                        checked={formData.allergies.includes("nuts")}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Hạt (nuts)"
                            />
                        </FormGroup>

                        <TextField
                            select
                            label="Mức độ hoạt động"
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        >
                            <MenuItem value="low">Ít vận động</MenuItem>
                            <MenuItem value="moderate">Vừa phải</MenuItem>
                            <MenuItem value="active">Rất tích cực</MenuItem>
                            <MenuItem value="very_active">Vận động viên</MenuItem>
                        </TextField>

                        <TextField
                            label="Thông tin bổ sung"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={3}
                            margin="normal"
                            placeholder="Nhập thêm thông tin bạn muốn chúng tôi lưu ý (nếu có)"
                        />


                        <Button variant="contained" type="submit" className='btn-blue bg-red btn-lg btn-big w-100 mt-2'>
                            Gửi
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default AIForm;
