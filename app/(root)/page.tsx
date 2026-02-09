import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";

const Home = async () => {
  const session = await auth();
  console.log("Session in Home page:", session);
  return (
    <div>
      <h1 className="h1-bold font-space-grotesk">Hi from App</h1>

      <form 
      className="px-10 pt-100"
      action={async () => {
        "use server"
        await signOut({redirectTo: ROUTES.SIGN_IN});
      }}> 
        <Button type="submit">Log Out</Button>
      </form>
    </div>
  );
}

export default Home;
