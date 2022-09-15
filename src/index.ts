import {isNode} from 'browser-or-node';
import axios,{
	AxiosRequestConfig,
	AxiosResponse
}from 'axios';

export default async function docxToPdfAxios(docx:Blob|Buffer):Promise<AxiosResponse<ArrayBuffer>>{
	let NodeFormData:typeof import('form-data');
	if(isNode)NodeFormData=(await import('form-data')).default;
	let formData=new(isNode?NodeFormData:FormData)();
	formData.append('__EVENTTARGET','');
	formData.append('__EVENTARGUMENT', '');
	formData.append('__VIEWSTATE', '');
	(formData as any).append('ctl00$MainContent$fu',docx,'output.docx');
	formData.append('ctl00$MainContent$btnConvert', 'Convert');
	formData.append('ctl00$MainContent$fuZip', '');
	let options:AxiosRequestConfig={responseType:'arraybuffer'};
	if(isNode)options.headers=(formData as any).getHeaders();
	return axios.post<ArrayBuffer>(
		'http://mirror1.convertonlinefree.com',
		formData,
		options
	);
};