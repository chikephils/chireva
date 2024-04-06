import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Circles
        height="120"
        width="120"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
