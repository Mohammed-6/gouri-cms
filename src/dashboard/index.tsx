import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
const Dashboard = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};
type dashboardProps = {
  greeting: string;
  fullname: string;
};
import { clinicUserDataProps } from "../types/layout";
const Details = () => {
  const [data, setdata] = useState<dashboardProps>({
    greeting: "",
    fullname: "",
  });
  useEffect(() => {
    const udata: clinicUserDataProps = JSON.parse(
      localStorage.getItem("clinicUserData")!
    );
    let greet: string = "";
    const date = new Date();
    let hour = date.getHours();
    if (hour > 1) {
      greet = "Morning";
    }
    if (hour > 11) {
      greet = "Afternoon";
    }
    if (hour > 16) {
      greet = "Evening";
    }

    setdata({ ...data, greeting: greet, fullname: udata.fullname });
  }, []);
  return (
    <>
      <div className="">
        <div className="container mx-auto">
          <div className="pl-0"></div>
          <div className="">
            <div className="rounded-sm">
              <div className="pointer-events-none hidden"></div>
              <div className="bg-white py-6 px-2 shadow-lg rounded-lg">
                <h1 className="text-slate-800 text-lg capitalize font-bold">
                  Good {data.greeting}!, {data.fullname}. 👋
                </h1>
                <p>Here is what’s happening with your projects today:</p>
              </div>
              <div className="bg-white py-6 my-3 px-2 shadow-lg rounded-lg">
                <h1 className="text-slate-800 text-lg font-bold">
                  More Coming Soon...
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
