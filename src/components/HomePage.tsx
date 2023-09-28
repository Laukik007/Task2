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
	HeartOutlined,
	SortDescendingOutlined,
	InfoCircleOutlined,
	SearchOutlined,
	SortAscendingOutlined,
	CheckOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
	Col,
	Layout,
	Menu,
	Row,
	Typography,
	Dropdown,
	Tooltip,
	Input,
	Button,
} from "antd";
import PageSvg from "../assets/Page.svg";
import Icon from "@ant-design/icons";
import BookSvg from "../assets/Book.svg";
import OverviewCardsAndTable from "./OverviewCardsAndTable";
import PieSvg from "../assets/PieChart.svg";
import Downloadsvg from "../assets/DownloadData.svg";
import { allMockData } from "./mockCompanyData";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type CompanyData = {
	opportunityName: string;
	applied: {
		active: number;
		disqualified: number;
		previousQualified: number;
	};
	recommended: {
		active: number;
		disqualified: number;
		previousQualified: number;
	};
	interview: {
		active: number;
		disqualified: number;
		previousQualified: number;
	};
	offer: {
		active: number;
		disqualified: number;
		previousQualified: number;
	};
	hired: {
		active: number;
		disqualified: number;
		previousQualified: number;
	};
};

type Company = {
	id: number;
	companyName: string;
	companyData: CompanyData[];
};

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
const overviewCardData = [
	{
		stage: "Applied",
		qualified: 3122,
		disqualified: 1445,
		previousQualified: 2500,
	},
	{
		stage: "Offer",
		qualified: 183,
		disqualified: 260,
		previousQualified: 150,
	},
	{
		stage: "Hired",
		qualified: 118,
		disqualified: 65,
		previousQualified: 150,
	},
	{
		stage: "Recommended",
		qualified: 2164,
		disqualified: 958,
		previousQualified: 2000,
	},
	{
		stage: "Interview",
		qualified: 443,
		disqualified: 1721,
		previousQualified: 300,
	},
];

const PageIcon = () => <img src={PageSvg} alt="Page Icon" />;
const BookIcon = () => <img src={BookSvg} alt="Book Icon" />;
const PieIcon = () => <img src={PieSvg} alt="Pie Icon" />;
const DownloadIcon = () => <img src={Downloadsvg} alt="Download Icon" />;

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	// State for toggling the sidebar
	const [collapsed, setCollapsed] = useState(true);
	const [sortDirectionAsc, setSortDirectionAsc] = useState(true);
	const [tableData, setTableData] = useState<Array<Company>>(allMockData);
	const [sortKey, setSortKey] = useState("applied");
	const [searchQuery, setSearchQuery] = useState("");

	const handleSortByButtonClick = () => {
		setSortDirectionAsc((prev) => !prev);
	};

	const handleMenuClick: MenuProps["onClick"] = (e) => {
		switch (e.key) {
			case "1":
				setSortKey("applied");
				break;
			case "2":
				setSortKey("recommended");
				break;
			case "3":
				setSortKey("interview");
				break;
			case "4":
				setSortKey("offer");
				break;
			case "5":
				setSortKey("hired");
				break;
			case "6":
				setSortKey("rejected");
				break;
			default:
				setSortKey("applied");
				break;
		}
	};

	const sortByMenuItems: MenuProps["items"] = [
		{
			label: "Applied",
			key: "1",
			icon: sortKey == "applied" && <CheckOutlined />,
		},
		{
			label: "Recommended",
			key: "2",
			icon: sortKey == "recommended" && <CheckOutlined />,
		},
		{
			label: "Interview",
			key: "3",
			icon: sortKey == "interview" && <CheckOutlined />,
		},
		{
			label: "Offer",
			key: "4",
			icon: sortKey == "offer" && <CheckOutlined />,
		},
		{
			label: "Hired",
			key: "5",
			icon: sortKey == "hired" && <CheckOutlined />,
		},
		{
			label: "Rejected",
			key: "6",
			icon: sortKey == "rejected" && <CheckOutlined />,
		},
	];

	const menuProps = {
		items: sortByMenuItems,
		onClick: handleMenuClick,
	};
	console.log(tableData, sortKey);

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
			label: "Saved",
			key: "7",
			icon: <HeartOutlined />,
		},
		{
			label: collapsed ? "Expand" : "Collapse",
			key: "8",
			icon: collapsed ? <RightOutlined /> : <LeftOutlined />,
			onClick: () => setCollapsed((prev) => !prev),
		},
	];
	useEffect(() => {
		if (searchQuery == "") setTableData(allMockData);
		else {
			let temp = tableData.filter((obj) =>
				obj.companyName
					.toLocaleLowerCase()
					.includes(searchQuery.toLocaleLowerCase())
			);
			setTableData(temp);
		}
	}, [searchQuery]);

	useEffect(() => {
		// Define a custom sorting function
		const customSort = (a: Company, b: Company) => {
			// Calculate the total "active" and "disqualified" values for the specified categoryKey
			const sumA = a.companyData.reduce((total, entry) => {
				switch (sortKey) {
					case "applied":
						return (
							total +
							entry.applied.active +
							entry.applied.disqualified
						);

					case "recommended":
						return (
							total +
							entry.recommended.active +
							entry.recommended.disqualified
						);

					case "interview":
						return (
							total +
							entry.interview.active +
							entry.interview.disqualified
						);

					case "offer":
						return (
							total +
							entry.offer.active +
							entry.offer.disqualified
						);

					case "hired":
						return (
							total +
							entry.hired.active +
							entry.hired.disqualified
						);

					case "rejected":
						return (
							total +
							entry.applied.disqualified +
							entry.recommended.disqualified +
							entry.interview.disqualified +
							entry.offer.disqualified +
							entry.hired.disqualified
						);

					default:
						return (
							total +
							entry.applied.active +
							entry.applied.disqualified
						);
				}
			}, 0);
			const sumB = b.companyData.reduce((total, entry) => {
				switch (sortKey) {
					case "applied":
						return (
							total +
							entry.applied.active +
							entry.applied.disqualified
						);

					case "recommended":
						return (
							total +
							entry.recommended.active +
							entry.recommended.disqualified
						);

					case "interview":
						return (
							total +
							entry.interview.active +
							entry.interview.disqualified
						);

					case "offer":
						return (
							total +
							entry.offer.active +
							entry.offer.disqualified
						);

					case "hired":
						return (
							total +
							entry.hired.active +
							entry.hired.disqualified
						);

					case "rejected":
						return (
							total +
							entry.applied.disqualified +
							entry.recommended.disqualified +
							entry.interview.disqualified +
							entry.offer.disqualified +
							entry.hired.disqualified
						);

					default:
						return (
							total +
							entry.applied.active +
							entry.applied.disqualified
						);
				}
			}, 0);
			if (sortDirectionAsc) return sumA - sumB;
			else return sumB - sumA;
		};

		let tempData = [...tableData];
		tempData.sort(customSort);
		setTableData([...tempData]);
	}, [sortKey, sortDirectionAsc]);

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
			<Layout className="body-content">
				<div className="inner-body">
					<div className="top-header">
						<Typography.Title
							level={3}
							style={{ color: "#1D4ED8", marginTop: 0 }}
						>
							Opportunity Overview
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
					<OverviewCardsAndTable
						overviewCardData={overviewCardData}
					/>
				</div>
				<div className="detail-body-container">
					<Typography.Text
						style={{ fontWeight: "bold", fontSize: "1.1rem" }}
					>
						Detailed Opportunity Overview
					</Typography.Text>
					<Row style={{ padding: "1rem 0" }} align={"middle"}>
						<Col xs={16}>
							<Input
								style={{ width: "98%" }}
								placeholder="Search by employer name"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								prefix={
									<SearchOutlined className="site-form-item-icon" />
								}
								suffix={
									<Tooltip title="Extra information">
										<InfoCircleOutlined
											style={{ color: "rgba(0,0,0,.45)" }}
										/>
									</Tooltip>
								}
							/>
						</Col>
						<Col xs={4}>
							<div
								style={{
									width: "95%",
									borderRadius: "8px",
									border: " 1px solid #EBEBEB",
								}}
							>
								<Dropdown menu={menuProps}>
									<Button
										style={{
											border: 0,
											width: "80%",
											textAlign: "left",
										}}
									>
										Sort By
									</Button>
								</Dropdown>
								<Button
									style={{
										border: 0,
										borderLeft: "1px solid #EBEBEB",
										borderRadius: 0,
										width: "20%",
									}}
									onClick={handleSortByButtonClick}
									icon={
										sortDirectionAsc ? (
											<SortAscendingOutlined />
										) : (
											<SortDescendingOutlined />
										)
									}
								/>
							</div>
						</Col>
						<Col xs={4}>
							<button
								style={{
									backgroundColor: "white",
									color: "#0557E5",
									width: "100%",
									borderRadius: "8px",
									border: "1px solid #D8DFEB",
									boxShadow:
										"0px 4px 8px 0px rgba(0, 29, 111, 0.05)",
									// margin: "0rem 0.5rem ",
								}}
							>
								Export All As CSV
							</button>
						</Col>
					</Row>
					{tableData.length != 0 ? (
						tableData.map((companyObj, idx) => {
							let totalApplied: number = 0;
							let totalRecommended: number = 0;
							let totalInterview: number = 0;
							let totalOffer: number = 0;
							let totalHired: number = 0;
							let totalRejected: number = 0;
							companyObj.companyData.map((dataObj) => {
								totalApplied +=
									dataObj.applied.active +
									dataObj.applied.disqualified;

								totalHired +=
									dataObj.hired.active +
									dataObj.hired.disqualified;

								totalRecommended +=
									dataObj.recommended.active +
									dataObj.recommended.disqualified;

								totalInterview +=
									dataObj.interview.active +
									dataObj.interview.disqualified;

								totalOffer +=
									dataObj.offer.active +
									dataObj.offer.disqualified;

								totalRejected +=
									dataObj.applied.disqualified +
									dataObj.hired.disqualified +
									dataObj.recommended.disqualified +
									dataObj.interview.disqualified +
									dataObj.offer.disqualified;
							});

							return (
								<div
									key={idx}
									className="detail-view-container"
								>
									<div className="detail-view-header">
										<Typography.Text
											style={{
												fontWeight: "bold",
												fontSize: "1rem",
											}}
										>
											{companyObj.companyName}
										</Typography.Text>
										<div>
											<Icon
												onClick={() =>
													navigate(
														`/details/${companyObj.id}`
													)
												}
												className="icon-button"
												component={PieIcon}
											/>
											<Icon
												className="icon-button"
												component={DownloadIcon}
											/>
										</div>
									</div>
									<div className="detail-view-cards">
										{[
											"Applied",
											"Recommended",
											"Interview",
											"Offer",
											"Hired",
											"Total Rejected",
										].map((title, idx) => (
											<div
												key={idx}
												className="small-card-container"
											>
												<Typography.Text>
													{title}
												</Typography.Text>
												<Typography.Text
													style={{
														fontWeight: "bold",
													}}
												>
													{(() => {
														switch (title) {
															case "Applied":
																return totalApplied;
															case "Recommended":
																return totalRecommended;
															case "Interview":
																return totalInterview;
															case "Offer":
																return totalOffer;
															case "Hired":
																return totalHired;
															case "Total Rejected":
																return totalRejected;
															default:
																return (
																	<div>
																		error
																	</div>
																);
														}
													})()}
												</Typography.Text>
											</div>
										))}
									</div>
									<div className="detail-view-table-container">
										<table className="detail-view-table">
											<tr>
												<th>Opportunity Name</th>
												<th>Status</th>
												<th>Applied</th>
												<th>Recommended</th>
												<th>Interview</th>
												<th>Offer</th>
												<th>Hired</th>
											</tr>
											{companyObj.companyData.map(
												(internshipObj) => (
													<>
														<tr>
															<td rowSpan={3}>
																{
																	internshipObj.opportunityName
																}
															</td>
															<td>
																<div className="active-tag">
																	Active
																</div>
															</td>
															<td>
																{
																	internshipObj
																		.applied
																		.active
																}
															</td>
															<td>
																{
																	internshipObj
																		.recommended
																		.active
																}
															</td>
															<td>
																{
																	internshipObj
																		.interview
																		.active
																}
															</td>
															<td>
																{
																	internshipObj
																		.offer
																		.active
																}
															</td>
															<td>
																{
																	internshipObj
																		.hired
																		.active
																}
															</td>
														</tr>
														<tr>
															<td>
																<div className="disqualified-tag">
																	Disqualified
																</div>
															</td>
															<td>
																{
																	internshipObj
																		.applied
																		.disqualified
																}
															</td>
															<td>
																{
																	internshipObj
																		.recommended
																		.disqualified
																}
															</td>
															<td>
																{
																	internshipObj
																		.interview
																		.disqualified
																}
															</td>
															<td>
																{
																	internshipObj
																		.offer
																		.disqualified
																}
															</td>
															<td>
																{
																	internshipObj
																		.hired
																		.disqualified
																}
															</td>
														</tr>
														<tr>
															<td>
																<div>
																	Sub - Total
																</div>
															</td>
															<td>
																{internshipObj
																	.applied
																	.disqualified +
																	internshipObj
																		.applied
																		.active}
															</td>
															<td>
																{internshipObj
																	.recommended
																	.disqualified +
																	internshipObj
																		.recommended
																		.active}
															</td>
															<td>
																{internshipObj
																	.interview
																	.disqualified +
																	internshipObj
																		.interview
																		.active}
															</td>
															<td>
																{internshipObj
																	.offer
																	.disqualified +
																	internshipObj
																		.offer
																		.active}
															</td>
															<td>
																{internshipObj
																	.hired
																	.disqualified +
																	internshipObj
																		.hired
																		.active}
															</td>
														</tr>
													</>
												)
											)}
										</table>
									</div>
								</div>
							);
						})
					) : (
						<div
							style={{
								textAlign: "center",
								fontSize: "1rem",
								color: "black",
							}}
						>
							No data matching your filters
						</div>
					)}
				</div>
			</Layout>
		</Layout>
	);
};

export default HomePage;
