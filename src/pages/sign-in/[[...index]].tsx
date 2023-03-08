import { SignIn } from '@clerk/nextjs'

const SignInPage = () => (
  <div className="relative flex justify-center my-20">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
)

export default SignInPage
