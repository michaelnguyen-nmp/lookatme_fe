// LocationPicker.jsx
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import styles from "./LocationPicker.module.scss";

const LOCATION_API = "http://localhost:8000/api/location/reverse-geocode";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Marker hiển thị khi chọn vị trí
function LocationMarker({ position }) {
  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

// Bắt sự kiện click để chọn vị trí
function MapClickHandler({ setPosition, fetchLocationName }) {
  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      setPosition(latlng);
      fetchLocationName(latlng);
    },
  });
  return null;
}

// Xử lý map resize khi visible thay đổi
function MapResizeHandler({ visible }) {
  const map = useMap();
  useEffect(() => {
    const resize = () => map.invalidateSize();
    map.whenReady(() => setTimeout(resize, 100));
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [map]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => map.invalidateSize(), 100);
    }
  }, [visible, map]);

  return null;
}

export default function LocationPicker({
  onSelectLocation,
  initialPosition = { lat: 10.7769, lng: 106.7009 },
  zoom = 13,
  visible = true,
  height = 250,
}) {
  const [position, setPosition] = useState(null);
  const [locationName, setLocationName] = useState("");

  const fetchLocationName = async ({ lat, lng }) => {
    try {
      const res = await fetch(
        `${LOCATION_API}?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();

      if (data?.display_name) {
        let cleanedName = data.display_name
          .replace(/\b\d{4,6}\b/g, "") // xóa postcode
          .replace(/,\s*VN-SG,?\s*Việt Nam,?\s*vn/gi, "")
          .replace(/,\s*Việt Nam/gi, "")
          .replace(/,\s*vn/gi, "")
          .replace(/,\s*,+/g, ",") // xóa dấu phẩy liên tiếp
          .replace(/(^,)|(,$)/g, "") // xóa dấu phẩy ở đầu/cuối
          .replace(/,\s*$/, "") // xóa dấu phẩy cuối
          .replace(/^\s*,\s*/g, "") // xóa dấu phẩy đầu
          .replace(/\s*,\s*/g, ", ") // chuẩn hóa khoảng trắng sau dấu phẩy
          .trim();

        setLocationName(cleanedName);
        onSelectLocation?.(cleanedName, { lat, lng });
      } else {
        setLocationName("");
        onSelectLocation?.(null, { lat, lng });
      }
    } catch (error) {
      console.error("Reverse geocoding failed", error);
      setLocationName("");
      onSelectLocation?.(null, { lat, lng });
    }
  };

  return (
    <div className={styles.locationPickerWrapper}>
      {locationName && (
        <div className={styles.locationInfo}>📍 {locationName}</div>
      )}

      <div className={styles.mapPreview} style={{ height }}>
        <MapContainer
          center={position || initialPosition}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker position={position} />
          <MapClickHandler
            setPosition={setPosition}
            fetchLocationName={fetchLocationName}
          />
          <MapResizeHandler visible={visible} />
        </MapContainer>
      </div>

      {!position && (
        <div className={styles.selectHint}>Chọn vị trí trên bản đồ</div>
      )}
    </div>
  );
}
