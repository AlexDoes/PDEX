import RedirectComponent from "@/components/RedirectComponent";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function undefined() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(redirectTimeout);
  });

  return (
    <div>
      <RedirectComponent />
    </div>
  );
}
