import { useQuery } from "@tanstack/react-query";

const leaderboardHook = () => {
  const fetchPlayers = async () => {
    let token = localStorage.getItem("token");
    let response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/game/getPlayers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: token,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("failed to fetch leaderboard data");
    }
    let data = await response.json();
    return data.map((player) => ({
      ...player,
      completedAchievements: player.achievements
        ? player.achievements.filter((a) => a.progress === "Completed!").length
        : 0,
    }));
  };

  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchPlayers, // Remove the arrow function, just pass the reference
  });
};

export default leaderboardHook;
