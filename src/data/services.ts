export const DEFAULT_SERVICES = [
  {
    title: "Structural Design",
    description:
      "Structural systems and detailed design for safe, practical, and economical buildings and infrastructure.",
  },
  {
    title: "Structural Analysis",
    description:
      "Analysis of new and existing structures under gravity, wind, seismic, and project-specific loading conditions.",
  },
  {
    title: "Structural Audit",
    description:
      "Condition assessment and engineering recommendations for existing buildings and structures.",
  },
  {
    title: "Repair Consulting",
    description:
      "Engineering support for repair strategies, strengthening schemes, and rehabilitation planning.",
  },
  {
    title: "STAADPro Consulting",
    description:
      "Specialist computer-aided structural modelling, analysis, and design support using STAADPro.",
  },
  {
    title: "Proof Checking",
    description:
      "Independent review of structural calculations, analysis models, drawings, and design assumptions.",
  },
] as const;

export function serviceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
