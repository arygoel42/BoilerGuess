import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ResultsOverlay from "../components/resultsOveray";
import "../MapComponent.css";

interface Props {
  setRound: (round: number) => void;
  round: number;
}

const boundaryCoordinates = [
  { lat: 40.425731, lng: -86.928836 },
  { lat: 40.422656, lng: -86.904755 },
  { lat: 40.437634, lng: -86.918154 },
  { lat: 40.42785, lng: -86.930384 },
];

const MapComponent = ({ setRound, round }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const streetViewRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [streetViewPanorama, setStreetViewPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);

  const streetViewLocationRef = useRef<google.maps.LatLng | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [isStreetViewReady, setIsStreetViewReady] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const getRandomLocation = useMemo(() => {
    const latMin = Math.min(...boundaryCoordinates.map((coord) => coord.lat));
    const latMax = Math.max(...boundaryCoordinates.map((coord) => coord.lat));
    const lngMin = Math.min(...boundaryCoordinates.map((coord) => coord.lng));
    const lngMax = Math.max(...boundaryCoordinates.map((coord) => coord.lng));

    return () =>
      new window.google.maps.LatLng(
        latMin + Math.random() * (latMax - latMin),
        lngMin + Math.random() * (lngMax - lngMin)
      );
  }, []);

  const validateStreetViewLocation = useCallback(
    (location: google.maps.LatLng, callback: (valid: boolean) => void) => {
      const streetViewService = new window.google.maps.StreetViewService();
      streetViewService.getPanorama(
        { location, radius: 50 },
        (data, status) => {
          callback(status === window.google.maps.StreetViewStatus.OK);
        }
      );
    },
    []
  );

  const resetRound = useCallback(() => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    setDistance(null);
    setIsStreetViewReady(false);

    const maxRetries = 10;
    let attempt = 0;

    const trySettingLocation = () => {
      if (attempt >= maxRetries) {
        console.error(
          "Failed to find a valid Street View location after retries."
        );
        return;
      }

      const randomLocation = getRandomLocation();
      attempt++;
      validateStreetViewLocation(randomLocation, (isValid) => {
        if (isValid && streetViewPanorama) {
          streetViewPanorama.setPosition(randomLocation);
          streetViewLocationRef.current = randomLocation;
          setIsStreetViewReady(true);
        } else {
          trySettingLocation();
        }
      });
    };

    trySettingLocation();
  }, [getRandomLocation, streetViewPanorama, validateStreetViewLocation]);

  const calculatePoints = async (distance: number) => {
    const token = localStorage.getItem("token");

    try {
      let response = await fetch("http://localhost:3011/api/game/play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Inform server of JSON payload
        },
        body: JSON.stringify({
          token: token,
          distance: distance / 1000,
          streak: streak,
        }),
        credentials: "include",
      });

      if (!response.ok) return;

      let resultsObject = await response.json();

      if (resultsObject.message == "Incorrect!") {
        setDistance(distance);
        setPoints(points + resultsObject.Points);
        setStreak(0);
        setMessage(resultsObject.message);
        return;
      }
      if (resultsObject.message == "Correct!") {
        setDistance(distance);
        setPoints(points + resultsObject.Points);
        setStreak(streak + 1);
        setMessage(resultsObject.message);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mapRef.current || !streetViewRef.current) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.424, lng: -86.9212 },
      zoom: 15,
      mapTypeId: "roadmap",
      gestureHandling: "cooperative",
      disableDefaultUI: false,
    });

    const streetViewPanorama = new window.google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
        addressControl: false,
        fullscreenControl: true,
      }
    );

    setMap(googleMap);
    setStreetViewPanorama(streetViewPanorama);

    return () => {
      streetViewPanorama.setVisible(false);
      setMap(null);
    };
  }, []);

  useEffect(() => {
    resetRound();
  }, [currentRound, resetRound]);

  useEffect(() => {
    if (!map || !isStreetViewReady) return;

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      const clickLatLng = event.latLng;
      if (!clickLatLng || !streetViewLocationRef.current) return;

      const marker = new window.google.maps.Marker({
        position: clickLatLng,
        map,
      });

      setMarkers((prevMarkers) => [...prevMarkers, marker]);

      const distanceInMeters =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          streetViewLocationRef.current,
          clickLatLng
        );

      const distance = distanceInMeters;

      calculatePoints(distance);
    };

    const clickListener = map.addListener("click", handleMapClick);

    return () => {
      window.google.maps.event.removeListener(clickListener);
    };
  }, [map, isStreetViewReady]);

  return (
    <div className="map-container">
      <div ref={streetViewRef} className="street-view"></div>
      <div ref={mapRef} className="map-view"></div>
      {distance !== null && (
        <ResultsOverlay
          message={message}
          setMessage={setMessage}
          setStreak={setStreak}
          setPoints={setPoints}
          points={points}
          streak={streak}
          round={round}
          distance={distance}
          setRound={setRound}
          streetViewLocation={streetViewLocationRef.current}
          clickedLocation={markers[markers.length - 1].getPosition()}
        />
      )}

      <div className="round-indicator">Round: {round}/5</div>
    </div>
  );
};

export default MapComponent;
