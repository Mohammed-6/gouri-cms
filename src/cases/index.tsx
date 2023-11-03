import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { Preloader } from "../data/stuff";
import {
  arrDoctorList,
  arrSearchProps,
  searchParameterProps,
} from "../types/cases";
import { listDispensePatient } from "../query/cases";

const Cases = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [tabledata, settabledata] = useState(arrSearchProps);
  const [loading, setloading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [collectdata, setcollectdata] = useState<searchParameterProps>({
    fromDate: "",
    toDate: "",
    clinicId: localStorage.getItem("clinicId"),
  });
  const [doctorlist, setdoctorlist] = useState(arrDoctorList);

  const filteredData = tabledata.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.followUp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    const dateObject = new Date(event.value);
    const datetemp = dateObject.getTime();
    setcollectdata({
      ...collectdata,
      [event.name]: Math.floor(datetemp / 1000),
    });
  };

  const formSubmit = async () => {
    setloading(true);
    listDispensePatient(collectdata).then((response) => {
      settabledata(response.data.data);
      setdoctorlist(response.data.dr);
      setloading(false);
    });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="card relative z-10">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">List</div>
            <div className=""></div>
          </div>
        </div>
        <div className="card-body">
          <div className="container mx-auto mt-10 px-0">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="flex justify-between">
                  <div className="py-3 pl-2">
                    <div className="relative max-w-xs">
                      <label className="sr-only">Search</label>
                      <input
                        type="text"
                        className="block w-full p-3 pl-10 text-sm border border-gray-700 rounded-md focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg
                          className="h-3.5 w-3.5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-between items-center gap-x-2">
                      <div className="">
                        <div className="form-item">
                          <label className="form-label">From Date</label>
                          <div className="">
                            <input
                              className="form-input"
                              type="date"
                              name="fromDate"
                              autoComplete="off"
                              placeholder=""
                              defaultValue={""}
                              onChange={(e) => formChange1(e)}
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
                              placeholder=""
                              defaultValue={""}
                              onChange={(e) => formChange1(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <label className="form-label opacity-0">:</label>
                        <button
                          className="btn btn-primary"
                          onClick={formSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-1.5 w-full inline-block align-middle">
                  <div className="overflow-hidden overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Patient Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Case Details
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Prescription
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Diagnosis
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Chief Complaint
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Follow Up Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            C. Dr.
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredData.map((dd) => {
                          var date = new Date(dd.visitDate * 1000);
                          const year = date.getFullYear();
                          const month = date.getMonth() + 1;
                          const day = date.getDate();
                          const hours = date.getHours();
                          const minutes = date.getMinutes();
                          const seconds = date.getSeconds();
                          return (
                            <>
                              <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                  {dd.patientId}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {day + "/" + month + "/" + year}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {dd.fullname}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {dd.phone}
                                </td>
                                <td
                                  width="20%"
                                  className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                                >
                                  <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                      __html: dd.consultation,
                                    }}
                                  />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                      __html: dd.prescription,
                                    }}
                                  />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                      __html: dd.recordOfInvestigation,
                                    }}
                                  />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {dd.mainComplaint}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {dd.followUp}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {doctorlist.map((dr) => {
                                    let temp = "";
                                    return (
                                      <>
                                        {dr._id == dd.doctorId
                                          ? dr.fullname
                                          : ""}
                                      </>
                                    );
                                  })}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Cases;
