import logo from "./atharva-brand-logo-dark.png";
import "../common.css";

function Header() {
  return (
    <>
      <div className="body-bg">
        <div className="bg-full"></div>
        <div className="bg-ef bg-1"></div>
        <div className="bg-ef bg-2"></div>
        <div className="bg-ef bg-3"></div>
        <div className="bg-ef bg-4"></div>
      </div>
      <header className="main-header bg-white/20 border-b border-white py-2 md:py-4">
        <div className="container flex items-center justify-center">
          <div>
            <img
              className="max-h-[25px] md:max-h-[35px]"
              src={logo}
              alt="Atharva System"
            />
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
