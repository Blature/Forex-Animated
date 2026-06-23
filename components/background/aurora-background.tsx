/**
 * AuroraBackground — global animated gradient-mesh that sits behind every
 * section (design-system/MASTER.md §5.3 "Accent gradient", §2.1 surfaces).
 *
 * - Fixed, full-viewport, pointer-events: none, z-index below all content.
 * - Brand teal-green → deep teal blobs + a restrained gold hint (MASTER §2.4).
 *   No purple/pink, ever (MASTER §1 hard rule).
 * - Pure transform/opacity drift (MASTER §5.2). Animation freezes under
 *   prefers-reduced-motion via the global rule in globals.css.
 * - Colors are consumed as semantic tokens — no raw hex (MASTER §1).
 */
export function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__a" />
      <div className="aurora__blob aurora__b" />
      <div className="aurora__blob aurora__c" />
      <div className="aurora__grain" />
      <div className="aurora__vignette" />
    </div>
  );
}
