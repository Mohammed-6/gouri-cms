import React, { useState, useEffect } from "react";
import {
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { deleteProps, toaster } from "../types/basic";

// export const Breadcrumb = (props) => {
//   return (
//     <>
//       <div className="py-2">
//         <div className="flex justify-start relative">
//           <div className="block">
//             <ul className="list-none m-0 p-0 flex justify-center">
//               {props.alldata.subtitle.map((dd, k) => {
//                 return (
//                   <>
//                     {k === 0 ? (
//                       <li>
//                         <div className="text-gray-500 font-bold">
//                           <Link href={dd.link}>{dd.title}</Link>
//                         </div>
//                       </li>
//                     ) : (
//                       <li>
//                         <div
//                           className={`flex ${
//                             k + 1 === props.alldata.subtitle.length
//                               ? "text-gray-500"
//                               : "text-gray-500"
//                           } items-center  font-bold`}
//                         >
//                           <span className="">
//                             <ChevronRightIcon
//                               className={`w-3 fill-gray-500 mx-2`}
//                             />
//                           </span>
//                           <Link href={dd.link}>{dd.title}</Link>
//                         </div>
//                       </li>
//                     )}
//                   </>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export const Toaster = (props: toaster) => {
  const propsdata = props;
  const [showtoaster, setshowtoaster] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      // setshowtoaster(false);
    }, 3000);
  }, []);
  return (
    <>
      <div
        className={`fixed right-10 top-10 ${showtoaster ? "block" : "hidden"}`}
      >
        <div
          className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div
            className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8  ${
              propsdata.type == "success"
                ? "bg-green-700 text-green-100"
                : propsdata.type == "error"
                ? "bg-red-500 text-red-100"
                : propsdata.type == "info"
                ? "bg-orange-500 text-orange-100"
                : "bg-orange-500 text-orange-100"
            } rounded-lg`}
          >
            {propsdata.type == "success" ? (
              <CheckIcon className="w-6" />
            ) : propsdata.type == "info" ? (
              <ExclamationTriangleIcon className="w-6" />
            ) : propsdata.type == "error" ? (
              <XMarkIcon className="w-6" />
            ) : (
              <XMarkIcon className="w-6" />
            )}
          </div>
          <div className="ml-3 text-sm font-semibold w-52 block">
            {propsdata.message}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => setshowtoaster(false)}
          >
            <XMarkIcon className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export const Preloader = () => {
  return (
    <>
      <div className="bg-gray-200/50 fixed inset-0 z-50 flex justify-center items-center">
        <div className="bg-white p-10 shadow-md rounded-xl relative">
          <svg
            className="w-12 h-12 animate-spin text-indigo-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.75V6.25"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M17.1266 6.87347L16.0659 7.93413"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19.25 12L17.75 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M17.1266 17.1265L16.0659 16.0659"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 17.75V19.25"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7.9342 16.0659L6.87354 17.1265"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6.25 12L4.75 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7.9342 7.93413L6.87354 6.87347"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export const calculateAge = (dob: string) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const AlertAction = (props: deleteProps) => {
  return (
    <>
      <main className="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
        <div className="fixed inset-0 z-50 px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-black/50 opacity-15 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex items-center">
              <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <ExclamationTriangleIcon className="w-8" />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">{props.heading}</p>
                <p className="text-sm text-gray-700 mt-1">{props.paragraph}</p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                onClick={() => props.successAction()}
              >
                {props.successButtonText}
              </button>
              <button
                onClick={() => props.cancelAction()}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const serverHeader = {
  "Content-Type": "application/json",
};

export const serverURL = "https://cos-api.exllab.in";
// export const serverURL = "http://localhost:4002";
