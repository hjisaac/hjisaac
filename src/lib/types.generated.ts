/** AUTO-GENERATED from cvitae/outputs/schema.json — run: npm run gen:types **/

export interface WorkExperienceItem {
  /**
   * Headline for this entry (job title / degree title / project title / thesis title). Distinct from ContentData.title, which is the person's own professional title.
   */
  title: string;
  organization: string;
  organization_url?: string | null;
  dates: string;
  location: string;
  summary?: string | null;
  details?: string[] | null;
}

export interface ProjectItem {
  /**
   * Headline for this entry (job title / degree title / project title / thesis title). Distinct from ContentData.title, which is the person's own professional title.
   */
  title: string;
  code_url?: string | null;
  demo_url?: string | null;
  paper_url?: string | null;
  footnote?: string | null;
  dates: string;
  summary?: string | null;
  details?: string[] | null;
  tools: string[];
}

export interface EducationItem {
  /**
   * Headline for this entry (job title / degree title / project title / thesis title). Distinct from ContentData.title, which is the person's own professional title.
   */
  title: string;
  organization: string;
  organization_url?: string | null;
  dates: string;
  location: string;
  footnote?: string | null;
  summary?: string | null;
  details?: string[] | null;
}

export interface ContactInfoItem {
  name: string;
  icon?: string | null;
  value: string;
}

export interface PaperItem {
  /**
   * Headline for this entry (job title / degree title / project title / thesis title). Distinct from ContentData.title, which is the person's own professional title.
   */
  title: string;
  type: string;
  organization: string;
  organization_url?: string | null;
  dates: string;
}
