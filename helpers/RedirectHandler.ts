import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { router } from "expo-router";

export default function RedirectHandler() {
  const [isReady, setIsReady] = useState(false);
  const { isTermsAndConditionsDone } = useAppSelector((state) => state.global);

  useEffect(() => {
    // Store'un hazır olduğundan emin olmak için kısa bir gecikme ekliyoruz
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && isTermsAndConditionsDone) {
      console.log("Yönlendirme yapılıyor...", { isTermsAndConditionsDone });
      router.replace("/auth/login");
    }
  }, [isReady, isTermsAndConditionsDone]);

  return null;
}
