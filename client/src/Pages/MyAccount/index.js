import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IoMdCloudUpload } from "react-icons/io";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  deleteData,
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from "../../utils/api";

import { MyContext } from "../../App";

import NoUserImg from "../../assets/images/no-user.jpg";
import CircularProgress from "@mui/material/CircularProgress";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useNavigate();

  const context = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState([]);

  const formdata = new FormData();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    images: [],
    isAdmin: false,
    password: "",
  });

  const [fields, setFields] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }

    deleteData("/api/imageUpload/deleteAllImages");
    const user = JSON.parse(localStorage.getItem("user"));

    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setUserData(res);
      setPreviews(res.images);

      setFormFields({
        name: res.name,
        email: res.email,
        phone: res.phone,
      });
    });

    
    context.setEnableFilterTab(false);
  }, []);

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const changeInput2 = (e) => {
    setFields(() => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);

      const files = e.target.files;

      setUploading(true);

      //const fd = new FormData();
      for (var i = 0; i < files.length; i++) {
        // Validate file type
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`images`, file);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Vui lòng chọn tệp hình ảnh JPG, PNG hoặc WEBP.",
          });

          return false;
        }
      }

      formFields.images = selectedImages;
      selectedImages.push(selectedImages);
    } catch (error) {
      console.log(error);
    }

    uploadImage(apiEndPoint, formdata).then((res) => {
      fetchDataFromApi("/api/imageUpload").then((response) => {
        if (
          response !== undefined &&
          response !== null &&
          response !== "" &&
          response.length !== 0
        ) {
          response.length !== 0 &&
            response.map((item) => {
              item?.images.length !== 0 &&
                item?.images?.map((img) => {
                  img_arr.push(img);
                  //console.log(img)
                });
            });

          uniqueArray = img_arr.filter(
            (item, index) => img_arr.indexOf(item) === index
          );

          setPreviews([]);

          const appendedArray = [...previews, ...uniqueArray];

          setPreviews(uniqueArray);

          const user = JSON.parse(localStorage.getItem("user"));

          fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
            const data = {
              name: res?.name,
              email: res?.email,
              phone: res?.phone,
              images: uniqueArray,
              isAdmin: res?.isAdmin
            };

            editData(`/api/user/${user?.userId}`, data).then((res) => {
              setTimeout(() => {
                setUploading(false);
                img_arr = [];
                context.setAlertBox({
                  open: true,
                  error: false,
                  msg: "Đã tải hình ảnh!",
                });
                setUploading(false);
              }, 200);
            });
          });
        }
      });
    });
  };

  const edituser = (e) => {
    e.preventDefault();

    const appendedArray = [...previews, ...uniqueArray];

    img_arr = [];
    formdata.append("name", formFields.name);
    formdata.append("email", formFields.email);
    formdata.append("phone", formFields.phone);

    formdata.append("images", appendedArray);

    formFields.images = appendedArray;

    if (
      formFields.name !== "" &&
      formFields.email !== "" &&
      formFields.phone !== "" &&
      previews.length !== 0
    ) {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      editData(`/api/user/${user?.userId}`, formFields).then((res) => {
        // console.log(res);
        setIsLoading(false);

        deleteData("/api/imageUpload/deleteAllImages");

        context.setAlertBox({
          open: true,
          error: false,
          msg: "user updated",
        });
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng điền đầy đủ thông tin",
      });
      return false;
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
    formdata.append("password", fields.password);
  
    if (
      fields.oldPassword !== "" &&
      fields.password !== "" &&
      fields.confirmPassword !== ""
    ) {
      if (fields.password !== fields.confirmPassword) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Mật khẩu và mật khẩu xác nhận không khớp",
        });
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
  
        const data = {
          name: user?.name,
          email: user?.email,
          password: fields.oldPassword,
          newPass: fields.password,
          phone: formFields.phone,
          images: formFields.images,
        };
  
        editData(`/api/user/changePassword/${user.userId}`, data)
          .then((res) => {
            context.setAlertBox({
              open: true,
              error: false,
              msg: "Mật khẩu đã thay đổi thành công!",
            });
          })
          .catch((err) => {
            context.setAlertBox({
              open: true,
              error: true,
              msg: "Mật khẩu hiện tại không đúng",
            });
          });
      }
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng điền đầy đủ thông tin",
      });
      return false;
    }
  };
  

  return (
    <section className="section myAccountPage">
      <div className="container">
        <h2 className="hd">Tài khoản của tôi</h2>

        <Box sx={{ width: "100%" }} className="myAccBox card border-0">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
              <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <form onSubmit={edituser}>
              <div className="row">
                <div className="col-md-4">
                  <div className="userImage d-flex align-items-center justify-content-center">
                    {uploading === true ? (
                      <CircularProgress />
                    ) : (
                      <>
                        {previews?.length !== 0 ? (
                          previews?.map((img, index) => {
                            return <img src={img} key={index} />;
                          })
                        ) : (
                          <img src={NoUserImg} />
                        )}
                        <div className="overlay d-flex align-items-center justify-content-center">
                          <IoMdCloudUpload />
                          <input
                            type="file"
                            multiple
                            onChange={(e) =>
                              onChangeFile(e, "/api/user/upload")
                            }
                            name="images"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          label="Tên"
                          variant="outlined"
                          className="w-100"
                          name="name"
                          onChange={changeInput}
                          value={formFields.name}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          label="Email"
                          disabled
                          variant="outlined"
                          className="w-100"
                          name="email"
                          onChange={changeInput}
                          value={formFields.email}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          label="Số điện thoại"
                          variant="outlined"
                          className="w-100"
                          name="phone"
                          onChange={changeInput}
                          value={formFields.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn-blue bg-red btn-lg btn-big"
                    >
                      {isLoading === true ? <CircularProgress /> : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <form onSubmit={changePassword}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <TextField
                          label="Mật khẩu hiện tại"
                          variant="outlined"
                          className="w-100"
                          name="oldPassword"
                          onChange={changeInput2}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <TextField
                          label="Mật khẩu mới"
                          variant="outlined"
                          className="w-100"
                          name="password"
                          onChange={changeInput2}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <TextField
                          label="Nhập lại mật khẩu mới"
                          variant="outlined"
                          className="w-100"
                          name="confirmPassword"
                          onChange={changeInput2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn-blue bg-red btn-lg btn-big"
                    >
                      {" "}
                      Lưu
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default MyAccount;
