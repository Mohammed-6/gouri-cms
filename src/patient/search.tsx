import React, { useEffect, useState } from "react";
import {
  searchProps,
  searchValueProps,
  suggestDataProps,
  suggestionProps,
} from "../types/patient";

import { useRouter } from "next/router";
import Link from "next/link";
import { getPatientList, searchSuggestions } from "../query/patient";
import { Preloader } from "../data/stuff";

const Search = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<searchProps>({
    personalDetails: {
      fullname: "",
      fhName: "",
      referredBy: "",
      dob: "",
      phone: "",
      email: "",
      occupation: "",
    },
    residentailAddress: {
      city: "",
    },
    other: {
      year: "",
      fromDate: "",
      toDate: "",
    },
  });
  const [suggestion, setsuggestion] = useState<suggestionProps>({
    fullname: [],
    fhName: [],
    referredBy: [],
    dob: [],
    phone: [],
    email: [],
    occupation: [],
    area: [],
  });
  const [initialvalue, setinitialvalue] = useState<searchProps>({
    personalDetails: {
      fullname: "",
      fhName: "",
      referredBy: "",
      dob: "",
      phone: "",
      email: "",
      occupation: "",
    },
    residentailAddress: {
      city: "",
    },
    other: {
      year: "",
      fromDate: "",
      toDate: "",
    },
  });
  const [suggestdata, setsuggestdata] = useState<suggestDataProps>([]);
  const [suggesttable, setsuggesttable] = useState<boolean>(false);

  const [patientid, setpatientid] = useState<string>("");
  const [showpreloader, setshowpreloader] = useState<boolean>(false);

  const changePatientId = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setpatientid(event.value);
  };
  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      personalDetails: {
        ...collectdata.personalDetails,
        [event.name]: event.value,
      },
    });
    let colte = {
      type: "personalDetails." + event.name,
      value: event.value,
      clinicId: localStorage.getItem("clinicId"),
    };
    searchSuggestions(colte as searchValueProps).then((response) => {
      setsuggestion({ ...suggestion, [event.name]: response.data.data });
    });
  };
  const changeForm1 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      residentailAddress: {
        ...collectdata.residentailAddress,
        [event.name]: event.value,
      },
    });
    let colte = {
      type: "residentailAddress." + event.name,
      value: event.value,
      clinicId: localStorage.getItem("clinicId"),
    };
    searchSuggestions(colte as searchValueProps).then((response) => {
      console.log(response);
      setsuggestion({ ...suggestion, area: response.data.data });
    });
  };
  const changeForm2 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      other: { ...collectdata.other, [event.name]: event.value },
    });
  };
  const patientidSubmit = () => {
    router.push("/patient/" + patientid);
  };
  const searchPatient = () => {
    setshowpreloader(true);
    getPatientList(collectdata).then((res) => {
      setsuggestdata(res.data.data);
      setshowpreloader(false);
      setsuggesttable(true);
    });
  };
  const closeTable = () => {
    setsuggesttable(false);
  };
  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      {suggesttable ? (
        <SuggestList data={suggestdata} closeTable={closeTable} />
      ) : (
        ""
      )}
      <div className="card">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Patient Search</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <button className="btn btn-danger">Close</button>
                </div>
                <div className="">
                  <button className="btn btn-primary" onClick={searchPatient}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <div className="">
              <form>
                <div className="grid grid-cols-2 items-center gap-x-2">
                  <div className="form-item">
                    <label className="form-label">Patient id</label>
                    <div className="">
                      <input
                        className="form-input"
                        type="text"
                        name="uniqueId"
                        autoComplete="off"
                        placeholder=""
                        defaultValue=""
                        onKeyUp={changePatientId}
                      />
                    </div>
                  </div>
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={patientidSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Fullname</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="fullname"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.personalDetails.fullname}
                    onKeyUp={changeForm}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.fullname.length > 0 &&
                  suggestion.fullname.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          personalDetails: {
                            ...collectdata.personalDetails,
                            fullname: vals.personalDetails.fullname,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          fullname: [],
                        });
                      }}
                    >
                      {vals.personalDetails.fullname}
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Father /Husband Name</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="fhName"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.personalDetails.fhName}
                    onKeyUp={changeForm}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.fhName.length > 0 &&
                  suggestion.fhName.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          personalDetails: {
                            ...collectdata.personalDetails,
                            fhName: vals.personalDetails.fhName,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          fhName: [],
                        });
                      }}
                    >
                      {vals.personalDetails.fhName}
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Referred By</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="referredBy"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.personalDetails.referredBy}
                    onKeyUp={changeForm}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.referredBy.length > 0 &&
                  suggestion.referredBy.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          personalDetails: {
                            ...collectdata.personalDetails,
                            referredBy: vals.personalDetails.referredBy,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          referredBy: [],
                        });
                      }}
                    >
                      {vals.personalDetails.referredBy}
                    </div>
                  ))}
              </div>
            </div>
            <div className="">
              <div className="form-item">
                <label className="form-label">Date Of Birth</label>
                <div className="">
                  <input
                    className="form-input"
                    type="date"
                    name="userName"
                    autoComplete="off"
                    placeholder=""
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Phone</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="phone"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.personalDetails.phone}
                    onKeyUp={changeForm}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.phone.length > 0 &&
                  suggestion.phone.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          personalDetails: {
                            ...collectdata.personalDetails,
                            phone: vals.personalDetails.phone,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          phone: [],
                        });
                      }}
                    >
                      {vals.personalDetails.phone}
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Email</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="email"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.personalDetails.email}
                    onKeyUp={changeForm}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.email.length > 0 &&
                  suggestion.email.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          personalDetails: {
                            ...collectdata.personalDetails,
                            email: vals.personalDetails.email,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          email: [],
                        });
                      }}
                    >
                      {vals.personalDetails.email}
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Occupation</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="occupation"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.personalDetails.occupation}
                    onKeyUp={changeForm}
                    onChange={changeForm}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.occupation.length > 0 &&
                  suggestion.occupation.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          personalDetails: {
                            ...collectdata.personalDetails,
                            occupation: vals.personalDetails.occupation,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          occupation: [],
                        });
                      }}
                    >
                      {vals.personalDetails.occupation}
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Chief Complaint</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="userName"
                    autoComplete="off"
                    placeholder=""
                    disabled={true}
                    defaultValue={""}
                    // onKeyUp={changeForm}
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="form-item">
                <label className="form-label">Area</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="city"
                    autoComplete="off"
                    placeholder=""
                    value={collectdata.residentailAddress.city}
                    onKeyUp={changeForm1}
                    onChange={changeForm1}
                  />
                </div>
              </div>
              <div className="absolute z-10 bg-white top-16 shadow-lg w-full">
                {suggestion.area.length > 0 &&
                  suggestion.area.map((vals, k) => (
                    <div
                      className="border-b border-gray-400 py-2 px-2 hover:cursor-pointer"
                      onClick={(e) => {
                        setcollectdata({
                          ...collectdata,
                          residentailAddress: {
                            ...collectdata.residentailAddress,
                            city: vals.residentailAddress.city,
                          },
                        });
                        setsuggestion({
                          ...suggestion,
                          area: [],
                        });
                      }}
                    >
                      {vals.residentailAddress.city}
                    </div>
                  ))}
              </div>
            </div>
            <div className="">
              <div className="form-item">
                <label className="form-label">Year</label>
                <div className="">
                  <select className="form-input" disabled={true}></select>
                </div>
              </div>
            </div>
            <div className="">
              <div className="form-item">
                <label className="form-label">From Date</label>
                <div className="">
                  <input
                    className="form-input"
                    type="date"
                    name="fromDate"
                    autoComplete="off"
                    defaultValue={collectdata.other.fromDate}
                    onChange={changeForm2}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="form-item">
                <label className="form-label">To Date</label>
                <div className="">
                  <input
                    className="form-input"
                    type="date"
                    name="toDate"
                    autoComplete="off"
                    defaultValue={collectdata.other.toDate}
                    onChange={changeForm2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
type suggestListProps = {
  data: suggestDataProps;
  closeTable: Function;
};
const SuggestList = (props: suggestListProps) => {
  const [patientdata, setpatientdata] = useState(props.data);

  useEffect(() => {
    patientdata;
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
      //   setshow(false);
      props.closeTable();
    }
  };
  const handleClickOutside = (event: any) => {
    if (ref.current) {
      //   console.log("outside");
      props.closeTable();
    }
  };
  function isEven(num: number) {
    return num % 2 === 0;
  }
  const filterFirst = patientdata.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.uniqueId === item.uniqueId)
  );
  return (
    <>
      <div className="fixed overflow-auto inset-0 z-[1050] bg-black/50">
        <div className="mx-[5%]">
          <div ref={ref} className="card">
            <div className="card-header">Show Search Results</div>
            <div className="card-body p-0">
              <table className="table-default w-full">
                <thead>
                  <tr className="bg-white text-gray-500 text-justify rounded-sm">
                    <th className="p-1.5 text-center text-gray-600">
                      Patient.No{" "}
                    </th>
                    <th className="p-1.5 text-center text-gray-600">
                      Patient Name{" "}
                    </th>
                    <th className="p-1.5 text-center text-gray-600">Phone</th>
                    <th className="p-1.5 text-center text-gray-600">Sex</th>
                    <th className="p-1.5 text-center text-gray-600">City</th>
                    <th className="p-1.5 text-center text-gray-600">
                      Referred By{" "}
                    </th>
                    <th className="p-1.5 text-center text-gray-600">
                      Chief Complaint
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patientdata !== undefined &&
                    filterFirst.map((dd, k) => (
                      <tr
                        className={`${
                          isEven(k) ? "bg-gray-100" : "bg-white"
                        } text-gray-400 text-justify rounded-sm hover:cursor-pointer`}
                      >
                        <td className="p-1.5 text-center text-blue-600">
                          <Link href={"/patient/consultation/" + dd.uniqueId}>
                            {dd.uniqueId}
                          </Link>
                        </td>
                        <td className="p-1.5 text-center text-blue-600">
                          <Link href={"/patient/consultation/" + dd.uniqueId}>
                            {dd.personalDetails.fullname}
                          </Link>
                        </td>
                        <td className="p-1.5 text-center text-blue-600">
                          <Link href={"/patient/consultation/" + dd.uniqueId}>
                            {dd.personalDetails.phone}
                          </Link>
                        </td>
                        <td className="p-1.5 text-center text-blue-600">
                          <Link href={"/patient/consultation/" + dd.uniqueId}>
                            {dd.personalDetails.gender}
                          </Link>
                        </td>
                        <td className="p-1.5 text-center text-blue-600">
                          <Link href={"/patient/consultation/" + dd.uniqueId}>
                            {dd.residentailAddress.city}
                          </Link>
                        </td>
                        <td className="p-1.5 text-center text-blue-600">
                          <Link href={"/patient/consultation/" + dd.uniqueId}>
                            {dd.personalDetails.referredBy}{" "}
                          </Link>
                        </td>
                        <td className="p-1.5 text-center text-blue-600">
                          <Link
                            href={"/patient/consultation/" + dd.uniqueId}
                          ></Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
