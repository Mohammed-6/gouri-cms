import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { Preloader } from "../data/stuff";

import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";

import exportFromJSON from "export-from-json";
import { listFollowUpsCases } from "../query/followups";
import { arrSearchProps, searchProps } from "../types/followups";

const Followups = () => {
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [collectdata, setcollectdata] = useState({
    fromDate: "",
    toDate: "",
    clinicId: localStorage.getItem("clinicId"),
  });

  useEffect(() => {
    setloading(true);
    listFollowUpsCases(collectdata).then((response) => {
      settabledata(response.data.data);
      setloading(false);
    });
  }, []);

  const filteredData = tabledata.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.followUp.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function randomString(length: number) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  function removeTags(str: any) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  const exportExcel = () => {
    const data = filteredData;
    data.map((dd, k) => {
      var date = new Date(dd.visitDate * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const vdate = day + "-" + month + "-" + year;

      var fdate = new Date(dd.followUp);
      const ffdate =
        String(fdate.getDate()).padStart(2, "0") +
        "-" +
        String(fdate.getMonth() + 1).padStart(2, "0") +
        "-" +
        fdate.getFullYear();

      // data[k].visitDate = vdate;
      // data[k].followUp = ffdate;

      const ndata = {
        visitId: dd.visitId,
        visitDate: vdate,
        followUp: ffdate,
        fullname: dd.fullname,
        age: dd.age,
        phone: dd.phone,
        email: dd.email,
      };
      data[k] = ndata as searchProps;
      // data[k].consultation = removeTags(dd.consultation);
      // data[k].prescription = dd.prescription.replace(/(<([^>]+)>)/gi, "");
      // data[k].recordOfInvestigation = removeTags(dd.recordOfInvestigation);
    });
    // console.log(mdata);
    const fileName = randomString(7);
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };

  const formChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      [event.name]: event.value,
    });
  };

  const formSubmit = async () => {
    setloading(true);
    listFollowUpsCases(collectdata).then((response) => {
      settabledata(response.data.data);
      setloading(false);
    });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="relative">
        <div className="container mx-auto">
          <div className="pl-2"></div>
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
                      <div className="py-3 pl-2 flex gap-x-3 items-center">
                        <div className="relative max-w-xs">
                          <label htmlFor="hs-table-search" className="sr-only">
                            Search
                          </label>
                          <input
                            type="text"
                            name="hs-table-search"
                            id="hs-table-search"
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
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="">
                          <button
                            className="btn btn-success"
                            onClick={exportExcel}
                          >
                            Export
                          </button>
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
                      <div className="overflow-hidden border rounded-lg">
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
                                Follow Up Date
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
                                Chief Complaint
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filteredData.map((dd) => {
                              var todayDate = new Date();
                              const tday = todayDate.getDate();
                              var date = new Date(dd.visitDate * 1000);
                              const year = date.getFullYear();
                              const month = date.getMonth() + 1;
                              const day = date.getDate();
                              var fdate = new Date(dd.followUp);
                              return (
                                <>
                                  <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {dd.patientId}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                      {day + "-" + month + "-" + year}
                                    </td>
                                    <td
                                      className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap`}
                                    >
                                      {String(fdate.getDate()).padStart(
                                        2,
                                        "0"
                                      ) +
                                        "-" +
                                        String(fdate.getMonth() + 1).padStart(
                                          2,
                                          "0"
                                        ) +
                                        "-" +
                                        fdate.getFullYear()}
                                      {dd.followUp != "" ? (
                                        <>
                                          <span className="font-bold">
                                            &nbsp; (
                                            <ReactTimeAgo
                                              date={
                                                (dd.followUp +
                                                  " 00:00:00") as any
                                              }
                                              locale="en-US"
                                            />
                                            )
                                          </span>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                      {dd.fullname}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                      {dd.phone}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
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
                                      {dd.mainComplaint}
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
        </div>
      </div>
    </>
  );
};

export default Followups;
