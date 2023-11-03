import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
const create = axios.create();
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { userDetails } from "../login";

import { FaBars, FaTimes } from "react-icons/fa";

import { serverURL } from "../data/stuff";
import {
  clinicUserDataProps,
  permissionsProps,
  permissionProps,
} from "../types/layout";
const allData = [
  {
    name: "User",
    link: "/user",
    menu: [],
  },
  {
    name: "Patient",
    link: "/patient",
    menu: [],
  },
  {
    name: "Dispense",
    link: "/dispense",
    menu: [],
  },
  {
    name: "Case History",
    link: "/cases",
    menu: [],
  },
  {
    name: "Follow Up",
    link: "/followups",
    menu: [],
  },
  {
    name: "Accounts",
    link: "/accounts",
    menu: [],
  },
  {
    name: "Messages",
    link: "/message",
    menu: [],
  },
  {
    name: "Change Password",
    link: "/change-password",
    menu: [],
  },
  //   {
  //     name: "Customers",
  //     link: "/admin/customer",
  //     menu: [
  //       {
  //         name: "Add Customer",
  //         link: "/admin/customer/add-customer",
  //       },
  //     ],
  //   },
];

const DeskMenu = () => {
  const router = useRouter();
  // const [menudata, setmenudata] = useAtom(userDetails);
  const [loading, setloading] = useState(false);
  const [menudata, setmenudata] = useState<clinicUserDataProps>({
    email: "",
    fullname: "",
    id: "",
    permissions: [],
    phone: "",
    username: "",
  });
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (localStorage.getItem("clinicUser") == "") {
        router.push("/login/" + localStorage.getItem("clinicId"));
        return;
      }
      const udata: clinicUserDataProps = JSON.parse(
        localStorage.getItem("clinicUserData")!
      );
      setmenudata(udata);
      setloading(true);
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full px-[10px]">
          {menudata !== undefined &&
            menudata.permissions.length !== 0 &&
            menudata.permissions.map((data, k) => {
              return (
                <>
                  {data.permissions.view ? (
                    <MainMenu key={k} menu={data} />
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

type mainMenuProps = {
  menu: permissionsProps;
};

const MainMenu = (props: mainMenuProps) => {
  const router = useRouter();
  // console.log(router.pathname);
  const data = props.menu;
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <div
        className={`relative group border-opacity-0 hover:border-opacity-100 transistion duration-300 inline-block py-3 pb-2 xl:px-3 lg:px-[7px] text-slate-900 font-semibold text-center hover:cursor-pointer ${
          router.pathname == "/" + data.page ? "border-b-4" : "border-b-0"
        }`}
        onMouseEnter={() => setMenuToggle(!menuToggle)}
        onMouseLeave={() => setMenuToggle(!menuToggle)}
      >
        <div className="flex items-center">
          <span className="menu-icon">{data.icon}</span>
          <a
            className={`text-md xl:text-md lg:text-sm text-black transistion duration-300 group-hover:text-primary ${
              router.pathname == "/" + data.page ? "text-primary" : ""
            }`}
          >
            <Link href={"/" + data.page}>{data.name}</Link>
          </a>
        </div>
      </div>
    </>
  );
};
const Sidebar = () => {
  const [show, setshow] = useState(false);
  const [menu, setmenu] = useState<clinicUserDataProps>({
    email: "",
    fullname: "",
    id: "",
    permissions: [],
    phone: "",
    username: "",
  });
  const [loading, setloading] = useState(false);
  const [getprofile, setprofile] = useState("/images/logo.png");
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setmenu(JSON.parse(localStorage.getItem("clinicUserData")!));
      setloading(true);
      // set profile
      if (
        localStorage.getItem("profilePicture") !== "" &&
        localStorage.getItem("profilePicture") !== undefined
      ) {
        setprofile(serverURL + "/" + localStorage.getItem("profilePicture"));
      }
    }
    // document.addEventListener("keydown", handleHideDropdown, true);
    // document.addEventListener("click", handleClickOutside, true);

    // return () => {
    //   document.removeEventListener("keydown", handleHideDropdown, true);
    //   document.removeEventListener("click", handleClickOutside, true);
    // };
  }, []);

  const ref = useRef(null);
  //   const handleHideDropdown = (event) => {
  //     if (event.key === "Escape") {
  //       //   console.log("escape");
  //       setshow(false);
  //     }
  //   };
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       //   console.log("outside");
  //       setshow(false);
  //     }
  //   };
  const outSideClick = () => {
    setshow(true);
  };
  return (
    <>
      <FaBars fill="black" onClick={outSideClick} className="text-xl" />
      <div
        className={`fixed inset-0 z-20 h-full w-[300px] sm:w-[450px] ease-in-out duration-300 bg-white shadow-lg ${
          show ? "translate-x-[0px]" : "-translate-x-full"
        }`}
      >
        <div className="">
          <div
            ref={ref}
            className="w-[300px] sm:w-[400px] relative h-auto py-[20px] px-[3%] "
          >
            <Image
              src={getprofile}
              className="h-[55px] w-auto mb-5"
              alt=""
              width="55"
              height="55"
            />
            {show ? (
              <div className="absolute -right-12 top-6 z-[20]">
                <div
                  className="text-white py-2 px-3 bg-red-500 rounded-md"
                  onClick={() => setshow(false)}
                >
                  <FaTimes className="h-6" />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="block">
              {loading &&
                menu.permissions.length !== 0 &&
                menu.permissions.map((data) => {
                  return (
                    <>
                      {data.permissions.view ? (
                        <div className="py-3">
                          <span className="text-black font-semibold text-lg">
                            <Link href={"/" + data.page}>{data.name}</Link>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Header = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [showsupport, setshowsupport] = useState(false);
  const [menudata, setmenudata] = useState<clinicUserDataProps>({
    email: "",
    fullname: "",
    id: "",
    permissions: [],
    phone: "",
    username: "",
  });
  const [getprofile, setprofile] = useState("/images/logo.png");
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (localStorage.getItem("clinicUser") == "") {
        router.push("/login/" + localStorage.getItem("clinicId"));
        return;
      }
      setmenudata(JSON.parse(localStorage.getItem("clinicUserData")!));
      setloading(true);
      // set profile
      if (
        localStorage.getItem("profilePicture") !== "" &&
        localStorage.getItem("profilePicture") !== undefined
      ) {
        setprofile(serverURL + "/" + localStorage.getItem("profilePicture"));
      }
    }
  }, []);

  useEffect(() => {}, []);
  const logout = () => {
    router.push("/login/" + localStorage.getItem("clinicId"));
    localStorage.setItem("clinicUser", "");
    localStorage.setItem("clinicUserData", "");
  };
  return (
    <>
      <div>
        <div className="lg:bg-gradient-to-r lg:from-primary lg:to-secondary bg-white shadow-lg flex justify-between py-4 px-3 items-center">
          <div className="">
            <div className="md:hidden lg:flex hidden">
              <Image
                src={getprofile}
                className="h-[55px] w-auto"
                alt=""
                width="55"
                height="55"
              />
            </div>
            <div className="md:flex lg:hidden">
              <Sidebar />
            </div>
          </div>
          <div className="">
            <div className="lg:hidden md:flex">
              <Image
                src={getprofile}
                className="h-[55px] w-auto"
                alt=""
                width="55"
                height="55"
              />
            </div>

            <div className="hidden lg:flex">
              <DeskMenu />
            </div>
          </div>
          <div className="relative">
            <div className="header-action-item flex items-center gap-2">
              <span
                className="avatar avatar-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  minWidth: "32px",
                  lineHeight: "32px",
                  fontSize: "12px",
                }}
              >
                <img
                  className="avatar-img rounded-full"
                  src={getprofile}
                  loading="lazy"
                />
              </span>
              <div className="hidden md:block text-black">
                {loading ? (
                  <>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => setshowsupport(!showsupport)}
                    >
                      <div className="text-xs capitalize">
                        {menudata.username}
                      </div>
                      <div className="font-bold">{menudata.fullname}</div>
                    </div>
                    {showsupport ? (
                      <div className="absolute top-10 right-0 w-[200px] z-20">
                        <ul className="bg-white shadow-lg p-2 rounded-md">
                          <li className="py-1 hover:cursor-pointer">
                            {/* <Link href="/support">Support</Link> */}
                          </li>
                          <li className="border-t py-1 hover:cursor-pointer">
                            <a onClick={() => logout()}>Logout</a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
