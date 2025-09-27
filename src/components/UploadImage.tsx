import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Typography } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

const { Text } = Typography;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
interface UploadImageProps {
	maxCount?: number;
	fileList?: UploadFile[];
	onChange?: (fileList: UploadFile[]) => void;
	onRemove?: (file: UploadFile) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
	maxCount = 8,
	fileList: propFileList,
	onChange,
	onRemove,
}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [internalFileList, setInternalFileList] = useState<UploadFile[]>([]);

	const fileList = propFileList ?? internalFileList;

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		if (!propFileList) setInternalFileList(newFileList);
		onChange?.(newFileList);
	};

	const handleRemove: UploadProps['onRemove'] = (file) => {
		if (!propFileList)
			setInternalFileList((prev) => prev.filter((f) => f.uid !== file.uid));
		onRemove?.(file);
		return true;
	};

	return (
		<>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				onRemove={handleRemove}
				beforeUpload={() => false}
			>
				{fileList.length >= maxCount ? null : (
					<button style={{ border: 0, background: 'none' }} type="button">
						<PlusOutlined style={{ color: 'grey' }} />
						<div style={{ marginTop: 8 }}>
							<Text type="secondary">Upload</Text>
						</div>
					</button>
				)}
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
