export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  profileImage: string;
}

export interface HalalCertification {
  title: string;
  description: string;
  certificateNumber: string;
  validUntil: string; // ISO date string
}

export interface AboutContent {
  id: string;
  description: string;
  vision: string;
  mission: string;
  teamMembers: TeamMember[];
  awardsDescription: string;
  halalCertification: HalalCertification;
}