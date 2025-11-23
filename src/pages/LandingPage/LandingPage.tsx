import { Card, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
	return (
		<Space
			direction="vertical"
			style={{
				minHeight: '100vh',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 8,
				marginTop: 0,
				gap: 20,
			}}
		>
			{/* FIRST CARD — HERO SECTION */}
			<Card
				style={{
					maxWidth: 900,
					width: '100%',
					borderRadius: 16,
					textAlign: 'center',
					padding: '80px 30px',
					boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
					backgroundImage: 'url(/sapa_team.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Overlay */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(0,0,0,0.45)',
						backdropFilter: 'blur(2px)',
						zIndex: 0,
					}}
				/>

				{/* Text */}
				<div style={{ position: 'relative', zIndex: 1 }}>
					<Title
						level={3}
						style={{ fontWeight: 750, color: 'white', marginBottom: 20 }}
					>
						{/* When a language disappears, a culture fades away */}
						Khi một ngôn ngữ biến mất, một nền văn hóa cũng phai tàn
					</Title>

					<Paragraph
						style={{
							fontSize: 16,
							lineHeight: 1.7,
							color: 'white',
							textAlign: 'justify',
						}}
					>
						{/* TRIbLINGUAL is a project founded in September 2025 to preserve,
						document, and celebrate the Hmong language and culture through
						storytelling, education, and community collaboration. */}
						TRIbLINGUAL là một dự án được thành lập vào tháng 7 năm 2025 nhằm
						bảo tồn, ghi chép và tôn vinh ngôn ngữ cùng văn hóa H’Mông thông qua
						kể chuyện, giáo dục và sự hợp tác của cộng đồng.
					</Paragraph>

					<Paragraph
						style={{
							fontSize: 16,
							lineHeight: 1.7,
							color: 'white',
							textAlign: 'justify',
						}}
					>
						{/* Supported by the National University of Singapore (NUS) under the
						Asian Undergraduate Symposium (AUS), this project represents the
						power of youth-led innovation for cultural sustainability. */}
						Được hỗ trợ bởi Đại học Quốc gia Singapore (NUS) trong khuôn khổ
						Diễn đàn Sinh viên Đại học Châu Á (AUS), dự án này thể hiện sức mạnh
						của những sáng kiến do giới trẻ dẫn dắt nhằm hướng tới sự bền vững
						văn hóa.
					</Paragraph>
				</div>
			</Card>

			<div
				style={{
					width: '100%',
					maxWidth: 900,
					padding: '0 20px',
				}}
			>
				<Title level={2} style={{ fontWeight: 700, marginBottom: 10 }}>
					{/* Our mission */}
					Sứ mệnh của chúng tôi
				</Title>

				<Paragraph
					style={{
						fontSize: 16,
						lineHeight: 1.7,
						fontStyle: 'italic',
						marginBottom: 20,
					}}
				>
					{/* Every word in a mother tongue carries generations of memory. */}
					Mỗi từ trong tiếng mẹ đẻ đều chứa đựng ký ức của nhiều thế hệ.
				</Paragraph>

				<Paragraph
					style={{ fontSize: 16, lineHeight: 1.7, textAlign: 'justify' }}
				>
					{/* We aim to revitalize endangered languages by combining academic
					research, local storytelling, and digital archiving. TRIbaLINGUAL is
					not just a website – it is a living museum where tradition meets
					technology, ensuring that the Hmong people’s wisdom, folklore, and
					oral heritage continue to inspire future generations. */}
					Chúng tôi hướng đến việc hồi sinh các ngôn ngữ đang có nguy cơ biến
					mất bằng cách kết hợp nghiên cứu học thuật, kể chuyện bản địa và lưu
					trữ số. TRIbaLINGUAL không chỉ là một trang web – đó là một “bảo tàng
					sống”, nơi truyền thống gặp gỡ công nghệ, nhằm gìn giữ và lan tỏa trí
					tuệ, văn hóa dân gian và di sản truyền miệng của người H’Mông để tiếp
					tục truyền cảm hứng cho các thế hệ tương lai.
				</Paragraph>
			</div>
			<div
				style={{
					width: '100%',
					maxWidth: 900,
					padding: '0 20px',
					textAlign: 'center',
				}}
			>
				<Title level={2} style={{ fontWeight: 700, marginBottom: 20 }}>
					{/* Core values */}
					Giá trị cốt lõi
				</Title>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						gap: 24,
						flexWrap: 'wrap',
					}}
				>
					{/* ITEM 1 */}
					<div style={{ maxWidth: 260, textAlign: 'center' }}>
						<img
							src="/Preservation.jpg"
							style={{ width: '100%', height: 200, objectFit: 'cover' }}
							alt="value"
						/>
						<Paragraph style={{ fontWeight: 700, marginTop: 16 }}>
							{/* Preservation */}
							Bảo tồn
						</Paragraph>
						<Paragraph style={{ fontSize: 15, textAlign: 'justify' }}>
							{/* Safeguarding the H’Mong language and culture through education. */}
							Gìn giữ ngôn ngữ và văn hóa H’Mông thông qua giáo dục.
						</Paragraph>
					</div>

					{/* ITEM 2 */}
					<div style={{ maxWidth: 260, textAlign: 'center' }}>
						<img
							src="/Empowerment.jpg"
							style={{ width: '100%', height: 200, objectFit: 'cover' }}
							alt="value"
						/>
						<Paragraph style={{ fontWeight: 700, marginTop: 16 }}>
							{/* Empowerment */}
							Trao quyền
						</Paragraph>
						<Paragraph style={{ fontSize: 15, textAlign: 'justify' }}>
							{/* Helping children learn with pride in their identity. */}
							Giúp trẻ em học tập với niềm tự hào về bản sắc của mình
						</Paragraph>
					</div>

					{/* ITEM 3 */}
					<div style={{ maxWidth: 260, textAlign: 'center' }}>
						<img
							src="/Connection.jpg"
							style={{ width: '100%', height: 200, objectFit: 'cover' }}
							alt="value"
						/>
						<Paragraph style={{ fontWeight: 700, marginTop: 16 }}>
							{/* Connection */}
							Kết nối
						</Paragraph>
						<Paragraph style={{ fontSize: 15, textAlign: 'justify' }}>
							{/* Bridging communities through shared stories and collaboration. */}
							Gắn kết các cộng đồng thông qua những câu chuyện được chia sẻ và
							sự hợp tác.
						</Paragraph>
					</div>
				</div>
			</div>
			<div
				style={{
					width: '100%',
					maxWidth: 900,
					padding: '0 20px',
					textAlign: 'center',
				}}
			>
				<Title level={2} style={{ fontWeight: 700, marginBottom: 25 }}>
					{/* The Story Behind TRIbaLINGUAL */}
					Câu chuyện đằng sau TRIbaLINGUAL
				</Title>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 32,
						flexWrap: 'wrap',
						marginBottom: 32,
					}}
				>
					<div style={{ width: '100%', maxWidth: 450 }}>
						<img
							src="/realization.jpg"
							style={{
								width: '100%',
								borderRadius: 12,
								boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							}}
							alt="value"
						/>
					</div>

					<div style={{ width: 350, textAlign: 'left' }}>
						<Paragraph
							style={{ fontWeight: 700, marginBottom: 8, textAlign: 'justify' }}
						>
							{/* The project was born from a shared realization: */}
							Dự án được sinh ra từ một nhận thức chung:
						</Paragraph>
						<Paragraph
							style={{ fontSize: 16, lineHeight: 1.7, textAlign: 'justify' }}
						>
							{/* Many indigenous voices across Southeast Asia are disappearing in
							silence. */}
							Nhiều tiếng nói bản địa trên khắp Đông Nam Á đang dần biến mất
							trong lặng lẽ.
						</Paragraph>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 32,
						flexWrap: 'wrap',
					}}
				>
					<div style={{ width: 350, textAlign: 'left' }}>
						<Paragraph
							style={{ fontSize: 16, lineHeight: 1.7, textAlign: 'justify' }}
						>
							{/* In 2025, a group of students from Vietnam, Thailand, and Singapore
							founded TRIbaLINGUAL — a multilingual digital platform to preserve
							and reimagine Hmong stories and culture through creativity and
							technology. */}
							Vào năm 2025, một nhóm sinh viên đến từ Việt Nam, Thái Lan và
							Singapore đã thành lập TRIbaLINGUAL — một nền tảng số đa ngôn ngữ
							nhằm bảo tồn và tái hiện các câu chuyện cũng như văn hóa H’Mông
							thông qua sáng tạo và công nghệ.
						</Paragraph>
					</div>

					<div style={{ width: '100%', maxWidth: 450 }}>
						<img
							src="/group_image.jpg"
							style={{
								width: '100%',
								borderRadius: 12,
								boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							}}
							alt="value"
						/>
					</div>
				</div>
			</div>

			<Card
				style={{
					maxWidth: 900,
					width: '100%',
					borderRadius: 16,
					textAlign: 'center',
					boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
					color: 'white',
				}}
			>
				<Title level={2} style={{ fontWeight: 700, marginBottom: 20 }}>
					{/* Meet our team members */}
					Gặp gỡ các thành viên trong đội ngũ của chúng tôi
				</Title>
				<img src="/member_1.jpg" style={{ width: '100%' }} alt="value" />
				<img src="/member_2.png" style={{ width: '100%' }} alt="value" />
			</Card>
			<div
				style={{
					width: '100%',
					maxWidth: 900,
					padding: '0 20px',
					textAlign: 'center',
				}}
			>
				<Title level={2} style={{ fontWeight: 700, marginBottom: 20 }}>
					{/* Our work */}
					Công việc của chúng tôi
				</Title>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						gap: 24,
						flexWrap: 'wrap',
					}}
				>
					{/* ITEM 1 */}
					<div style={{ maxWidth: 260, textAlign: 'center' }}>
						<img
							src="/Preservation.jpg"
							style={{ width: '100%', height: 200, objectFit: 'cover' }}
							alt="value"
						/>
						<Paragraph style={{ fontWeight: 700, marginTop: 16 }}>
							{/* Trilingual Education */}
							Giáo dục tam ngữ
						</Paragraph>
						<Paragraph style={{ fontSize: 15, textAlign: 'justify' }}>
							{/* Developing H’Mong - Vietnamese - English learning materials. */}
							Phát triển tài liệu học tập với 3 ngôn ngữ: H’Mông – Việt – Anh.
						</Paragraph>
					</div>

					{/* ITEM 2 */}
					<div style={{ maxWidth: 260, textAlign: 'center' }}>
						<img
							src="/Cultural.jpg"
							style={{ width: '100%', height: 200, objectFit: 'cover' }}
							alt="value"
						/>
						<Paragraph style={{ fontWeight: 700, marginTop: 16 }}>
							{/* Cultural Archive */}
							Kho lưu trữ văn hóa
						</Paragraph>
						<Paragraph style={{ fontSize: 15, textAlign: 'justify' }}>
							{/* Collecting and digitizing H’Mong folktales and traditions. */}
							Thu thập và số hóa các câu chuyện dân gian và truyền thống của
							người H’Mông.
						</Paragraph>
					</div>

					{/* ITEM 3 */}
					<div style={{ maxWidth: 260, textAlign: 'center' }}>
						<img
							src="Community.jpg"
							style={{ width: '100%', height: 200, objectFit: 'cover' }}
							alt="value"
						/>
						<Paragraph style={{ fontWeight: 700, marginTop: 16 }}>
							{/* Community Collaboration */}Hợp tác cộng đồng
						</Paragraph>
						<Paragraph style={{ fontSize: 15, textAlign: 'justify' }}>
							{/* Engaging schools and local youth to keep the culture alive. */}
							Thu hút các trường học và giới trẻ địa phương để gìn giữ văn hóa.
						</Paragraph>
					</div>
				</div>
			</div>
		</Space>
	);
};

export default LandingPage;
