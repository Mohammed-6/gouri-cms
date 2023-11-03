import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Search from "./search";
import { listDispensePatient } from "../query/patient";
import {
  listDispensePatientProps,
  listDispensePatientSingleProps,
} from "../types/patient";
import { useRouter } from "next/router";
import { Preloader } from "../data/stuff";

const Patient = () => {
  return (
    <>
      <Layout>
        <Search />
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const router = useRouter();
  const [tabledata, settabledata] = useState<listDispensePatientProps>([]);
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setloading(true);
    listDispensePatient().then((response) => {
      settabledata(response.data.data);
      setloading(false);
    });
  }, [router.isReady]);

  let filterFirst: listDispensePatientProps = [];
  if (tabledata !== undefined) {
    filterFirst = tabledata.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.patientId === item.patientId)
    );
  }

  const filterSecond = filterFirst.sort((a, b) => b.visitDate - a.visitDate);

  const filteredData = filterSecond.filter(
    (item: listDispensePatientSingleProps) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.followUp.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="card relative z-10">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Patient List</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <Link href="/patient/add">
                    <button className="btn btn-primary">Add Patient</button>
                  </Link>
                </div>
                <div className=""></div>
                <div className="">
                  <button className="btn btn-danger">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs">
                <label className="sr-only">Search</label>
                <input
                  type="text"
                  className="block w-full p-3 pl-10 text-sm border border-gray-700 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search..."
                  value=""
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
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Patient ID
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
                        Age
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        View / Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-gray-200">
                    {filteredData.map((dd, k) => (
                      <>
                        <tr className={`${k % 2 === 0 ? "bg-gray-100" : ""}`}>
                          <td className="px-6 py-2 text-sm text-blue-500 font-semibold whitespace-nowrap">
                            <Link
                              href={"/patient/consultation/" + dd.patientId}
                            >
                              {dd.patientId}
                            </Link>
                          </td>
                          <td className="px-6 py-2 text-sm text-blue-500 font-semibold whitespace-nowrap">
                            <Link
                              href={"/patient/consultation/" + dd.patientId}
                            >
                              {dd.fullname}
                            </Link>
                          </td>
                          <td className="px-6 py-2 text-sm text-blue-500 font-semibold whitespace-nowrap">
                            <Link
                              href={"/patient/consultation/" + dd.patientId}
                            >
                              {dd.age}
                            </Link>
                          </td>
                          <td className="px-6 py-2 text-sm text-blue-500 font-semibold whitespace-nowrap">
                            <Link
                              href={"/patient/consultation/" + dd.patientId}
                            >
                              {dd.phone}
                            </Link>
                          </td>
                          <td className="px-6 py-2 text-sm text-blue-500 font-semibold whitespace-nowrap">
                            <Link
                              href={"/patient/consultation/" + dd.patientId}
                            >
                              {dd.email}
                            </Link>
                          </td>
                          <td className="px-6 py-2 text-sm text-blue-500 font-semibold whitespace-nowrap">
                            <div className="flex gap-x-1 items-center">
                              <div>
                                <Link
                                  href={"/patient/consultation/" + dd.patientId}
                                >
                                  <EyeIcon className="w-4" />
                                </Link>
                              </div>
                              <div>
                                <Link href={"/patient/" + dd.editId}>
                                  <PencilSquareIcon className="w-4" />
                                </Link>
                              </div>
                              <div>
                                <span
                                  className="hover:cursor-pointer"
                                  //   onClick={() => deleteVisit(dd.visitId)}
                                >
                                  <TrashIcon className="w-4" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;
