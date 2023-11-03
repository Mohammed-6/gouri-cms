import React, { useState, useEffect } from "react";
import Layout from "../layout";

const Accounts = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  return (
    <>
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
                              placeholder=""
                              value=""
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
                              placeholder=""
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <button className="btn btn-primary">Submit</button>
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
                            Fees
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Paid
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Balance
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Payment Method
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Reason For Short Payment
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200"></tbody>
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

export default Accounts;
