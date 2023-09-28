import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
	CalendarOutlined,
	TeamOutlined,
	HomeOutlined,
	UserOutlined,
	ShareAltOutlined,
	SettingOutlined,
	RightOutlined,
	LeftOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Typography } from "antd";
import PageSvg from "../assets/Page.svg";
import Icon from "@ant-design/icons";
import BookSvg from "../assets/Book.svg";
import OverviewCardsAndTable from "./OverviewCardsAndTable";
import { allMockData } from "./mockCompanyData";

const { Sider } = Layout;

// Define user menu items
const userMenuItems: MenuProps["items"] = [
	{
		label: "Settings",
		key: "1",
		icon: <SettingOutlined />,
	},
	{
		label: "Laukik Pandey",
		key: "2",
		icon: <UserOutlined />,
	},
];

// Define data for overview cards
interface OverviewCardDataItem {
	stage: string;
	qualified: number;
	disqualified: number;
	previousQualified: number;
}

interface DataInternship {
	name: string;
	data: OverviewCardDataItem[];
}

const PageIcon = () => <img src={PageSvg} alt="Page Icon" />;
const BookIcon = () => <img src={BookSvg} alt="Book Icon" />;

const DetailViewPage: React.FC = () => {
	// Extract 'id' from route parameters
	const { id } = useParams<{ id: string }>();

	// State for toggling the sidebar
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [data, setData] = useState<any[]>([]); // Replace 'any' with your data type
	const [overviewCardData, setOverviewCardData] = useState<DataInternship[]>(
		[]
	);

	// Define main menu items
	const menuItems: MenuProps["items"] = [
		{
			label: "Home",
			key: "1",
			icon: <HomeOutlined />,
		},
		{
			label: "Team",
			key: "2",
			icon: <TeamOutlined />,
		},
		{
			label: "Appointments",
			key: "3",
			icon: <CalendarOutlined />,
		},
		{
			label: "Share",
			key: "4",
			icon: <ShareAltOutlined />,
		},
		{
			label: "Resume",
			key: "5",
			icon: <Icon component={PageIcon} />,
		},
		{
			label: "Schedule",
			key: "6",
			icon: <Icon component={BookIcon} />,
		},
		{
			label: collapsed ? "Expand" : "Collapse",
			key: "8",
			icon: collapsed ? <RightOutlined /> : <LeftOutlined />,
			onClick: () => setCollapsed((prev) => !prev),
		},
	];

	useEffect(() => {
		// Fetch data based on 'id' from mock data
		let ourObj = allMockData.filter((obj) => obj.id === Number(id));
		if (ourObj.length !== 0) {
			let dataObj: DataInternship[] = [];
			let tempData = ourObj[0].companyData;
			tempData.forEach((obj) => {
				let temp: DataInternship = {
					name: obj.opportunityName,
					data: [
						{
							stage: "Applied",
							qualified: obj.applied.active,
							disqualified: obj.applied.disqualified,
							previousQualified: obj.applied.previousQualified,
						},
						{
							stage: "Offer",
							qualified: obj.offer.active,
							disqualified: obj.offer.disqualified,
							previousQualified: obj.offer.previousQualified,
						},
						{
							stage: "Hired",
							qualified: obj.hired.active,
							disqualified: obj.hired.disqualified,
							previousQualified: obj.hired.previousQualified,
						},
						{
							stage: "Recommended",
							qualified: obj.recommended.active,
							disqualified: obj.recommended.disqualified,
							previousQualified:
								obj.recommended.previousQualified,
						},
						{
							stage: "Interview",
							qualified: obj.interview.active,
							disqualified: obj.interview.disqualified,
							previousQualified: obj.interview.previousQualified,
						},
					],
				};
				dataObj.push(temp);
			});
			setData([...ourObj]);
			setOverviewCardData(dataObj);
		}
	}, []);

	useEffect(() => {
		// Scroll to the top of the page when data changes
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [data]);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				style={{
					backgroundColor: "white",
					overflow: "auto",
					height: "100vh",
					position: "sticky",
					top: 0,
					left: 0,
				}}
				collapsible
				trigger={null}
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="side-menu-bar">
					<div>
						<div>Logo</div>
						<br />
						<Menu
							selectedKeys={["5"]}
							mode="inline"
							items={menuItems}
						/>
					</div>
					<Menu
						mode="inline"
						items={userMenuItems}
						selectedKeys={["3"]}
					/>
				</div>
			</Sider>
			{data.length !== 0 ? (
				<Layout className="body-content">
					<div className="inner-body">
						<div className="top-header">
							<Typography.Title
								level={3}
								style={{ marginTop: 0 }}
							>
								Program Overview - {data[0].companyName}
							</Typography.Title>
							<div className="header-right">
								<Typography.Text
									style={{
										fontWeight: "bold",
										cursor: "pointer",
									}}
								>
									London Internship Program ˅
								</Typography.Text>
								<button>01 Jan 2023 - 31 Jul 2023 ˅</button>
							</div>
						</div>
						{overviewCardData.map((obj, key) => (
							<div key={key}>
								<Typography.Text
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										marginBottom: "0.25rem",
									}}
								>
									{obj.name}
								</Typography.Text>
								<OverviewCardsAndTable
									overviewCardData={obj.data}
								/>
							</div>
						))}
					</div>
				</Layout>
			) : (
				<div
					style={{
						display: "flex",
						minHeight: "90vh",
						minWidth: "90vw",
						justifyContent: "center",
						alignItems: "center",
						color: "black",
						fontSize: "1rem",
					}}
				>
					<h5>Loading ...</h5>
				</div>
			)}
		</Layout>
	);
};

export default DetailViewPage;
