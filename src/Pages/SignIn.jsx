import SigninForm from "../Components/SigninForm";

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <img
        src="/images/register_signin.jpg"
        alt=""
        className="h-full w-[45%]"
        loading="lazy"
      />
      <SigninForm />
    </div>
  );
};

export default SignIn;
