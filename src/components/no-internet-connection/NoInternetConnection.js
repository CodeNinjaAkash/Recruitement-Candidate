import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigatorOnLine } from "../../hooks/navigatorOnline";
import Header from "../common/header/Header";
import { getCurrentPath } from "../../Services/Localstorage";

function NoInternetConnection() {
  const navigate = useNavigate();
  const isOnline = useNavigatorOnLine();

  useEffect(() => {
    if (isOnline && getCurrentPath())
      navigate(`${getCurrentPath()}`);
  });

  return (
    <>
      <Header />
      <div className="noInternet container">
        <div className="shadow bg-white px-5 py-14 text-center my-12 mx-auto max-w-[700px] rounded-2xl">
          <div className="w-[100px] h-[100px] flex mx-auto bg-red-100 rounded-full items-center justify-center text-black mb-5 border border-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path d="M44.85 21.7q-4.4-4.2-9.625-6.7T24 12.5q-1.85 0-3.55.225-1.7.225-2.85.625L13.95 9.7q2.2-.8 4.775-1.25Q21.3 8 24 8q7 0 13.175 2.9Q43.35 13.8 48 18.55Zm-8.45 8.45q-1.65-1.6-3-2.575-1.35-.975-3.45-1.925L24.3 20q4.75.1 8.375 1.95Q36.3 23.8 39.55 27Zm3.85 14.4-19.7-19.7q-2.7.65-4.975 2.1-2.275 1.45-3.975 3.2L8.45 27q1.85-1.85 3.825-3.25T17 21.25l-5.55-5.55Q9.1 16.85 7 18.425 4.9 20 3.15 21.7L0 18.55q1.8-1.85 3.85-3.45t4.2-2.75l-4.6-4.6L5.6 5.6l36.8 36.8Zm-16.25-2-7.4-7.45q1.45-1.45 3.325-2.275Q21.8 32 24 32t4.075.825q1.875.825 3.325 2.275Z" />
            </svg>
          </div>
          <h1 className="text-red-600 text-[40px] font-[600]">
            No Internet Connection!
          </h1>
          <p className="text-[20px]">Please try again..</p>
        </div>
      </div>
    </>
  );
}

export default NoInternetConnection;
