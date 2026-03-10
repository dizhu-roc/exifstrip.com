"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import type { GpsLatLng } from "@/lib/parseExif";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  GPS_ZOOM,
} from "./gpsMapConstants";
import GpsMapInner from "./GpsMapInner";

function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

/** 接收上层单次解析得到的 GPS，不再在此组件内解析 EXIF */
export type GpsMapPanelProps = {
  gps: GpsLatLng | null;
  fileKey?: string;
};

export default function GpsMapPanel({ gps, fileKey }: GpsMapPanelProps) {
  const t = useTranslations();
  const hasGps = gps !== null;
  const showNoLocationOverlay = !hasGps;

  const center: [number, number] = hasGps
    ? [gps.lat, gps.lng]
    : DEFAULT_MAP_CENTER;
  const zoom = hasGps ? GPS_ZOOM : DEFAULT_MAP_ZOOM;

  const mapKey =
    (fileKey ?? "no-file") +
    (hasGps ? `-${gps.lat},${gps.lng}` : "-no-gps");

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[4px] border-0 bg-block w-full">
      <div className="flex shrink-0 items-center gap-2 border-b border-border-subtle px-3 py-2">
        <span className="text-[#4FA4E2]" aria-hidden>
          <LocationPinIcon className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {t("upload.locationsTitle")}
        </h2>
      </div>
      <div className={`relative flex-1 overflow-hidden ${hasGps ? "min-h-[280px]" : "min-h-[200px]"}`}>
        <div key={mapKey} className="h-full w-full min-h-0 min-w-0">
          <GpsMapInner
            center={center}
            zoom={zoom}
            marker={hasGps ? gps : null}
            interactionLocked={showNoLocationOverlay}
          />
        </div>
        {showNoLocationOverlay && (
          <div
            className="absolute inset-0 z-[400] flex flex-col items-center justify-center rounded-[4px] bg-[#e5e5e5]/85 px-4 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-base font-bold text-[#404040]">
              {t("upload.noLocationData")}
            </p>
            <p className="mt-2 text-sm font-normal text-[#525252]">
              {t("upload.seeMetadataBelow")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
