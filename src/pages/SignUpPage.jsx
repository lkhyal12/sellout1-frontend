import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="h-full  w-full max-w-xl mx-auto bg-surface rounded-xl py-6 px-5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mx-auto text-center text-primary mb-8">
          Create An Account
        </h2>

        <form action="" className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <button className="w-full bg-primary rounded-xl text-white text-center outline-none border-none py-2 cursor-pointer font-bold text-lg">
            Submit
          </button>
        </form>

        <div className="text-center mt-5 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
