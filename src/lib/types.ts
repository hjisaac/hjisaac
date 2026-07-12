import type { ContactInfoItem } from './types.generated';

export interface CvSection<T> {
    name: string;
    type: string;
    entries: T[];
}

export interface CvSkills {
    programming_languages: string[];
    frameworks_and_libraries: string[];
    infrastructure_and_tools: string[];
}

export interface CvData {
    labels: Record<string, string>;
    name: string;
    contact: ContactInfoItem[];
    title: string;
    summary: string;
    sections: CvSection<unknown>[];
    skills: CvSkills;
    languages: Record<string, string>;
}
