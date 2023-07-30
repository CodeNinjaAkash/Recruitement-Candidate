function NotFound(props) {
  return (
    <>
      <div className="noInternet container">
        <div className="shadow bg-white px-5 py-14 text-center my-12 mx-auto max-w-[700px] rounded-2xl">
          <div className="w-[100px] h-[100px] flex mx-auto bg-red-100 rounded-full items-center justify-center text-black mb-5 border border-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path d="M2 42 24 4l22 38Zm5.2-3h33.6L24 10Zm17-2.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Zm1.3-6.1Z" />
            </svg>
          </div>
          <div className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1] font-[800] text-black mb-3">
            {props.status}
          </div>
          <h4 className="text-red-600 text-[40px] font-[600]">
            Page Not Found please check
          </h4>
        </div>
      </div>
    </>
  );
}

export default NotFound;
