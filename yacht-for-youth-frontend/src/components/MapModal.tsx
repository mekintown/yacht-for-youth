"use client";

import { useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";

// Fix default marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    if (!res.ok) return "";
    const data = await res.json();
    // data.display_name often yields a decent address string
    return data.display_name || "";
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return "";
  }
}

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapModal({
  onClose,
  onSelectLocation,
}: {
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number, address: string) => void;
}) {
  // Default to Bangkok center
  const [markerPos, setMarkerPos] = useState<[number, number]>([
    13.7563, 100.5018,
  ]);
  const [foundAddress, setFoundAddress] = useState("");

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    const addr = await reverseGeocode(lat, lng);
    setFoundAddress(addr);
  }, []);

  const handleConfirm = () => {
    onSelectLocation(markerPos[0], markerPos[1], foundAddress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          เลือกตำแหน่งบนแผนที่
        </h2>

        <div className="relative h-80 w-full mb-4">
          <MapContainer
            center={markerPos}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full rounded"
          >
            {/* MapTiler tile layer (modern style) */}
            <TileLayer
              url={`https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
            />
            <Marker position={markerPos} />
            <MapClickHandler onMapClick={handleMapClick} />
          </MapContainer>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          คลิกบนแผนที่เพื่อเปลี่ยนตำแหน่ง
        </div>
        <p className="text-sm text-gray-500">
          Lat: {markerPos[0].toFixed(5)}, Lng: {markerPos[1].toFixed(5)}
          <br />
          {foundAddress && (
            <span className="block mt-1 text-gray-700">
              ที่อยู่โดยประมาณ: {foundAddress}
            </span>
          )}
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={handleConfirm}>เลือกตำแหน่งนี้</Button>
        </div>
      </div>
    </div>
  );
}
