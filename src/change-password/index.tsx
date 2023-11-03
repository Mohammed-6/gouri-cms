import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
import { Preloader, Toaster } from "../data/stuff";
import { changePasswordProps } from "../types/change-password";
import { changePassword } from "../query/change-password";
const ChangePassword = () => {
  return (
    <>
      <Layout>
        <div className="container mx-auto max-w-lg">
          <Details />
        </div>
      </Layout>
    </>
  );
};

const Details = () => {
  const [showtoaster, setshowtoaster] = useState(false);
  const [loading, setloading] = useState(false);
  const [toasterdata, settoasterdata] = useState({ type: "", message: "" });
  const [collectdata, setcollectdata] = useState<changePasswordProps>({
    password: "",
    cpassword: "",
    clinicId: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setcollectdata({
        ...collectdata,
        clinicId: window.localStorage.getItem("clinicId"),
      });
    }
  }, []);

  const formChange1 = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({
      ...collectdata,
      [event.name]: event.value,
    });
  };

  const formSubmit = async () => {
    setloading(true);
    if (collectdata.password == "" && collectdata.cpassword == "") {
      settoasterdata({ type: "error", message: "Both fields are required." });
      showToaster();
      setloading(false);
      return;
    } else if (collectdata.password.length < 6) {
      settoasterdata({
        type: "error",
        message: "Password must be at least 6 characters long.",
      });
      showToaster();
      setloading(false);
      return;
    } else if (collectdata.password !== collectdata.cpassword) {
      settoasterdata({
        type: "error",
        message: "Both password doesn't match.",
      });
      showToaster();
      setloading(false);
      return;
    }
    const colte = {
      ...collectdata,
      clinicId: localStorage.getItem("clinicId"),
      clinicUser: localStorage.getItem("clinicUser"),
    };
    changePassword(collectdata).then((response) => {
      settoasterdata(response.data);
      showToaster();
      setloading(false);
    });
  };

  const showToaster = () => {
    setshowtoaster(!showtoaster);
    setTimeout(() => {
      setshowtoaster(false);
    }, 3000);
  };

  return (
    <>
      {loading ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="card relative z-10 max-w-lg">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="">Change Password</div>
            <div className=""></div>
          </div>
        </div>
        <div className="card-body">
          <div className="container mx-auto mt-3 px-0">
            <div className="flex flex-col">
              <div className="">
                <div className="form-item">
                  <label className="form-label">Password</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="password"
                      name="password"
                      placeholder=""
                      onKeyUp={(e) => formChange1(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="form-item">
                  <label className="form-label">Confirm Password</label>
                  <div className="">
                    <input
                      className="form-input"
                      type="password"
                      name="cpassword"
                      placeholder=""
                      onKeyUp={(e) => formChange1(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={formSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
