import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await auth();
  console.log("Session in Home page:", session);
  return (
    <div>
      <h1 className="h1-bold font-space-grotesk">Hi from App
        
      </h1>
    </div>
  );
}

export default Home;
