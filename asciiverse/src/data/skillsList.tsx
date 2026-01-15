import {
    FaGitAlt, FaDocker, FaLinux, FaReact, FaNodeJs, FaPython,
    FaTerminal, FaCode,
} from 'react-icons/fa';
import {
    SiKubernetes, SiNextdotjs, SiTailwindcss, SiMongodb,
    SiTypescript,
    SiFramer, SiGrafana,
    SiRedis, SiNeo4J,
    SiMysql, SiNginx, SiFlask, SiAppwrite,
    SiPostman, SiN8N, SiZapier,
    SiGooglecloud,
    SiGooglegemini,
    SiExpress
} from 'react-icons/si';
import { TbApi } from "react-icons/tb";
import { RiClaudeLine } from 'react-icons/ri';
import { AiOutlineOpenAI } from 'react-icons/ai';
import { GoCopilot } from "react-icons/go";
export const SKILLS = [
    {
        category: "DevOps",
        items: [
            { name: "Git", icon: <FaGitAlt /> },
            { name: "Docker", icon: <FaDocker /> },
            { name: "K8s", icon: <SiKubernetes /> },
            { name: "GCP", icon: <SiGooglecloud /> },
            { name: "CI/CD", icon: <FaTerminal /> },
            { name: "Linux", icon: <FaLinux /> },
            { name: "Nginx", icon: <SiNginx /> },
            { name: "Grafana", icon: <SiGrafana /> },
        ]
    },
    {
        category: "Frontend",
        items: [
            { name: "React", icon: <FaReact /> },
            { name: "NextJS", icon: <SiNextdotjs /> },
            { name: "TS", icon: <SiTypescript /> },
            { name: "JS", icon: <FaCode /> },
            { name: "Tailwind", icon: <SiTailwindcss /> },
            { name: "Framer", icon: <SiFramer /> },
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Node", icon: <FaNodeJs /> },
            { name: "Express", icon: <SiExpress /> },
            { name: "Python", icon: <FaPython /> },
            { name: "Flask", icon: <SiFlask /> },
            { name: "Postman", icon: <SiPostman /> },
        ]
    },
    {
        category: "Databases",
        items: [
            { name: "SQL", icon: <SiMysql /> },
            { name: "Mongo", icon: <SiMongodb /> },
            { name: "Neo4j", icon: <SiNeo4J /> },
            { name: "Redis", icon: <SiRedis /> },
            { name: "Appwrite", icon: <SiAppwrite /> },
        ]
    },
    {
        category: "AI Tools",
        items: [
            { name: "Gemini", icon: <SiGooglegemini /> },
            { name: "Copilot", icon: <GoCopilot /> },
            { name: "Claude", icon: <RiClaudeLine /> },
            { name: "MCP", icon: <TbApi /> },
            { name: "OpenAI", icon: <AiOutlineOpenAI /> },
        ]
    },
    {
        category: "No Code",
        items: [
            { name: "n8n", icon: <SiN8N /> },
            { name: "Zapier", icon: <SiZapier /> },
        ]
    }
];
