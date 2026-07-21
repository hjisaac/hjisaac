import type { EducationItem, PaperItem, ProjectItem, WorkExperienceItem } from './types.generated';
import type { CvSkills } from './types';
import { normalizeDateRange } from './format';

export interface EntryCardProps {
    kind: 'experience' | 'education' | 'paper';
    titleText: string;
    organization: string | null;
    organization_url: string | null;
    meta: string;
    details: string[] | null;
    summary: string | null;
    footnote: string | null;
}

export interface ProjectCardProps {
    title: string;
    code_url: string | null;
    demo_url: string | null;
    meta: string;
    details: string[] | null;
    summary: string | null;
    tools: string[];
    footnote: string | null;
}

export interface SkillsGroupProps {
    label: string;
    items: string;
}

export function toExperienceCardProps(entry: WorkExperienceItem): EntryCardProps {
    const dates = normalizeDateRange(entry.dates);
    const meta = entry.location ? `${dates} · ${entry.location}` : dates;

    return {
        kind: 'experience',
        titleText: entry.title,
        organization: entry.organization ?? null,
        organization_url: entry.organization_url ?? null,
        meta,
        details: entry.details ?? null,
        summary: entry.summary ?? null,
        footnote: null,
    };
}

export function toEducationCardProps(entry: EducationItem): EntryCardProps {
    const dates = normalizeDateRange(entry.dates);
    const meta = entry.location ? `${dates} · ${entry.location}` : dates;

    return {
        kind: 'education',
        titleText: entry.title,
        organization: entry.organization ?? null,
        organization_url: entry.organization_url ?? null,
        meta,
        details: entry.details ?? null,
        summary: entry.summary ?? null,
        footnote: entry.footnote ?? null,
    };
}

export function toProjectCardProps(entry: ProjectItem): ProjectCardProps {
    return {
        title: entry.title,
        code_url: entry.code_url ?? null,
        demo_url: entry.demo_url ?? null,
        meta: normalizeDateRange(entry.dates),
        details: entry.details ?? null,
        summary: entry.summary ?? null,
        tools: entry.tools ?? [],
        footnote: entry.footnote ?? null,
    };
}

export function toPaperCardProps(entry: PaperItem): EntryCardProps {
    return {
        kind: 'paper',
        titleText: entry.title,
        organization: null,
        organization_url: null,
        meta: `${entry.type} · ${entry.organization} · ${normalizeDateRange(entry.dates)}`,
        details: null,
        summary: null,
        footnote: null,
    };
}

export function toSkillsGroups(skills: CvSkills, labels: Record<keyof CvSkills, string>): SkillsGroupProps[] {
    return (Object.entries(skills) as [keyof CvSkills, string[]][]).map(([key, items]) => ({
        label: labels[key] ?? key,
        items: items.join(', '),
    }));
}
