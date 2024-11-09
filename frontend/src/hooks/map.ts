import { useQuery } from "@tanstack/react-query";

const fetchMaps = () => {
  const getData = async () => {
    //empty area
  };

  return useQuery({
    queryKey: ["maps"],
    queryFn: () => {},
  });
};
