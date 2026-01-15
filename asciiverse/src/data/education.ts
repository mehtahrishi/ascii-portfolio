export interface EducationItem {
    institution: string;
    location: string;
    period: string;
    degree: string;
    grade: string;
}

export const EDUCATION: EducationItem[] = [
    {
        institution: "University of Mumbai",
        location: "Mumbai, Maharashtra",
        period: "2022 – 2025",
        degree: "Bachelor of Science in Information Technology\n(B.Sc IT)",
        grade: "CGPA: 8.7/10"
    }
];
