"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import { EXIF_REFERENCE_ROWS } from "@/data/exifReferenceTable";
import { ExifTableTitleIcon } from "./MetadataIcons";

const TABLE_BODY_HEIGHT = 320;

export default function ExifTableSection() {
  const t = useTranslations();

  return (
    <section id="exif-table" className="scroll-mt-24 bg-elevated py-4">
      <div className="mx-auto w-full max-w-content">
        <div className="overflow-hidden rounded-[4px] bg-block">
          <div className="flex items-center gap-2 px-4 py-3">
            <ExifTableTitleIcon className="text-[#4FA4E2]" />
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              {t("exifTable.title")}
            </span>
          </div>
          <div
            className="border-t border-border-subtle"
            style={{ height: TABLE_BODY_HEIGHT }}
          >
            <div className="h-full overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-[var(--color-bg-block)]">
                  <tr className="border-b border-border-subtle">
                    <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-[var(--color-text-primary)]">
                      {t("exifTable.tagHex")}
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-[var(--color-text-primary)]">
                      {t("exifTable.name")}
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-[var(--color-text-primary)]">
                      {t("exifTable.ifd")}
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-[var(--color-text-primary)]">
                      {t("exifTable.type")}
                    </th>
                    <th className="min-w-[120px] px-4 py-2 text-left font-semibold text-[var(--color-text-primary)]">
                      {t("exifTable.valueExampleHeader")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-text-secondary)]">
                  {EXIF_REFERENCE_ROWS.map((row) => (
                    <tr
                      key={row.name + row.tagHex}
                      className="border-b border-border-subtle last:border-b-0"
                    >
                      <td className="whitespace-nowrap px-4 py-1.5 font-mono text-xs">
                        {row.tagHex}
                      </td>
                      <td className="whitespace-nowrap px-4 py-1.5">
                        {row.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-1.5">
                        {row.ifd}
                      </td>
                      <td className="whitespace-nowrap px-4 py-1.5">
                        {row.type}
                      </td>
                      <td className="max-w-[400px] break-all px-4 py-1.5">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
