import RegisterForm from "../Components/RegisterForm";

const Register = () => {
  return (
    <div className="flex items-center justify-between pt-20">
      <img
        src="/images/register_signin.jpg"
        alt=""
        className="h-[123vh] w-[40%]"
        loading="lazy"
      />
      <RegisterForm />
    </div>
  );
};

export default Register;
