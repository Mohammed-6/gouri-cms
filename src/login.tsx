import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { serverHeader, serverURL, Preloader } from "./data/stuff";

import { loginProps, branchProps } from "./types/login";
import { toaster } from "./types/basic";
import { loginOnLoad, checkLogin } from "./query/login";
const Login = () => {
  const router = useRouter();
  const clinicid = router.query.clinicid as string;
  const [collectdata, setcollectdata] = useState<loginProps>({
    loginUsername: "",
    loginPassword: "",
    clinicId: "",
  });
  const [getprofile, setprofile] = useState<string>("");
  const [selectbranch, setselectbranch] = useState<string>("");
  const [axiosbranch, setaxiosbranch] = useState(branchProps);
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });
  useEffect(() => {
    if (router.query && router.query.clinicid) {
      const preData = loginOnLoad(clinicid);
      preData.branch.then((res) => setaxiosbranch(res.data.data));
      preData.profile.then((res) => {
        if (
          res.data.profilePicture !== "" &&
          res.data.profilePicture !== undefined
        ) {
          setprofile(serverURL + "/" + res.data.profilePicture);
          localStorage.setItem("profilePicture", res.data.profilePicture);
        } else {
          setprofile("/images/logo.png");
        }
      });
    }
    setcollectdata({ ...collectdata, clinicId: clinicid });
  }, [router.isReady]);

  const firstData = (): void => {};
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    let event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeBranch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let event = e.target as HTMLSelectElement;
    setselectbranch(event.value);
  };

  const submitForm = () => {
    setshowpreloader(true);
    setshowtoaster(false);
    if (router.query.clinicid == "" || router.query.clinicid == undefined) {
      settoasterdata({
        type: "error",
        message: "URL error!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    } else if (selectbranch == "" && axiosbranch.length !== 0) {
      settoasterdata({
        type: "error",
        message: "Select Branch!",
      });
      setshowtoaster(true);
      setshowpreloader(false);
      return;
    }
    checkLogin(collectdata).then((response) => {
      if (response.data.type == "success") {
        localStorage.setItem("clinicId", clinicid);
        localStorage.setItem("clinicUser", response.data.data.id);
        localStorage.setItem("clinicBranch", selectbranch);
        localStorage.setItem(
          "clinicUserData",
          JSON.stringify(response.data.data)
        );
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
        router.push("/dashboard");
      } else {
        settoasterdata(response.data);
        setshowtoaster(true);
        setshowpreloader(false);
      }
    });
  };

  return (
    <>
      <div className="">
        {showpreloader ? <Preloader /> : ""}
        <main className="">
          <div className="h-full">
            <div className="container mx-auto flex justify-center min-w-0 h-full">
              <div className="card min-w-[320px] md:min-w-[450px] card-shadow">
                <div className="card-body md:p-10">
                  <div className="text-center">
                    <div className="logo w-auto">
                      <img
                        className="mx-auto w-[200px]"
                        src={getprofile}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 text-center">
                      <h3 className="mb-1 font-semibold text-2xl">Welcome!</h3>
                      <p>Please enter your credentials to sign in!</p>
                    </div>
                    <div>
                      <form action="#">
                        <div className="form-container">
                          <div className="form-item">
                            <label className="form-label mb-1">User Name</label>
                            <div className="">
                              <input
                                className="form-input"
                                type="text"
                                name="loginUsername"
                                autoComplete="off"
                                placeholder="User Name"
                                defaultValue={collectdata.loginUsername}
                                onChange={changeForm}
                              />
                            </div>
                          </div>
                          <div className="form-item">
                            <label className="form-label mb-1">Password</label>
                            <div className="">
                              <span className="input-wrapper ">
                                <input
                                  className="form-input"
                                  type="password"
                                  name="loginPassword"
                                  autoComplete="off"
                                  placeholder="Password"
                                  defaultValue={collectdata.loginPassword}
                                  onChange={changeForm}
                                />
                                <div className="input-suffix-end">
                                  <span className="cursor-pointer text-xl"></span>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="form-item">
                            <label className="form-label mb-1">Branch</label>
                            <div className="">
                              <span className="input-wrapper ">
                                <select
                                  className="form-input"
                                  name="branch"
                                  onChange={(e) => changeBranch(e)}
                                >
                                  <option value="">Select Branch</option>
                                  {axiosbranch.map((dd) => (
                                    <option value={dd._id}>
                                      {dd.branchName}
                                    </option>
                                  ))}
                                </select>
                              </span>
                            </div>
                          </div>
                          {showtoaster ? (
                            <div className="py-1">
                              <div
                                className={`${
                                  toasterdata.type === "error" ||
                                  toasterdata.type === "info"
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                } px-3 py-2 text-white text-md rounded-md`}
                              >
                                {toasterdata.message}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="py-3 text-center">
                            <a
                              onClick={submitForm}
                              className="w-full btn"
                              type="button"
                            >
                              Sign In
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
