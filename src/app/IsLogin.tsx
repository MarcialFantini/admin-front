"use client";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const IsLogin = () => {
  const isLogin = useAppSelector((state) => state.users.isLogin);
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  return <></>;
};
