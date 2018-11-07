export interface Document {
  id?: number;
  file_type?: string;
  file_name: string;
  file_description?: string;
  file?: any;
  thumbnail?: string;
  upload_date?: any;
  create_date?: any;
  url?: string;
  user_uuid: string;
  organization_uuid?: string;
  workflowlevel1_uuids?: string[];
  workflowlevel2_uuids: string[];
  projects?: any;
  blobLocalUrl?: string;
  blobThumbnailLocalUrl?: string;
}
