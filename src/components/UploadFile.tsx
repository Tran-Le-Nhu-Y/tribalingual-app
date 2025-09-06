import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';

interface UploadFileProps {
	action?: string; // API endpoint
	maxCount?: number;
	accept?: string; // ví dụ ".pdf,.doc,.docx,.txt"
	multiple?: boolean;
	buttonText?: string;
}

const UploadFile: React.FC<UploadFileProps> = ({
	action = '//jsonplaceholder.typicode.com/posts/',
	maxCount = 1,
	accept,
	multiple = false,
	buttonText = 'Upload File',
}) => {
	const props: UploadProps = {
		action,
		maxCount,
		accept,
		multiple,
		listType: 'text',
		beforeUpload: (file) => {
			console.log('File chọn:', file);
			return true; // return false nếu không muốn upload ngay
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log('File info:', info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				console.log(`${info.file.name} uploaded successfully`);
			} else if (info.file.status === 'error') {
				console.error(`${info.file.name} upload failed`);
			}
		},
	};

	return (
		<Upload {...props}>
			<Button icon={<UploadOutlined />}>{buttonText}</Button>
		</Upload>
	);
};

export default UploadFile;
