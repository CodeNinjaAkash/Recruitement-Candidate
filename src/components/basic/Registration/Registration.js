import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./../../context/UserContext";
import Header from "../../common/header/Header";
import Spinner from "../../../assets/images/ring-36.svg";
import endpoint from "../../../constants/endpoint";
import http from "../../../utils/http";
import '../../../Services/Localstorage'
import {
  getCandidateId,
  storeToken,
  clearLocalStorage,
  storeCandidateId,
} from "../../../Services/Localstorage";
const candidateId = getCandidateId();

function Registration() {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const collegeRef = useRef(null);
  const [experience, setExperience] = useState("");
  const dateOfBirthRef = useRef(null);
  const educationDetailsRef = useRef(null);
  const areaOfInterestRef = useRef(null);
  const futureGoalRef = useRef(null);
  const currentAddressRef = useRef(null);
  // const cvRef = useRef(null);
  const contextValue = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = new Date();

  useEffect(() => {
    if (candidateId) {
      if (contextValue?.newUser?.step === "start test") {
        navigate("/start_test");
      } else if (contextValue?.newUser?.step === "quiz") {
        navigate("/quiz");
      } else if (contextValue?.newUser?.step === "final") {
        navigate("/result");
      }
    }
  }, [contextValue?.newUser, navigate]);

  useEffect(() => {
    http.get(`${endpoint.COLLEGES}`).then((res) => {
      setIsLoading(false);
      setCollegeOptions(
        res?.data.colleges.map((i) => ({ value: i._id, name: i.name }))
      );
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const submitForm = () => {
      formData.append("firstName", firstNameRef.current?.value || "");
      formData.append("middleName", middleNameRef.current?.value || "");
      formData.append("lastName", lastNameRef.current?.value || "");
      formData.append("mobileNo", phoneRef.current?.value || "");
      formData.append("email", emailRef.current?.value || "");
      formData.append("collegeId", collegeRef.current?.value || "");
      formData.append("experience", experience);
      formData.append("dob", dateOfBirthRef.current?.value || "");
      formData.append(
        "educationDetails",
        educationDetailsRef.current?.value || ""
      );
      formData.append("areaOfInterest", areaOfInterestRef.current?.value || "");
      formData.append("futureGoal", futureGoalRef.current?.value || "");
      formData.append("currentAddress", currentAddressRef.current?.value || "");
      // if (cvRef.current?.files[0]) {
      //   formData.append(
      //     "rdoc",
      //     cvRef.current?.files[0] || "",
      //     cvRef.current?.files[0]?.name
      //   );
      // }
      // setIsLoad(true);
      // let type = bytesToSize(cvRef.current?.files[0]?.size).toString().slice(-2);
      // if (
      //   type === "GB" ||
      //   type === "TB" ||
      //   (type === "MB" &&
      //     parseInt(bytesToSize(cvRef.current?.files[0]?.size)) > 10)
      // ) {
      //   toast.error("File size must be less then 10MB!!");
      // setIsLoad(true);
      // } else {
      http
        .post(`${endpoint.auth.CREATE_CANDIDATE}`, formData)
        .then((res) => {
          if (res.data.status === "success") {
            clearLocalStorage();
            let token = res.data.token;
            storeToken(token);
            toast.success(res.data.message);
            storeCandidateId(res.data?.candidateid);
            if (experience === "Trainee" || experience === "1-2") {
              navigate(`/start_test`);
            } else {
              navigate(`/result`);
            }
            setIsLoad(false);
          } else {
            setIsLoad(false);
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message === "Email already exists") {
            toast.error("Email already exists");
          } else {
            toast.error(error?.response?.data?.message);
          }
          setIsLoad(false);
          return false;
        });
    };
    if (experience !== "Trainee" && experience !== "1-2") {
      if (firstNameRef.current.value.trim().length === 0) {
        toast.error("First name is required");
      } else if (middleNameRef.current.value.trim().length === 0) {
        toast.error("Middle name is required");
      } else if (lastNameRef.current.value.trim().length === 0) {
        toast.error("Last name is required");
      } else if (dateOfBirthRef.current.value.length === 0) {
        toast.error("Date of birth is required");
      } else if (emailRef.current.value.trim().length === 0) {
        toast.error("Email is required");
      } else if (phoneRef.current.value.trim().length === 0) {
        toast.error("Mobile no is required");
      } else if (phoneRef.current.value.trim().length === 0) {
        toast.error("Mobile no is required");
      } else if (experience.trim().length === 0) {
        toast.error("Experience is required");
      } else {
        submitForm();
      }
    } else {
      if (firstNameRef.current.value.trim().length === 0) {
        toast.error("First name is required");
      } else if (middleNameRef.current.value.trim().length === 0) {
        toast.error("Middle name is required");
      } else if (lastNameRef.current.value.trim().length === 0) {
        toast.error("Last name is required");
      } else if (dateOfBirthRef.current.value.length === 0) {
        toast.error("Date of birth is required");
      } else if (emailRef.current.value.trim().length === 0) {
        toast.error("Email is required");
      } else if (phoneRef.current.value.trim().length === 0) {
        toast.error("Mobile no is required");
      } else if (experience.trim().length === 0) {
        toast.error("Experience is required");
      } else if (currentAddressRef.current.value.trim().length === 0) {
        toast.error("Current address is required");
      } else if (collegeRef.current.value.trim().length === 0) {
        toast.error("College is required");
      } else if (educationDetailsRef.current.value.trim().length === 0) {
        toast.error("Education details is required");
      } else if (areaOfInterestRef.current.value.trim().length === 0) {
        toast.error("Area of interest is required");
      } else if (futureGoalRef.current.value.trim().length === 0) {
        toast.error("Future goal is required");
      } else {
        submitForm();
      }
    }
  };

  const handleOnChangePhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      phoneRef.current.value = e.target.value;
    } else {
      phoneRef.current.value = "";
    }
  };
  const handleOnChangeDate = (e) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const { value } = e.target;
    if (regex.test(value)) {
      dateOfBirthRef.current.value = e.target.value;
    } else {
      dateOfBirthRef.current.value = "";
    }
  };
  // const bytesToSize = (bytes) => {
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  //   if (bytes === 0) return "n/a";
  //   const i = parseInt(
  //     Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)),
  //     10
  //   );
  //   if (i === 0) return `${bytes} ${sizes[i]}`;
  //   return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  // };
  if (isLoading) {
    return <div className="text-center text-lg text-stone-900">Loading...</div>;
  }
  return (
    <>
      <Header />
      <main className="main-wrap pb-7">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-header-title">Welcome to Atharva System</h3>
              <p className="card-text">Please fill out following details,</p>
            </div>
            <div className="card-body">
              <form className="registration-from" onSubmit={(e) => onSubmit(e)}>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="firstName"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        ref={firstNameRef}
                        required
                      />
                      <label htmlFor="firstName">
                        First Name<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="middleName"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        ref={middleNameRef}
                      />
                      <label htmlFor="middleName">
                        Middle Name<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="lastName"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        ref={lastNameRef}
                      />
                      <label htmlFor="LastName">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <div className="floating-label">
                      <input
                        id="dateOfBirth"
                        placeholder=" "
                        type="date"
                        className="form-control"
                        max={`${currentDate.getFullYear() - 18}-${(
                          currentDate.getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}-${currentDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")}`}
                        ref={dateOfBirthRef}
                        onChange={(e) => handleOnChangeDate(e)}
                      />
                      <label htmlFor="dateOfBirth">
                        Date of Birth<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-5">
                    <div className="floating-label">
                      <input
                        id="email"
                        placeholder=" "
                        type="email"
                        className="form-control"
                        ref={emailRef}

                        pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                      />
                      <label htmlFor="email">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="phone"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        onChange={(e) => handleOnChangePhone(e)}
                        ref={phoneRef}
                        minLength="10"
                        maxLength="10"
                      />
                      <label htmlFor="phone">
                        Mobile Number<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="floating-label">
                      <select
                        name="experience"
                        id="experience"
                        className="form-select"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <option value="">Select Experience</option>
                        <option value="Trainee">Trainee</option>
                        <option value="1-2">1-2</option>
                        <option value="3-4">3-4</option>
                        <option value="5-6">5-6</option>
                        <option value="7-8">7-8</option>
                        <option value="9-10">9-10</option>
                        <option value="10+">10+</option>
                      </select>
                      <label htmlFor="experience">
                        Experience<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="floating-label">
                      <textarea
                        id="currentAddress"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={currentAddressRef}
                      ></textarea>
                      <label htmlFor="currentAddress">
                        Current Address<span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>

                  {(experience === "Trainee" || experience === "1-2") && (
                    <>
                      <div className="col-span-12">
                        <div className="floating-label">
                          <select
                            name="college"
                            id="college"
                            className="form-select"
                            ref={collegeRef}
                          >
                            <option value="">Select College</option>
                            {collegeOptions.map((obj, index) => (
                              <option key={index} value={obj.value}>
                                {obj.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="collegeName">
                            College<span className="text-red-500">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="floating-label">
                          <textarea
                            id="educationDetails"
                            placeholder=" "
                            className="form-control !h-[100px]"
                            ref={educationDetailsRef}
                          ></textarea>
                          <label htmlFor="educationDetails">
                            Education Details : Last Semester score/Grade
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="floating-label">
                          <textarea
                            id="areaOfInterest"
                            placeholder=" "
                            className="form-control !h-[100px]"
                            ref={areaOfInterestRef}
                          ></textarea>
                          <label htmlFor="areaOfInterest">
                            Area of Interest
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="floating-label">
                          <textarea
                            id="futureGoal"
                            placeholder=" "
                            className="form-control !h-[100px]"
                            ref={futureGoalRef}
                          ></textarea>
                          <label htmlFor="futureGoal">
                            Future Goal<span className="text-red-500">*</span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {/* <div className="col-span-12">
                    <div className="floating-label">
                      <input
                        id="cv"
                        className="form-control-file"
                        type="file"
                        ref={cvRef}
                        required
                      />
                      <label htmlFor="cv">
                        Upload CV
                          <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div> */}
                  <div className="col-span-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoad}
                    >
                      {!isLoad ? (
                        <>
                          <span className="btn-text">Submit Form</span>
                          <span className="btn-icon">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="btn-icon">
                            <img
                              width="12"
                              height="12"
                              src={Spinner}
                              alt="Spinner"
                            />
                          </span>
                          <span className="btn-text">Loading...</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Registration;
