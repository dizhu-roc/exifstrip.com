"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const MAP_MIN_HEIGHT_PX = 200;

function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => {
    const run = () => map.invalidateSize();
    const t1 = setTimeout(run, 0);
    const t2 = setTimeout(run, 200);
    const t3 = setTimeout(run, 500);
    window.addEventListener("resize", run);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", run);
    };
  }, [map]);
  return null;
}

function createMarkerIcon() {
  return L.divIcon({
    className: "gps-map-marker",
    html: `<span style="display:block;width:14px;height:14px;border-radius:50%;background:#059669;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35);"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export type GpsMapInnerProps = {
  center: [number, number];
  zoom: number;
  marker?: { lat: number; lng: number } | null;
  interactionLocked?: boolean;
};

export default function GpsMapInner({
  center,
  zoom,
  marker,
  interactionLocked = false,
}: GpsMapInnerProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", minHeight: MAP_MIN_HEIGHT_PX, width: "100%" }}
      className="z-0 rounded-[4px]"
      dragging={!interactionLocked}
      scrollWheelZoom={!interactionLocked}
      doubleClickZoom={!interactionLocked}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        maxNativeZoom={19}
      />
      <InvalidateSizeOnMount />
      {marker && (
        <Marker position={[marker.lat, marker.lng]} icon={createMarkerIcon()} />
      )}
    </MapContainer>
  );
}
