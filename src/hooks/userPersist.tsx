import { useState, useEffect } from "react";

const usePersist = () => {
  //الكلام ده عشان التايب سقريبت
  const persistString = localStorage.getItem("persist");
  const initialPersist = persistString ? JSON.parse(persistString) : false;
  const [persist, setPersist] = useState(initialPersist);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
