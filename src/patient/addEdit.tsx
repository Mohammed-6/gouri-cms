import React, { useState, useEffect } from "react";
import Layout from "../layout";

import {
  addEditPatientProps,
  addEditResponseProps,
  arrBranchProps,
  arrUserhProps,
} from "../types/patient";
import Link from "next/link";
import { useRouter } from "next/router";
import { toaster } from "../types/basic";
import {
  addPatient,
  editPatient,
  getPatientData,
  updatePatient,
} from "../query/patient";
import { Preloader, Toaster } from "../data/stuff";

const AddEdit = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const router = useRouter();
  const params = router.query;
  const [collectdata, setcollectdata] = useState<addEditPatientProps>({
    personalDetails: {
      title: "",
      fullname: "",
      fhName: "",
      gender: "",
      phone: "",
      sPhone: "",
      email: "",
      branch: "",
      bloodGroup: "",
      maritalStatus: "",
      dob: "",
      age: "",
      occupation: "",
      religion: "",
      aadharNo: "",
      primaryConsultant: "",
      referredBy: "",
    },
    emergencyContact: {
      relation: "",
      aadharNo: "",
      firstname: "",
      surname: "",
      phone: "",
    },
    residentailAddress: {
      addressLineOne: "",
      addressLineTwo: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  const [axiosbranch, setaxiosbranch] = useState(arrBranchProps);
  const [axiosuser, setaxiosuser] = useState(arrUserhProps);

  useEffect(() => {
    setloading(true);
    if (params.patientid !== undefined && params.patientid !== "") {
      editPatient(params.patientid as string).then((response) => {
        setcollectdata(response.data.data);
        setloading(false);
      });
    }
    getPatientData().then((response) => {
      setaxiosbranch(response.data.branch);
      setaxiosuser(response.data.user);
      setloading(false);
    });
  }, [router.isReady]);

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      personalDetails: {
        ...collectdata.personalDetails,
        [event.name]: event.value,
      },
    });
  };

  const changeFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      personalDetails: {
        ...collectdata.personalDetails,
        [event.name]: event.value,
      },
    });
  };

  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      emergencyContact: {
        ...collectdata.emergencyContact,
        [event.name]: event.value,
      },
    });
  };

  const changeForm2 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      residentailAddress: {
        ...collectdata.residentailAddress,
        [event.name]: event.value,
      },
    });
  };

  const changeFormSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
    setcollectdata({
      ...collectdata,
      personalDetails: {
        ...collectdata.personalDetails,
        [event.name]: event.value,
      },
    });
  };

  const changeFormSelect1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target as HTMLSelectElement;
    setcollectdata({
      ...collectdata,
      emergencyContact: {
        ...collectdata.emergencyContact,
        [event.name]: event.value,
      },
    });
  };
  const submitForm = () => {
    setloading(true);
    const colte = {
      ...collectdata,
      clinicId: localStorage.getItem("clinicId"),
    };

    if (collectdata.personalDetails.fullname == "") {
      settoasterdata({ type: "error", message: "Please enter fullname" });
      showToaster();
      setloading(false);
      return;
    }

    if (params.patientid !== undefined && params.patientid !== "") {
      updatePatient(colte).then((response) => {
        const res = response.data.data as addEditResponseProps;
        settoasterdata(response.data);
        showToaster();
        setloading(false);
        router.back();
      });
    } else {
      addPatient(colte).then((response) => {
        settoasterdata(response.data);
        showToaster();
        setloading(false);
        router.push("/patient/consultation/" + response.data.data.uniqueId);
      });
    }
  };
  const showToaster = () => {
    setshowtoaster(!showtoaster);
    setTimeout(() => {
      setshowtoaster(false);
    }, 3000);
  };
  return (
    <>
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      {loading ? <Preloader /> : ""}
      <div className="card">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Personal Details</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <Link href="/patient">
                    <button className="btn bg-red-500">Back</button>
                  </Link>
                </div>
                <div className="">
                  <button className="btn btn-primary" onClick={submitForm}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="p-1">
            <div className="grid grid-cols-6 gap-2">
              <div className="">
                <div className="form-item">
                  <label className="form-label">Title</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="title"
                      value={collectdata.personalDetails.title}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="Mx">Select</option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Baby">Baby.</option>
                      <option value="Mrs">Mrs.</option>
                      <option className="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Fullname</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="fullname"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.fullname}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">F/H Name</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="fhName"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.fhName}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Gender</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="gender"
                      value={collectdata.personalDetails.gender}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Primary Mobile No.</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="phone"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.phone}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Secondary Mobile No.</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="sPhone"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.sPhone}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Email</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="email"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.email}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Branch</label>
                  <div className="">
                    <select
                      className="form-input w-full"
                      name="branch"
                      value={collectdata.personalDetails.branch}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="">Select</option>
                      {axiosbranch !== undefined &&
                        axiosbranch.map((dd) => (
                          <option value={dd._id}>{dd.branchName}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Blood Group</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="bloodGroup"
                      value={collectdata.personalDetails.bloodGroup}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Marital Status</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="maritalStatus"
                      value={collectdata.personalDetails.maritalStatus}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Date of birth</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="date"
                      name="dob"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.referredBy}
                      onChange={(e) => changeFormChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Age</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="age"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.age}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Occupation</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="occupation"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.occupation}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Religion</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="religion"
                      value={collectdata.personalDetails.religion}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="">Select</option>
                      <option>Hindu</option>
                      <option>Muslim</option>
                      <option>Sikh</option>
                      <option>Christian</option>
                      <option>Jain</option>
                      <option>Buddism</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Aadhar No</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="aadharNo"
                      autoComplete="off"
                      placeholder=""
                      value={collectdata.personalDetails.aadharNo}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Primary Consultant</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="primaryConsultant"
                      value={collectdata.personalDetails.primaryConsultant}
                      onChange={(e) => changeFormSelect(e)}
                    >
                      <option value="">Select</option>
                      {axiosuser !== undefined &&
                        axiosuser.map((dd) => (
                          <option value={dd._id}>{dd.fullname}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Referred By</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="referredBy"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.personalDetails.referredBy}
                      onChange={(e) => changeForm(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold pt-2">Emergency Contact :</h2>
            <div className="grid grid-cols-6 gap-2">
              <div className="">
                <div className="form-item">
                  <label className="form-label">Relation</label>
                  <div className="">
                    <select
                      className="form-input"
                      name="relation"
                      value={collectdata.emergencyContact.relation}
                      onChange={(e) => changeFormSelect1(e)}
                    >
                      <option value="">Select</option>
                      <option value="Sister">Sister</option>
                      <option value="Brother">Brother</option>
                      <option value="Wife">Wife</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Friend">Friend</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Son">Son</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Aadhar No</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="aadharNo"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.emergencyContact.aadharNo}
                      onKeyUp={(e) => changeForm1(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Firstname</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="firstname"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.emergencyContact.firstname}
                      onKeyUp={(e) => changeForm1(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Surname</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="surname"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.emergencyContact.surname}
                      onKeyUp={(e) => changeForm1(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Mobile No</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="phone"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.emergencyContact.phone}
                      onKeyUp={(e) => changeForm1(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResidentialAddress formChange={changeForm2} data={collectdata} />
    </>
  );
};

type ResidentialAddressProps = {
  formChange: Function;
  data: addEditPatientProps;
};

const ResidentialAddress = (props: ResidentialAddressProps) => {
  const [collectdata, setcollectdata] = useState<addEditPatientProps>({
    personalDetails: {
      title: "",
      fullname: "",
      fhName: "",
      gender: "",
      phone: "",
      sPhone: "",
      email: "",
      branch: "",
      bloodGroup: "",
      maritalStatus: "",
      dob: "",
      age: "",
      occupation: "",
      religion: "",
      aadharNo: "",
      primaryConsultant: "",
      referredBy: "",
    },
    emergencyContact: {
      relation: "",
      aadharNo: "",
      firstname: "",
      surname: "",
      phone: "",
    },
    residentailAddress: {
      addressLineOne: "",
      addressLineTwo: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  useEffect(() => {
    setcollectdata(props.data);
  });

  const formChange3 = (e: React.FormEvent<HTMLInputElement>) => {
    props.formChange(e);
  };
  return (
    <>
      <div className="card">
        <div className="card-header">Residential Address</div>
        <div className="card-body">
          <div className="p-1">
            <div className="grid grid-cols-4 gap-x-2">
              <div className="">
                <div className="form-item">
                  <label className="form-label">Address Line 1</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="addressLineOne"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={
                        collectdata.residentailAddress.addressLineOne
                      }
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Address Line 2</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="addressLineTwo"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={
                        collectdata.residentailAddress.addressLineTwo
                      }
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Area</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="area"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.residentailAddress.area}
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">City</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="city"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.residentailAddress.city}
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">State</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="state"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.residentailAddress.state}
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Pincode</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="pincode"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.residentailAddress.pincode}
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Country</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="country"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={collectdata.residentailAddress.country}
                      onKeyUp={(e) => formChange3(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
