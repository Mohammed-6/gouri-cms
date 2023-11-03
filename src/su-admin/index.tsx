import React, { useState, useEffect } from "react";
import Layout from "../layout/index";

import Link from "next/link";
import { deleteAdmin, listAdminUser } from "../query/su-admin";
import { userListProps } from "../types/su-user";
import { deleteProps } from "../types/basic";
import { AlertAction } from "../data/stuff";

const SuAdmin = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [userlist, setuserlist] = useState(userListProps);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteaction, setdeleteaction] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<string>("");
  const [deletedata, setdeletedata] = useState<deleteProps>({
    heading: "Delete clinic",
    paragraph:
      "You will lose all of your data by deleting your account. This action cannot be undone",
    type: "alert",
    successButtonText: "Delete Clinic",
    successAction: () => {},
    cancelAction: () => {},
  });
  useEffect(() => {
    listAdminUser().then((user) => {
      setuserlist(user.data.data.user);
    });
  }, []);

  const filteredData = userlist.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const cancelAction = () => {
    setdeleteaction(false);
  };
  const successAction = () => {
    deleteAdmin(deleteid).then((response) => {
      setuserlist(response.data.data.user);
      setdeleteaction(false);
    });
  };
  return (
    <>
      {deleteaction ? (
        <AlertAction
          heading={deletedata.heading}
          paragraph={deletedata.paragraph}
          type={deletedata.type}
          successButtonText={deletedata.successButtonText}
          cancelAction={cancelAction}
          successAction={successAction}
        />
      ) : (
        ""
      )}
      <div className="card relative z-10">
        <div className="card-header py-2">
          <div className="flex items-center justify-between">
            <div className="">Admin List</div>
            <div className="">
              <div className="flex gap-x-2">
                <div className="">
                  <Link href="/su-admin/add">
                    <button className="btn btn-primary">Add Super User</button>
                  </Link>
                </div>
                <div className=""></div>
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
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
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
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Full Name
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
                        ClinicId
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Edit / Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData !== undefined &&
                      filteredData.map((dd, k) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {k + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.fullname}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.phone}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {dd.clinicId}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <Link
                              className="btn btn-primary"
                              href={`/su-admin/edit/${dd.editId}`}
                            >
                              Edit
                            </Link>{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setdeleteid(dd.editId);
                                setdeleteaction(true);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
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

export default SuAdmin;
