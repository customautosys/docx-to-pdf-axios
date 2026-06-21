import {isNode} from 'browser-or-node';
import axios,{
	AxiosRequestConfig
}from 'axios';

interface JobStatusData{
	jobId:string,
	status:string,
	job:{
		state:string,
		'out.file':string,
		'out.name':string,
		'out.size':string,
		'0.out.name':string,
		'0.converter.param.langCode':string,
		'0.out.size':string,
		'0.in.name':string,
		'client.ip':string,
		'0.out.file':string,
		referrer:string,
		command:string,
		'0.state':string,
		'0.in.size':string,
		'processing.startTime':string,
		'0.in.file':string,
		charset:string,
		creationTime:string,
		count:string,
		resultType:string,
		'0.converter.param.pageFormat':string,
		service:string,
		lang:string
	}
}

export default async function docxToPdfAxios(docx:Blob|Buffer,corsPrefix=''):Promise<ArrayBuffer>{
	let NodeFormData:typeof import('form-data')|undefined;
	if(isNode)NodeFormData=(await import('form-data')).default;
	let formData=new(isNode&&NodeFormData?NodeFormData:FormData)();
	(formData as any).append('file',docx,'output.docx');
	let options:AxiosRequestConfig={responseType:'json'};
	if(isNode&&typeof (formData as any).getHeaders==='function')options.headers=(formData as any).getHeaders();
	let corsPrefixString=(String(corsPrefix).includes('://')?(corsPrefix+(String(corsPrefix).endsWith('/')?'':'/')):'');
	let files=(await axios.post<{
		file:string,
		size:number,
		name:string,
		ctime:string,
		host:string
	}>(
		'https://filetools21.pdf24.org/client.php?action=upload',
		formData,
		options
	)).data;
	delete options.headers;
	let convertData=(await axios.post<{
		jobId:string
	}>(
		'https://filetools21.pdf24.org/client.php?action=convertToPdf',
		{files},
		options
	)).data;
	let jobIdFormData=new URLSearchParams();
	jobIdFormData.append('jobId',convertData.jobId);
	let jobStatusData:JobStatusData=(await axios.post<JobStatusData>(
		corsPrefixString+'https://filetools21.pdf24.org/client.php?action=getStatus',
		jobIdFormData,
		options
	)).data;
	while(jobStatusData.status!=='done'){
		try{
			await new Promise<void>(resolve=>setTimeout(resolve,2000));
			jobStatusData=(await axios.post<JobStatusData>(
				corsPrefixString+'https://filetools21.pdf24.org/client.php?action=getStatus',
				jobIdFormData,
				options
			)).data;
		}catch(error){
			console.log(error);
		}
	}
	options.responseType='arraybuffer';
	options.params=convertData;
	return (await axios.get<ArrayBuffer>(
		'https://filetools21.pdf24.org/client.php?mode=download&action=downloadJobResult',
		options
	)).data;
};