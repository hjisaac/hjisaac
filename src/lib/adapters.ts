import type { EducationEntry, ProjectEntry, WorkExperienceEntry, CvSkills } from './types';
import { normalizeDateRange, SKILL_LABELS } from './format';

export interface ExperienceCardProps {
    kind: 'experience';
    titleText: string;
    orgText: string | null;
    orgUrl: string | null;
    meta: string;
    details: string[] | null;
    summary: string | null;
    footnote: string | null;
}

export interface EducationCardProps {
    kind: 'education';
    titleText: string;
    orgText: string | null;
    orgUrl: string | null;
    meta: string;
    details: string[] | null;
    summary: string | null;
    footnote: string | null;
}

export interface ProjectCardProps {
    title: string;
    codeUrl: string | null;
    demoUrl: string | null;
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

export function toExperienceCardProps(entry: WorkExperienceEntry): ExperienceCardProps {
    const dates = normalizeDateRange(entry.dates);
    const meta = entry.location ? `${dates} · ${entry.location}` : dates;

    return {
        kind: 'experience',
        titleText: entry.role,
        orgText: entry.organization ?? null,
        orgUrl: entry.organization_url ?? null,
        meta,
        details: entry.details ?? null,
        summary: entry.summary ?? null,
        footnote: null,
    };
}

export function toEducationCardProps(entry: EducationEntry): EducationCardProps {
    const dates = normalizeDateRange(entry.dates);
    const meta = entry.location ? `${dates} · ${entry.location}` : dates;

    return {
        kind: 'education',
        titleText: entry.degree,
        orgText: entry.organization ?? null,
        orgUrl: entry.organization_url ?? null,
        meta,
        details: entry.details ?? null,
        summary: entry.summary ?? null,
        footnote: entry.footnote ?? null,
    };
}

export function toProjectCardProps(entry: ProjectEntry): ProjectCardProps {
    return {
        title: entry.title,
        codeUrl: entry.code_url ?? null,
        demoUrl: entry.demo_url ?? null,
        meta: normalizeDateRange(entry.dates),
        details: entry.details ?? null,
        summary: entry.summary ?? null,
        tools: entry.tools ?? [],
        footnote: entry.footnote ?? null,
    };
}

export function toSkillsGroups(skills: CvSkills): SkillsGroupProps[] {
    return (Object.entries(skills) as [keyof CvSkills, string[]][]).map(([key, items]) => ({
        label: SKILL_LABELS[key] ?? key,
        items: items.join(', '),
    }));
}
