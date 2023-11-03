import React, { useState, useEffect } from "react";
import Layout from "../layout/index";

import { toaster } from "../types/basic";
import { addEditUserProps } from "../types/su-user";
import {
  uploadSingle,
  createAdmin,
  updateAdmin,
  editAdmin,
} from "../query/su-admin";

import { Preloader, Toaster } from "../data/stuff";
import { useRouter } from "next/router";

const AddEdit = () => {
  return (
    <>
      <Layout>
        <Details />
      </Layout>
    </>
  );
};

const Details = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<addEditUserProps>({
    fullname: "",
    email: "",
    phone: "",
    loginUsername: "",
    loginPassword: "",
    profilePicture: "",
  });
  const [showpreloader, setshowpreloader] = useState<boolean>(false);
  const [showtoaster, setshowtoaster] = useState<boolean>(false);
  const [toasterdata, settoasterdata] = useState<toaster>({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (router.query.editid !== undefined && router.query.editid !== "") {
      editAdmin(router.query.editid as string).then((res) => {
        setcollectdata(res.data.data);
      });
    }
  }, [router.isReady]);

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [event.name]: event.value });
  };

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const event = e.target as HTMLInputElement;
    const file = e.target.files;
    if (!file) return;
    const formdata = new FormData();
    formdata.append("attachment", file[0]);
    const upload = uploadSingle(formdata);
    upload.then((res) =>
      setcollectdata({ ...collectdata, profilePicture: res.data.path })
    );
  };

  const submitForm = () => {
    setshowpreloader(true);
    if (
      collectdata.fullname === "" ||
      collectdata.email === "" ||
      collectdata.loginPassword === "" ||
      collectdata.loginUsername === "" ||
      collectdata.phone === ""
    ) {
      settoasterdata({ type: "info", message: "*Some fields are required" });
      setshowpreloader(false);
      setshowtoaster(true);
      setTimeout(() => {
        setshowtoaster(false);
      }, 3000);
      return;
    }

    if (router.query.editid !== undefined && router.query.editid !== "") {
      updateAdmin(collectdata).then((res) => {
        settoasterdata(res.data);
        router.push("/su-admin");
      });
      setshowpreloader(false);
    } else {
      createAdmin(collectdata).then((res) => {
        settoasterdata(res.data);
        router.push("/su-admin");
      });
      setshowpreloader(false);
    }
  };

  return (
    <>
      {showpreloader ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="">Admin Personal Details</div>
            <div className="">
              <a className="btn btn-primary" onClick={submitForm}>
                Submit
              </a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="p-1">
            <div className="grid grid-cols-4 gap-4">
              <div className="form-item">
                <label className="form-label mb-1">Fullname*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="fullname"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.fullname}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Login Username*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="loginUsername"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.loginUsername}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Login Password*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="password"
                    name="loginPassword"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.loginPassword}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Email Id*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="email"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.email}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">Phone*</label>
                <div className="">
                  <input
                    className="form-input"
                    type="text"
                    name="phone"
                    autoComplete="off"
                    placeholder=""
                    defaultValue={collectdata.phone}
                    onKeyUp={changeForm}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="form-label mb-1">
                  Profile Picture(150px*150px)
                </label>
                <div className="">
                  <input
                    className="form-input"
                    type="file"
                    name="profilePicture"
                    onChange={changeFile}
                  />
                </div>
              </div>
              <div></div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
