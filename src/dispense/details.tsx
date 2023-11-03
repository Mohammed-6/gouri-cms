import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { useRouter } from "next/router";
import { dispensePatientVisit, getPatientDispense } from "../query/dispense";
import {
  editDispense,
  addEditPatientProps,
  consultationProps,
} from "../types/dispense";
import Link from "next/link";
import { Preloader, Toaster } from "../data/stuff";

const Details = () => {
  return (
    <>
      <Layout>
        <Dispense />
      </Layout>
    </>
  );
};

const Dispense = () => {
  const router = useRouter();
  const [patientdetails, setpatientdetails] = useState<addEditPatientProps>({
    _id: "",
    uniqueId: "",
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
      fullname: "",
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
  const [visitdata, setvisitdata] = useState<consultationProps>({
    uniqueId: "",
    visitId: "",
    patientId: 0,
    doctorId: "",
    clinicId: "",
    clinicBranch: "",
    submitType: 0,
    visitDate: 0,
    caseDetails: {
      consultation: "",
      recordOfInvestigation: "",
      prescription: "",
      compounderInstruction: "",
      followUpDate: "",
      followUpTime: "",
      followUpTestRequired: "",
      followUpRemainder: "",
      audioRecord: {},
      attachments: [],
    },
    consultationDetails: {
      consultationFee: 0,
      medicationFee: 0,
    },
    personalDetails: {
      primaryConsultant: "",
      mainComplaint: "",
      comments: "",
      comorbidConditions: "",
    },
  });
  const [loading, setloading] = useState<boolean>(false);
  const params = router.query;
  useEffect(() => {
    const visitid = params.visitid;
    getPatientDispense(visitid as any).then((response) => {
      if (response.data.type == "success") {
        setpatientdetails(response.data.user);
        setvisitdata(response.data.visit);
        setloading(true);
      }
    });
  }, [router.isReady]);

  return (
    <>
      <div className="block sm:hidden">
        {loading ? (
          <PatientDetails2 alldata={patientdetails} visit={visitdata} />
        ) : (
          ""
        )}
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-10">
          {loading ? (
            <DispenseRow alldata={patientdetails} visit={visitdata} />
          ) : (
            ""
          )}
        </div>
        <div className="col-span-2 sm:block hidden">
          {loading ? (
            <PatientDetails alldata={patientdetails} visit={visitdata} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
type dispenseProps = {
  alldata: addEditPatientProps;
  visit: consultationProps;
};
const DispenseRow = (props: dispenseProps) => {
  const router = useRouter();
  function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const [row1, setrow1] = useState([{ keyid: makeid(5) }]);
  const [loading, setloading] = useState(false);
  const [showtoaster, setshowtoaster] = useState(false);
  const [toasterdata, settoasterdata] = useState({ type: "", message: "" });

  var date = new Date();
  var current_date =
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  const [collectdata, setcollectdata] = useState<editDispense>({
    patientId: props.alldata.uniqueId,
    visitId: props.visit.visitId,
    dispenserId: localStorage.getItem("clinicUser")!,
    clinicId: localStorage.getItem("clinicId")!,
    dispenseTime: current_date,
    medicationDetails: [],
    otherInstructions: "",
    paidAmount: 0,
    paymentMethod: "",
    reasonShortPayment: "",
    phone: props.alldata?.personalDetails.phone,
    sphone: props.alldata?.personalDetails.sPhone,
    email: props.alldata?.personalDetails.email,
  });
  const [balanceamount, setbalanceamount] = useState<number>(0);
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };
  const formChange1 = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };
  const formSubmit = () => {
    setloading(true);
    dispensePatientVisit(collectdata).then((res) => {
      console.log(res);
      setloading(false);
      setshowtoaster(true);
      settoasterdata(res.data);
      showToaster();
    });
  };

  const showToaster = () => {
    setshowtoaster(!showtoaster);
    setTimeout(() => {
      setshowtoaster(false);
      router.push("/dispense");
    }, 500);
  };
  const paidAmt = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    const pay = event.value as any;
    const total =
      Math.floor(props.visit?.consultationDetails?.consultationFee) +
      Math.floor(props.visit?.consultationDetails?.medicationFee);

    const balance = total - pay;
    // console.log(balance);
    setbalanceamount(balance);
  };
  const makeFull = () => {
    const total =
      Math.floor(props.visit?.consultationDetails?.consultationFee) +
      Math.floor(props.visit?.consultationDetails?.medicationFee);
    setcollectdata({ ...collectdata, paidAmount: total });
    setbalanceamount(0);
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="card relative z-10">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Dispense Details</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <Link href="/dispense">
                    <button className="btn btn-danger">Back to List</button>
                  </Link>
                </div>
                <div className="">
                  <Link href={`/patient/${props.alldata._id}`}>
                    <button className="btn btn-primary">
                      Edit Patient Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
              <div className="">
                <div className="form-item">
                  <label className="form-label">Phone :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="phone"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={props.alldata?.personalDetails.phone}
                      onKeyUp={(e) => formChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Alternate Phone :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="sPhone"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={props.alldata?.personalDetails.sPhone}
                      onKeyUp={(e) => formChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Email :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="email"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={props.alldata?.personalDetails.email}
                      onKeyUp={(e) => formChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3">
              <h2 className="font-bold">Prescription :</h2>
              <div className="flex border border-gray-400 p-1">
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: props.visit?.caseDetails.prescription,
                  }}
                />
              </div>
            </div>
            {props.visit?.caseDetails.compounderInstruction !== "" ? (
              <div className="pt-3">
                <h2 className="font-bold">Instruction :</h2>
                <div className="flex border border-gray-400 p-1">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: props.visit?.caseDetails.compounderInstruction,
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="hidden">
              <div className="form-item py-0">
                <label className="form-label">Other Instruction</label>
                <div className="">
                  <textarea
                    className="form-textarea"
                    name="otherInstructions"
                    onKeyUp={(e) => formChange1(e)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 pt-2">
              <div className="">
                <div className="form-item py-0">
                  <label className="form-label">Consultation Fees :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name=""
                      autoComplete="off"
                      placeholder=""
                      defaultValue={
                        props.visit?.consultationDetails?.consultationFee
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item py-0">
                  <label className="form-label">Medication Fees :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="userName"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={
                        props.visit?.consultationDetails?.medicationFee
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item py-0">
                  <label className="form-label">Total :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="userName"
                      autoComplete="off"
                      placeholder=""
                      defaultValue={
                        Math.floor(
                          props.visit?.consultationDetails?.consultationFee
                        ) +
                        Math.floor(
                          props.visit?.consultationDetails?.medicationFee
                        )
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex grid py-3 gap-x-2 font-bold items-center">
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    name="paymentMethod"
                    value="cash"
                    onChange={(e) => formChange(e)}
                    className="accent-blue-500"
                  />
                  Cash
                </label>
              </div>
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    name="paymentMethod"
                    value="card"
                    onChange={(e) => formChange(e)}
                    className="accent-blue-500"
                  />
                  Card
                </label>
              </div>
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    name="paymentMethod"
                    value="online"
                    onChange={(e) => formChange(e)}
                    className="accent-blue-500"
                  />
                  Online
                </label>
              </div>
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    name="paymentMethod"
                    value="both"
                    onChange={(e) => formChange(e)}
                    className="accent-blue-500"
                  />
                  Cash / Card
                </label>
              </div>
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    name="paymentMethod"
                    value="cashonline"
                    onChange={(e) => formChange(e)}
                    className="accent-blue-500"
                  />
                  Cash / Online
                </label>
              </div>
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    name="paymentMethod"
                    value="cardonline"
                    onChange={(e) => formChange(e)}
                    className="accent-blue-500"
                  />
                  Card / Online
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2">
              <div className="">
                <div className="grid grid-cols-12 gap-x-1">
                  <div className="col-span-10">
                    <div className="form-item py-0">
                      <label className="form-label">Paid Amount :</label>
                      <div className="">
                        <input
                          className="form-input"
                          type="text"
                          name="paidAmount"
                          autoComplete="off"
                          placeholder=""
                          value={Math.floor(collectdata.paidAmount)}
                          onKeyUp={(e) => {
                            formChange(e);
                            paidAmt(e);
                          }}
                          onChange={(e) => {
                            formChange(e);
                            paidAmt(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="form-label opacity-0">:</label>
                    <div className="bg-green-700 p-2 rounded-md font-bold text-white">
                      <button className="" onClick={makeFull}>
                        Full
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item py-0">
                  <label className="form-label">Balance Due :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="userName"
                      autoComplete="off"
                      placeholder=""
                      value={balanceamount}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item py-0">
                  <label className="form-label">Total Collected :</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="text"
                      name="userName"
                      autoComplete="off"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item py-0">
                  <label className="form-label">
                    Reason For Short Payment:
                  </label>
                  <div className="">
                    <textarea
                      className="form-textarea"
                      name="reasonShortPayment"
                      onKeyUp={formChange1}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <button className="btn btn-primary" onClick={formSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PatientDetails = (props: dispenseProps) => {
  const patient = props.alldata;
  function calculateAge(dob: number) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Patient Details</div>
          <div className="card-body">
            <div className="text-center">
              <div>
                <h2 className="font-bold text-2xl text-blue-600 py-3">
                  {patient.personalDetails.title}
                  {". "}
                  {patient.personalDetails.fullname}
                </h2>
                <b>Patient No : </b>
                {patient.uniqueId}
                <br />
                <br />
                <b>Age : </b>
                {patient.personalDetails.age}
                <br />
                <br />
                <b>Gender : </b>
                {patient.personalDetails.gender}
                <br />
                <br />
                <b>Mobile : </b>
                {patient.personalDetails.phone}
                <br />
                <br />
                <b>Email : </b>
                {patient.personalDetails.email}
                <br />
                <br />
                <b>Location : </b>
                {patient.residentailAddress.city}
                <br />
                <br />
                <b>Blood Group : </b>
                {patient.personalDetails.bloodGroup}
                <br />
                <br />
                <b>Dob : </b>
                {patient.personalDetails.dob}
                <br />
                <br />
                <b>Occupation : </b>
                {patient.personalDetails.occupation}
                <br />
                <br />
                <b>Religion : </b>
                {patient.personalDetails.religion}
                <br />
                <br />
                <b>Emergency Contact Person :</b> <br />
                {patient.emergencyContact.fullname}
                <br />
                <b>Emergency Contact : </b>
                {patient.emergencyContact.phone}
                <br />
                <br />
                <b>Referred By : </b>
                {patient.personalDetails.referredBy}
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PatientDetails2 = (props: dispenseProps) => {
  const patient = props.alldata;
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Patient Details</div>
          <div className="card-body">
            <div className="">
              <div className="grid grid-cols-1 gap-5">
                <div className="">
                  <div className="flex">
                    <strong>Patient Name:&nbsp;</strong>
                    <span className="">
                      {patient.personalDetails.title}
                      {". "}
                      {patient.personalDetails.fullname}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="flex">
                    <strong>Patient Age:&nbsp;</strong>
                    <span className="">{patient.personalDetails.age}</span>
                  </div>
                </div>
                <div className="">
                  <div className="flex">
                    <strong>Patient Gender:&nbsp;</strong>
                    <span className="">{patient.personalDetails.gender}</span>
                  </div>
                </div>
                <div className="">
                  <div className="flex">
                    <strong>Blood Group:&nbsp;</strong>
                    <span className="">
                      {patient.personalDetails.bloodGroup}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="flex">
                    <strong>Patient Emergency Contact Name:&nbsp;</strong>
                    <span className="">
                      {patient.emergencyContact.fullname}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="flex">
                    <strong>Patient Emergency Contact Number:&nbsp;</strong>
                    <span className="">{patient.emergencyContact.phone}</span>
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
export default Details;
