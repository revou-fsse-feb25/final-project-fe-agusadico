export interface ContactInfo {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  complaintService: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  topic: string;
  location: string;
  message: string;
  submittedAt: string; // ISO date string
}