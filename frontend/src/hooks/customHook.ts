import { useState, useEffect } from "react";

const customHook = () => {
  const [data, setData] = useState(Number);
  let num = 1;
  let boolean = false;

  const manipulateData = (num) => {
    setData(num);
    boolean = true;
  };

  useEffect(() => {
    manipulateData(num);
  }, []);

  return { data, boolean };
};

export default customHook;
