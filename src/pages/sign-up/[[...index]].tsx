import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => (
  <div className="relative flex justify-center my-20">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
)
export default SignUpPage
