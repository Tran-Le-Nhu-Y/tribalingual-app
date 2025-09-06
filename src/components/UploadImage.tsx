import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
interface UploadImageProps {
	maxCount?: number; // tối đa số ảnh
	action?: string; // API upload
	value?: UploadFile[]; // controlled value
	onChange?: (fileList: UploadFile[]) => void; // callback khi thay đổi
}

const UploadImage: React.FC<UploadImageProps> = ({
	maxCount = 8,
	action = 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
	value,
	onChange,
}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>(value || []);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		onChange?.(newFileList); // callback ra ngoài nếu có
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);
	return (
		<>
			<Upload
				action={action}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= maxCount ? null : uploadButton}
			</Upload>
			{previewImage && (
				<Image
					wrapperStyle={{ display: 'none' }}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(''),
					}}
					src={previewImage}
				/>
			)}
		</>
	);
};

export default UploadImage;
