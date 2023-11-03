import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  getUserType,
  listUsers,
  updateUserType,
} from "../query/user-permission";
import { Preloader, Toaster } from "../data/stuff";
import { arrUsertypeProps } from "../types/user";
import {
  updateUserTpeParamsProps,
  userPermissionListProps,
} from "../types/change-password";

const UserPermission = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const [showsearch, setshowsearch] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [usertype, setusertype] = useState(arrUsertypeProps);
  const [loading, setloading] = useState(false);
  const [showtoaster, setshowtoaster] = useState(false);
  const [toasterdata, settoasterdata] = useState({ type: "", message: "" });
  const [deleteaction, setdeleteaction] = useState(false);
  const [deleteid, setdeleteid] = useState("");
  const [deletedata, setdeletedata] = useState({
    heading: "Delete you user",
    paragraph:
      "Are you sure you want to delete this user. This action cannot be undone",
    type: "alert",
    successButtonText: "Delete User",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setpages] = useState([
    { name: "SU Admin", page: "su-admin", permissions: { view: false } },
    { name: "User", page: "user", permissions: { view: false } },
    { name: "Patient", page: "patient", permissions: { view: false } },
    { name: "Dispense", page: "dispense", permissions: { view: false } },
    { name: "Cases", page: "cases", permissions: { view: false } },
    { name: "Follow Ups", page: "followups", permissions: { view: false } },
    { name: "Accounts", page: "accounts", permissions: { view: false } },
    { name: "Messages", page: "message", permissions: { view: false } },
    {
      name: "Change Password",
      page: "change-password",
      permissions: { view: false },
    },
  ]);
  const [currentid, setcurrentid] = useState("");
  const breaddata = {
    subtitle: [
      { title: "Dashboard", link: "/" },
      { title: "User Permission", link: "/user-permission" },
    ],
  };

  useEffect(() => {
    setloading(true);
    listUsers().then((response) => {
      settabledata(response.data.data.user);
      setusertype(response.data.data.usertype);
      setloading(false);
    });
    pages;
  }, []);
  const formChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setloading(true);
    if (currentid === "") {
      settoasterdata({ type: "error", message: "Select User Type" });
      showToaster();
      setloading(false);
      return;
    }
    let updatedList: userPermissionListProps = pages.map((item, i) => {
      if (index == i) {
        return {
          name: item.name,
          page: item.page,
          permissions: { ...item.permissions, view: e.target.checked },
        };
      } else {
        return item;
      }
    });
    let newArr = [...pages];
    newArr[index] = updatedList as any;
    setpages(updatedList);
    // send request
    const data = {
      clinicId: localStorage.getItem("clinicId"),
      id: currentid,
      permissions: updatedList,
    };
    updateUserType(data as updateUserTpeParamsProps).then((response) => {
      settoasterdata(response.data);
      showToaster();
      setloading(false);
    });
  };
  const changeUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setpages([
      { name: "SU Admin", page: "su-admin", permissions: { view: false } },
      { name: "User", page: "user", permissions: { view: false } },
      { name: "Patient", page: "patient", permissions: { view: false } },
      { name: "Dispense", page: "dispense", permissions: { view: false } },
      { name: "Cases", page: "cases", permissions: { view: false } },
      { name: "Follow Ups", page: "followups", permissions: { view: false } },
      { name: "Accounts", page: "accounts", permissions: { view: false } },
      { name: "Messages", page: "message", permissions: { view: false } },
      {
        name: "Change Password",
        page: "change-password",
        permissions: { view: false },
      },
    ]);
    setcurrentid(e.target.value);
    setloading(true);
    getUserType(e.target.value as string).then((response) => {
      if (response.data.data.permissions.length !== 0) {
        setpages(response.data.data.permissions);
      }

      settoasterdata(response.data);
      showToaster();
      setloading(false);
    });
  };
  const showToaster = () => {
    setshowtoaster(!showtoaster);
    setTimeout(() => {
      setshowtoaster(false);
    }, 2000);
  };
  return (
    <>
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      {loading ? <Preloader /> : ""}
      <div className="relative">
        <div className="container mx-auto">
          <div className="card relative z-10">
            <div className="card-header py-2">
              <div className="flex items-center justify-between">
                <div className="">Set User Permission</div>
                <div className=""></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="max-w-sm p-1.5">
                  <div className="form-item">
                    <label className="form-label mb-1">User Type</label>
                    <div className="">
                      <select
                        name="userType"
                        className="form-input"
                        onChange={(e) => changeUserType(e)}
                      >
                        <option value="">Select</option>
                        {usertype !== undefined &&
                          usertype.map((type, i) => (
                            <option value={type._id}>{type.userType}</option>
                          ))}
                      </select>
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
                            #
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Page
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            View
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            .
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            .
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pages.map((dd, k) => (
                          <>
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {k + 1}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {dd.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  name={dd.page}
                                  className=""
                                  checked={dd.permissions.view}
                                  onChange={(e) => formChange(k, e)}
                                />
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                -
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                -
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
        </div>
      </div>
    </>
  );
};

export default UserPermission;
