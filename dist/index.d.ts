/// <reference types="node" />
import { AxiosResponse } from 'axios';
export default function docxToPdfAxios(docx: Blob | Buffer): Promise<AxiosResponse<ArrayBuffer>>;
