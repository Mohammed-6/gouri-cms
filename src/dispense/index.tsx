import React, { useState, useEffect } from "react";
import Layout from "../layout";
import Link from "next/link";

import { Preloader } from "../data/stuff";

import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { listDispensePatient } from "../query/dispense";
import {
  arrBranchProps,
  arrlistDispensePatientProps,
  listDispensePatientProps,
} from "../types/dispense";
import { EyeIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

TimeAgo.addDefaultLocale(en);
const Dispense = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [tabledata, settabledata] = useState(arrlistDispensePatientProps);
  const [branch, setbranch] = useState(arrBranchProps);
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadDispensePatient();
  }, []);
  const loadDispensePatient = () => {
    setloading(true);

    listDispensePatient().then((response) => {
      settabledata(response.data.data);
      setbranch(response.data.branch[0]);
      setloading(false);
    });
  };
  const filterFirst = tabledata.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.patientId === item.patientId)
  );

  const filterSecond = tabledata.sort((a, b) => b.visitDate - a.visitDate);

  const filteredData = filterSecond.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.followUp.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div
        className="table-cell fixed bottom-4 right-4 w-10 h-10 bg-green-800 lg:hidden items-center rounded-full"
        onClick={loadDispensePatient}
      >
        <ArrowPathIcon className="w-10 p-1.5 fill-white stroke-white" />
      </div>
      <div className="card">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Dispense List</div>
            <div className=""></div>
          </div>
        </div>
        <div className="card-body">
          <div className="container mx-auto mt-10 px-0">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs">
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
            <div className="overflow-hidden overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Patient ID
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Clinic
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Sex
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Age
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Follow Up Date
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      View
                    </th>
                  </tr>
                </thead>
                {filteredData.map((dd) => (
                  <>
                    <tr
                      className={`${
                        dd.dispenseStatus == 0
                          ? "bg-blue-500 text-white"
                          : dd.dispenseStatus == 1
                          ? "bg-yellow-500 text-black"
                          : dd.editId !== ""
                          ? "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <td className="px-6 py-2 text-sm font-medium whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>
                          {dd.patientId}
                        </Link>
                      </td>
                      <td className="px-6 py-2 text-sm whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>
                          {dd.fullname}
                        </Link>
                      </td>
                      <td className="px-6 py-2 text-sm whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>
                          {branch.map((br) => {
                            let mbr = "";
                            if (br._id == dd.branch) {
                              mbr = br.branchName;
                            }
                            return <>{mbr}</>;
                          })}
                        </Link>
                      </td>
                      <td className="px-6 py-2 text-sm whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>
                          {dd.gender}
                        </Link>
                      </td>
                      <td className="px-6 py-2 text-sm whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>{dd.age}</Link>
                      </td>
                      <td className="px-6 py-2 text-sm whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>
                          {dd.followUp}
                          {dd.followUp != "" ? (
                            <>
                              <span className="font-bold">
                                &nbsp; (
                                <ReactTimeAgo
                                  date={(dd.followUp + " 00:00:00") as any}
                                  locale="en-US"
                                />
                                )
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </Link>
                      </td>
                      <td className="px-6 py-2 text-sm whitespace-nowrap">
                        <Link href={"/dispense/" + dd.visitId}>
                          <EyeIcon className="w-4" />
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dispense;
