import Link from "next/link";
import Button from "@/components/Button/button.component";
import Auth from "@/components/Auth/auth.component";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-[#423E37] h-[calc(100dvh-56px)]">
      {/* <Link href="/Dashboard"><Button>Start</Button></Link> */}
      <Auth />
    </div>
  );
}
