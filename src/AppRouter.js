import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useNavigatorOnLine } from "./hooks/navigatorOnline";
import Registration from "./components/basic/Registration/Registration";
import StartTest from "./components/start-test/StartTest";
import Quiz from "./components/quiz/Quiz";
import Result from "./components/result/Result";
import NoInternetConnection from "./components/no-internet-connection/NoInternetConnection";
import Rejoin from "./components/rejoin/Rejoin";
import NotFound from "./components/404-page/NotFound";
import { storeCurrentPath } from "./Services/Localstorage";

function AppRouter() {
  const isOnline = useNavigatorOnLine();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOnline) {
      navigate("/no_internet");
    }
  }, [isOnline, navigate]);

  useEffect(() => {
    if (location.pathname !== "/no_internet") {
      storeCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/candidate/rejoin/:id/:token" element={<Rejoin />} />
        <Route exact path="/" element={<Registration />} />
        <Route path="/start_test" element={<StartTest />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/no_internet" element={<NoInternetConnection />} />
        <Route path="*" element={<NotFound status={404} />} />
      </Routes>
    </>
  );
}

export default AppRouter;
