import React, { useState, useEffect, FormEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "../../layout/index";

import { useRouter } from "next/router";
import { Preloader, Toaster, serverURL } from "../../data/stuff";

import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Link from "next/link";
import {
  StarIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/solid";
import {
  consultationProps,
  patientProps,
  visitProps,
  arrvisitProps,
  consultationRowProps,
  starredPorps,
  editPrescriptionProps,
  updatePrescriptionProps,
  consultationRowOneProps,
} from "@/src/types/patient";
import {
  insertAudio,
  insertPatientVisit,
  loadPatientData,
  starredVisit,
  updatePrescriptionModel,
  uploadAttachment,
} from "@/src/query/patient";

import { attachmentProps } from "../../types/basic";
import { toaster } from "@/src/types/basic";

const Consultation = () => {
  return (
    <>
      <Layout>
        <SpareRow />
      </Layout>
    </>
  );
};

const SpareRow = () => {
  const router = useRouter();
  const [patientdetails, setpatientdetails] = useState<patientProps>();
  const [visitdata, setvisitdata] = useState<visitProps>();
  const [loading, setloading] = useState<boolean>(false);
  const params = router.query;
  useEffect(() => {
    if (
      router.query.patientid !== undefined &&
      router.query.patientid !== null
    ) {
      console.log(params.patientid);
      const qur = router.query.patientid;
      loadPatientData(router.query.patientid as unknown).then((response) => {
        if (response.data.type == "success") {
          console.log(response.data);
          setpatientdetails(response.data.data);
          setvisitdata(response.data.visit);
          setloading(true);
        }
      });
    }
  }, [router.isReady]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          {loading ? (
            <PatientDetails alldata={patientdetails} visit={visitdata} />
          ) : (
            ""
          )}
        </div>
        <div className="col-span-10">
          {loading ? (
            <ConsultationRow alldata={patientdetails} visit={visitdata} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

const ConsultationRow = (props: consultationRowOneProps) => {
  const router = useRouter();
  const [active, setactive] = useState<number>(0);
  const [collectdata, setcollectdata] = useState<consultationProps>({
    visitId: "",
    patientId: 0,
    doctorId: "",
    clinicId: "",
    clinicBranch: "",
    submitType: 1,
    visitDate: Math.floor(Date.now() / 1000),
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
  const [allvisit, setallvisit] = useState<visitProps>();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    console.log(props);
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
    setcollectdata({
      ...collectdata,
      patientId: props!.alldata!.uniqueId as number,
      clinicBranch: localStorage.getItem("clinicBranch")!,
      personalDetails: {
        primaryConsultant: localStorage.getItem("clinicUser")!,
        mainComplaint: props.alldata?.personalDetails.mainComplaint!,
        comments: props.alldata?.personalDetails.comments!,
        comorbidConditions: props.alldata?.personalDetails.comorbidConditions!,
      },

      visitId: makeid(7),
      doctorId: localStorage.getItem("clinicUser")!,
      clinicId: localStorage.getItem("clinicId")!,
    });
    setallvisit(props.visit);
    // document.addEventListener("keydown", handleHideDropdown, true);
    // document.addEventListener("click", handleClickOutside, true);
    // return () => {
    //   document.removeEventListener("keydown", handleHideDropdown, true);
    //   document.removeEventListener("click", handleClickOutside, true);
    // };
  }, []);

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
  const changeForm = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const event = e.target as HTMLTextAreaElement;
    setcollectdata({
      ...collectdata,
      personalDetails: {
        ...collectdata.personalDetails,
        [event.name]: event.value,
      },
    });
  };

  const formChange1 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      caseDetails: {
        ...collectdata.caseDetails,
        [event.name]: event.value,
      },
    });
  };

  const formChange2 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      consultationDetails: {
        ...collectdata.consultationDetails,
        [event.name]: event.value,
      },
    });
  };

  const formChange3 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      personalDetails: {
        ...collectdata.personalDetails,
        [event.name]: event.value,
      },
    });
  };

  const imageCollection = (dd: attachmentProps) => {
    setcollectdata({
      ...collectdata,
      caseDetails: {
        ...collectdata.caseDetails,
        attachments: dd,
      },
    });
    console.log(dd);
  };
  const formEditorChange = (e: string, name: string) => {
    setcollectdata({
      ...collectdata,
      caseDetails: {
        ...collectdata.caseDetails,
        [name]: e,
      },
    });
  };
  const submitForm = (type: number) => {
    setloading(true);
    const colte = { ...collectdata, submitType: type };
    console.log(collectdata);
    insertPatientVisit(colte).then((res) => {
      console.log(res);
      setloading(false);
      //   settoasterdata(res.data);
      //   showToaster();
      router.push("/patient");
    });
  };

  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob: Blob) => {
    setloading(true);
    const url = URL.createObjectURL(blob);
    const audiofile = new File([blob], Date.now() + "-" + "audiofile.mp3", {
      type: "audio/mpeg",
    });
    const formData = new FormData();
    formData.append("file", audiofile);
    insertAudio(formData).then((res) => {
      setcollectdata({
        ...collectdata,
        caseDetails: {
          ...collectdata.caseDetails,
          audioRecord: res.data.filedata,
        },
      });
      setloading(false);
    });
  };
  let ptid: string = "";
  if (router.query.patientid !== undefined) {
    ptid = props.alldata?._id as string;
  }
  return (
    <>
      <div className="card">
        <div className="card-header py-2">
          <div className="sm:flex grid items-center justify-between">
            <div className="">Today - {new Date().toDateString()}</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <Link href="/patient">
                    <button className="btn btn-primary">Back to List</button>
                  </Link>
                </div>
                <div className="">
                  <Link href={"/patient/" + ptid}>
                    <button className="btn btn-primary">
                      Edit Patient Details
                    </button>
                  </Link>
                </div>
                <div className="">
                  <button className="btn btn-danger">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
            <div className="">
              <div className="form-item">
                <label className="form-label">Comments:</label>
                <div className="">
                  <textarea
                    className="form-textarea px-1"
                    name="comments"
                    defaultValue={collectdata.personalDetails.comments}
                    onKeyUp={changeForm}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="">
              <div className="form-item">
                <label className="form-label">
                  Principal / MAIN COMPLAINT:
                </label>
                <div className="">
                  <textarea
                    className="form-textarea px-1"
                    name="mainComplaint"
                    defaultValue={collectdata.personalDetails.mainComplaint}
                    onKeyUp={changeForm}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Search History :</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="search"
                    autoComplete="off"
                    placeholder=""
                    value=""
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full"></div>
            </div>
            <div className="">
              <div className="form-item">
                <label className="form-label">Comorbid Conditions:</label>
                <div className="">
                  <textarea
                    className="form-textarea px-1"
                    name="comorbidConditions"
                    defaultValue={
                      collectdata.personalDetails.comorbidConditions
                    }
                    onKeyUp={changeForm}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-5 w-full lg:w-2/2 px-[20px] lg:px-0">
              <div
                className={`text-center border-b-4 rounded-sm pb-3 hover:cursor-pointer ${
                  active === 1 ? "border-green-700" : "border-gray-400"
                }`}
                onClick={() => setactive(1)}
              >
                <div
                  className={`font-medium text-md transistion duration-300 hover:text-green-700 ${
                    active !== 1 ? "text-gray-400" : "text-green-700"
                  }`}
                >
                  Case Details
                </div>
              </div>
              <div
                className={`text-center border-b-4 rounded-sm pb-3 hover:cursor-pointer ${
                  active === 2 ? "border-green-700" : "border-gray-400"
                }`}
                onClick={() => setactive(2)}
              >
                <div
                  className={`font-medium text-md transistion duration-300 hover:text-green-700 ${
                    active !== 2 ? "text-gray-400" : "text-green-700"
                  }`}
                >
                  Starred
                </div>
              </div>
              <div
                className={`text-center border-b-4 rounded-sm pb-3 hover:cursor-pointer ${
                  active === 3 ? "border-green-700" : "border-gray-400"
                }`}
                onClick={() => setactive(3)}
              >
                <div
                  className={`font-medium text-md transistion duration-300 hover:text-green-700 ${
                    active !== 3 ? "text-gray-400" : "text-green-700"
                  }`}
                >
                  Precription
                </div>
              </div>
              <div className="">
                <div className="">
                  <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    recorderControls={recorderControls}
                  />
                </div>
              </div>
            </div>
          </div>
          {active === 1 ? (
            <ConsultationTab
              setCaseDetails={formChange1}
              setEditorChange={formEditorChange}
              setConsultationDetails={formChange2}
              setPersonalDetails={formChange3}
              imageCollection={imageCollection}
              formSubmit={submitForm}
              alldata={props.alldata}
              visit={props.visit}
            />
          ) : active === 2 ? (
            <StarredTab visit={props.visit!} />
          ) : active === 3 ? (
            <PrescriptionTab visit={props.visit!} />
          ) : (
            <ConsultationTab
              setCaseDetails={formChange1}
              setEditorChange={formEditorChange}
              setConsultationDetails={formChange2}
              setPersonalDetails={formChange3}
              imageCollection={imageCollection}
              formSubmit={submitForm}
              alldata={props.alldata}
              visit={props.visit}
            />
          )}
        </div>
      </div>
    </>
  );
};

const ConsultationTab = (props: consultationRowProps) => {
  const router = useRouter();
  const editorRef = React.useRef(null);
  const [sorting, setsorting] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [visitdata, setvisitdata] = useState<visitProps>();
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  const [showeditpresc, setshoweditpresc] = useState<boolean>(false);
  const [editprescdata, seteditprescdata] = useState<editPrescriptionProps>({
    html: "",
    caseDetails: "",
    roi: "",
    visitId: "",
  });
  const [attachments, setattachments] = useState<attachmentProps[]>([]);

  useEffect(() => {
    console.log(props);
    setvisitdata(props.visit);
  }, []);

  let sortFilter: visitProps = [];

  if (visitdata !== undefined && sorting) {
    sortFilter = visitdata!.sort((a, b) => b.visitDate - a.visitDate);
  } else if (visitdata !== undefined) {
    sortFilter = visitdata!.sort((a, b) => a.visitDate - b.visitDate);
  }

  const makeStarred = (visitid: string, star: number) => {
    setloading(true);
    const data: starredPorps = {
      visitId: visitid,
      star: star,
      patientId: router.query.patientid as string,
      clinicId: "",
    };
    starredVisit(data).then((res) => {
      console.log(res);
      settoasterdata(res.data);
      setvisitdata(res.data.data);
      // showToaster();
      setloading(false);
    });
  };

  const editPrescription = (dd: editPrescriptionProps) => {
    seteditprescdata(dd);
    setshoweditpresc(true);
  };

  const editorChange = (e: string, tag: string) => {
    // console.log(e);
    props.setEditorChange(e, tag);
  };
  const formChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setCaseDetails(e);
  };
  const formChangeInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setCaseDetails(e);
  };
  const formChangeSelect1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setCaseDetails(e);
  };
  const formChangeKeyboard1 = (e: React.KeyboardEvent<HTMLInputElement>) => {
    props.setCaseDetails(e);
  };
  const formChangeKeyboardSelect1 = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    props.setCaseDetails(e);
  };
  const formChange2 = (e: React.FormEvent<HTMLInputElement>) => {
    props.setConsultationDetails(e);
  };
  const formChange3 = (e: React.FormEvent<HTMLInputElement>) => {
    props.setPersonalDetails(e);
  };

  const attachmentFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloading(true);
    const newFiles = e.target.files;
    if (newFiles) {
      const files = Array.from(newFiles);

      uploadAttachment(files).then(async (res) => {
        console.log(res);
        await res.data.filedata.map((img: attachmentProps) => {
          attachments.push(img);
          // const dp = [...attachments, img];
          props.imageCollection(attachments);
          // console.log(attachments);
        });
        setloading(false);
      });
    }
  };
  const submitForm = () => {
    props.formSubmit(1);
  };
  const saveForm = () => {
    props.formSubmit(2);
  };

  const EditPrescription = (props: editPrescriptionProps) => {
    const [editprescdata, seteditprescdata] = useState<editPrescriptionProps>({
      html: "",
      caseDetails: "",
      roi: "",
      visitId: "",
    });
    useEffect(() => {
      seteditprescdata(props);
      document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("keydown", handleHideDropdown, true);
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);
    const ref = React.useRef(null);
    const handleHideDropdown = (event: any) => {
      if (event.key === "Escape") {
        //   console.log("escape");
        setshoweditpresc(false);
      }
    };
    const handleClickOutside = (event: any) => {
      // if (ref.current && !ref.current.contains(event.target)) {
      //   console.log("outside");
      // setshoweditpresc(false);
      // }
    };

    const updatePrescription = () => {
      const data: updatePrescriptionProps = {
        data: editprescdata,
        clinicId: localStorage.getItem("clinicId")!,
        patientId: router.query.patientid as string,
      };
      updatePrescriptionModel(data).then((res) => {
        settoasterdata(res.data);
        setvisitdata(res.data.data);
        // showToaster();
        setloading(false);
        setshoweditpresc(false);
      });
    };
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-scroll">
          {/* edit prescription */}
          <div ref={ref} className="container mx-auto max-w-4xl">
            <div className="card">
              <div className="card-header">Edit Prescription</div>
              <div className="card-body">
                <div className="font-bold text-gray-500 text-md pt-3">
                  <h2>Consultation :</h2>
                  <div className="flex">
                    <div className="w-full">
                      <Editor
                        //   onInit={(evt, editor) => (editorRef.current = editor)}
                        value={editprescdata.caseDetails}
                        init={{
                          height: 250,
                          menubar: true,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style: "body {font-size:14px }",
                        }}
                        onEditorChange={(e) =>
                          seteditprescdata({
                            ...editprescdata,
                            caseDetails: e,
                          })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <h2>Record of investigation :</h2>
                  <div className="flex">
                    <div className="w-full">
                      <Editor
                        //   onInit={(evt, editor) => (editorRef.current = editor)}
                        value={editprescdata.roi}
                        init={{
                          height: 250,
                          menubar: true,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style: "body {font-size:14px }",
                        }}
                        onEditorChange={(e) =>
                          seteditprescdata({
                            ...editprescdata,
                            roi: e,
                          })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <h2>Prescription :</h2>
                  <div className="flex">
                    <div className="w-full">
                      <Editor
                        //   onInit={(evt, editor) => (editorRef.current = editor)}
                        value={editprescdata.html}
                        init={{
                          height: 250,
                          menubar: true,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style: "body {font-size:14px }",
                        }}
                        onEditorChange={(e) =>
                          seteditprescdata({
                            ...editprescdata,
                            html: e,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary my-2"
                    onClick={() => updatePrescription()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {showeditpresc ? (
        <EditPrescription
          html={editprescdata.html}
          caseDetails={editprescdata.caseDetails}
          roi={editprescdata.roi}
          visitId={editprescdata.visitId}
        />
      ) : (
        ""
      )}
      {loading ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-gray-500">
              Case History: ({visitdata !== undefined && visitdata.length})
            </h2>
          </div>
          <div title="sorting">
            {sorting ? (
              <div
                onClick={() => setsorting(false)}
                className="hover:cursor-pointer bg-green-600 py-2 px-3 mb-2 rounded-md"
              >
                <BarsArrowDownIcon className="w-6 fill-white" />
              </div>
            ) : (
              <div
                onClick={() => setsorting(true)}
                className="hover:cursor-pointer bg-green-600 py-2 px-3 mb-2 rounded-md"
              >
                <BarsArrowUpIcon className="w-6 fill-white" />
              </div>
            )}
          </div>
        </div>
        <div className="border border-gray-300 max-h-[400px] overflow-x-auto bg-white">
          {sortFilter !== undefined &&
            sortFilter.map((dd, n) => {
              var date = new Date(dd.visitDate * 1000);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              return (
                <>
                  <div className={`${n % 2 === 0 ? "bg-gray-100" : ""}`}>
                    <div className={`my-0 p-1.5`}>
                      {/* case details */}
                      <div className="flex font-bold gap-x-1 text-red-500">
                        <div className="">
                          {day + "/" + month + "/" + year}:{" "}
                        </div>
                        <div className="">
                          {dd?.starred == 1 ? (
                            <StarIcon
                              className={`w-5 fill-yellow-500 hover:cursor-pointer`}
                              onClick={() => makeStarred(dd.visitId, 0)}
                            />
                          ) : (
                            <StarIcon
                              className={`w-5 fill-black hover:cursor-pointer`}
                              onClick={() => makeStarred(dd.visitId, 1)}
                            />
                          )}
                        </div>
                        (Case Details)
                        <div
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: dd.caseDetails.consultation,
                          }}
                        />
                      </div>
                      {/* record of investigation */}
                      <div className="flex font-bold gap-x-1 text-green-500">
                        (Record of investigation){" "}
                        {dd.caseDetails.recordOfInvestigation == "" ? (
                          <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                              __html: dd.caseDetails.diagnosis,
                            }}
                          />
                        ) : (
                          <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                              __html: dd.caseDetails.recordOfInvestigation,
                            }}
                          />
                        )}
                      </div>
                      {/* prescription */}
                      <div
                        className={`flex font-bold gap-x-1 ${
                          dd.edited !== undefined && dd.edited === 1
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        (Prescription){" "}
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: dd.caseDetails.prescription,
                          }}
                        />
                      </div>
                      {/* attachments */}
                      <div className="flex gap-x-1 text-sm justify-end">
                        {dd.caseDetails.attachments !== undefined &&
                          dd.caseDetails.attachments.map(
                            (atch: attachmentProps) => (
                              <>
                                <div className="bg-gray-200 rounded-full px-2 py-[1px]">
                                  <a
                                    href={serverURL + "/" + atch.path}
                                    target="_blank"
                                    className=""
                                  >
                                    {atch.mimetype}
                                  </a>
                                </div>
                              </>
                            )
                          )}
                        {dd.caseDetails.audioRecord !== undefined ? (
                          <>
                            <div className="bg-gray-200 rounded-full px-2 py-[1px]">
                              <a
                                href={
                                  serverURL +
                                  "/" +
                                  dd.caseDetails.audioRecord.path
                                }
                                target="_blank"
                                className=""
                              >
                                {dd.caseDetails.audioRecord.mimetype}
                              </a>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
        </div>
        <div className="font-bold text-gray-500 bg-white">
          <h2>Last visit details:</h2>
          {visitdata !== undefined &&
            visitdata.map((dd, k) => {
              var date = new Date(dd.visitDate * 1000);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              const cnt = visitdata.length - 1;
              return (
                <>
                  {k == cnt ? (
                    <div className="flex gap-x-2 items-center shadow-md rounded-md my-2 p-1">
                      <div className="text-sm">
                        {day + "/" + month + "/" + year} :{" "}
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: dd.caseDetails.prescription,
                          }}
                        />
                      </div>
                      <div className="">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            editPrescription({
                              html: dd.caseDetails.prescription,
                              caseDetails: dd.caseDetails.consultation,
                              roi:
                                dd.caseDetails.recordOfInvestigation == ""
                                  ? dd.caseDetails.diagnosis
                                  : dd.caseDetails.recordOfInvestigation,
                              visitId: dd.visitId,
                            })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </div>

        <div className="font-bold text-gray-500 text-md pt-3">
          <h2>Today's Consultation :</h2>
          <div className="flex">
            <div className="w-full">
              <Editor
                // onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={collectdata.description}
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "autogrow",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  contextmenu: ["cell row column deletetable"],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style: "body {font-size:14px }",
                }}
                textareaName=""
                onEditorChange={(e) => editorChange(e, "consultation")}
              />
            </div>
          </div>
        </div>

        <div className="font-bold text-gray-500 text-md pt-3">
          <h2>Record of investigation :</h2>
          <div className="flex">
            <div className="w-full">
              <Editor
                // onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={collectdata.description}
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  contextmenu: ["cell row column deletetable"],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style: "body {font-size:14px }",
                }}
                onEditorChange={(e) => editorChange(e, "recordOfInvestigation")}
              />
            </div>
          </div>
        </div>
        <div className="font-bold text-gray-500 text-md pt-3">
          <h2>Prescription :</h2>
          <div className="flex">
            <div className="w-full">
              <Editor
                data-gramm_editor="false"
                // onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={collectdata.description}
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  contextmenu: ["cell row column deletetable"],
                  content_style: "body {font-size:14px }",
                }}
                onEditorChange={(e) => editorChange(e, "prescription")}
              />
            </div>
          </div>
        </div>
        <div className="py-2">
          <label className="font-bold text-gray-500">
            Compounder Instruction:
          </label>
          <textarea
            name="compounderInstruction"
            className="border w-full rounded-md"
            onChange={(e) => formChange1(e)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <div className="">
            <div className="form-item">
              <label className="form-label">Attachment Upload :</label>
              <div className="">
                <input
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  type="file"
                  multiple={true}
                  onChange={attachmentFormChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2">
          <div className="">
            <div className="form-item">
              <label className="form-label">Consultation Fees :</label>
              <div className="">
                <input
                  className="form-input"
                  type="text"
                  name="consultationFee"
                  autoComplete="off"
                  placeholder=""
                  defaultValue=""
                  onKeyUp={(e) => formChange2(e)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Medication Fees :</label>
              <div className="">
                <input
                  className="form-input"
                  type="text"
                  name="medicationFee"
                  autoComplete="off"
                  placeholder=""
                  defaultValue=""
                  onKeyUp={(e) => formChange2(e)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Edit Mobile :</label>
              <div className="">
                <input
                  className="form-input"
                  type="text"
                  name="phone"
                  autoComplete="off"
                  placeholder=""
                  defaultValue={props.alldata?.personalDetails.phone}
                  onKeyUp={(e) => formChange3(e)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Edit Email :</label>
              <div className="">
                <input
                  className="form-input"
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder=""
                  defaultValue={props.alldata?.personalDetails.email}
                  onKeyUp={(e) => formChange3(e)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Next Consultation:</label>
              <div className="">
                <input
                  className="form-input"
                  type="date"
                  name="followUpDate"
                  autoComplete="off"
                  placeholder=""
                  defaultValue=""
                  onChange={(e) => formChangeInput1(e)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Time:</label>
              <div className="">
                <select
                  className="form-input"
                  name="followUpTime"
                  onChange={(e) => formChangeSelect1(e)}
                >
                  <option value="">Time</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Test Required:</label>
              <div className="">
                <input
                  className="form-input"
                  type="text"
                  name="followUpTestRequired"
                  autoComplete="off"
                  placeholder=""
                  defaultValue=""
                  onKeyUp={(e) => formChangeKeyboard1(e)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="form-item">
              <label className="form-label">Follow Up Instruction:</label>
              <div className="">
                <textarea
                  className="border w-full rounded-md"
                  name="followUpInstruction"
                  onKeyUp={(e) => formChangeKeyboardSelect1(e)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 justify-end">
          <div className="">
            <button className="btn btn-danger" onClick={saveForm}>
              Save
            </button>
          </div>
          <div className="">
            <button className="btn btn-primary" onClick={submitForm}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

type starredProps = {
  visit: visitProps;
};
const StarredTab = (props: starredProps) => {
  return (
    <>
      <div className="">
        <div className="border border-gray-300 max-h-[300px] overflow-x-auto">
          {props.visit !== undefined &&
            props.visit.map((dd) => {
              var date = new Date(dd.created_at);
              return (
                <>
                  <div>
                    {dd?.starred == 1 ? (
                      <>
                        <div className="my-1 p-1">
                          {/* case details */}
                          <div className="flex font-medium items-center gap-x-1">
                            <div className="">{date.toDateString()}: </div>
                            (Case Details)
                            <div
                              className="text-sm max-w-xl"
                              dangerouslySetInnerHTML={{
                                __html: dd.caseDetails.consultation,
                              }}
                            />
                          </div>
                          {/* record of investigation */}
                          <div className="flex font-medium items-center gap-x-1">
                            (Record of investigation){" "}
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: dd.caseDetails.recordOfInvestigation,
                              }}
                            />
                          </div>
                          {/* prescription */}
                          <div className="flex font-medium items-center gap-x-1">
                            (Prescription){" "}
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: dd.caseDetails.prescription,
                              }}
                            />
                          </div>
                        </div>
                        <hr />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

const PrescriptionTab = (props: starredProps) => {
  return (
    <>
      <div className="">
        <div className="border border-gray-300 max-h-[300px] overflow-x-auto">
          {props.visit !== undefined &&
            props.visit.map((dd) => {
              var date = new Date(dd.created_at);
              return (
                <>
                  <div className="my-1 p-1">
                    {/* prescription */}
                    <div className="flex font-medium items-center gap-x-1">
                      <div className="">{date.toDateString()}: </div>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: dd.caseDetails.prescription,
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

const PatientDetails = (props: consultationRowOneProps) => {
  const patient: patientProps = props.alldata!;
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-header">Patient Details</div>
          <div className="card-body">
            <div className="text-center">
              <div>
                <h2 className="font-medium text-2xl text-blue-600 py-3">
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
                <b>Location : </b>
                {patient.residentailAddress.city}
                <br />
                <br />
                <b>Referred By : </b>
                {patient.personalDetails.referredBy}
                <br />
                <br />
                <b>Primary Consultant :</b>
                {patient.personalDetails.primaryConsultant} <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultation;
