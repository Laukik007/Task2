import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import { RandomChart } from "./RandomChart";
interface OverviewCardDataItem {
	stage: string;
	qualified: number;
	disqualified: number;
	previousQualified: number;
}

type OverviewCardData = OverviewCardDataItem[];

type Props = { overviewCardData: OverviewCardData };

function OverviewCardsAndTable({ overviewCardData }: Props) {
	let qualifiedPercentage = Math.round(
		(overviewCardData.reduce((accumulator, currentValue) => {
			if (currentValue.stage == "Applied")
				return accumulator + currentValue.qualified;

			return accumulator;
		}, 0) *
			100) /
			overviewCardData.reduce((accumulator, currentValue) => {
				if (currentValue.stage == "Applied")
					return (
						accumulator +
						currentValue.qualified +
						currentValue.disqualified
					);

				return accumulator;
			}, 0)
	);
	let disqualifiedPercent = Math.round(
		(overviewCardData.reduce((accumulator, currentValue) => {
			if (currentValue.stage == "Applied")
				return accumulator + currentValue.disqualified;

			return accumulator;
		}, 0) *
			100) /
			overviewCardData.reduce((accumulator, currentValue) => {
				if (currentValue.stage == "Applied")
					return (
						accumulator +
						currentValue.qualified +
						currentValue.disqualified
					);

				return accumulator;
			}, 0)
	);
	return (
		<Row className="dashboard">
			<Col md={16} xs={24} className="left-dashboard">
				<div className="top-cards-container">
					{overviewCardData.slice(0, 3).map((obj) => (
						<Space direction="vertical" className="top-card">
							<Typography.Text
								style={{
									fontWeight: "600",
									fontSize: "0.9rem",
								}}
							>
								{obj.stage}
							</Typography.Text>
							<Typography.Text
								style={{
									fontWeight: "600",
									fontSize: "1.5rem",
								}}
							>
								{obj.qualified.toLocaleString()}
							</Typography.Text>
							<Typography.Text
								style={{
									fontWeight: "500",
									fontSize: "0.8rem",
								}}
							>
								Previous Period
							</Typography.Text>
							<div
								style={{
									display: "flex",
									gap: "1rem",
								}}
							>
								<span>
									{obj.previousQualified.toLocaleString()}
								</span>
								<span
									className={
										obj.qualified > obj.previousQualified
											? "change-tag inc"
											: "change-tag dec"
									}
								>
									{obj.qualified > obj.previousQualified ? (
										<RiseOutlined />
									) : (
										<FallOutlined />
									)}
									{`${Math.round(
										(Math.abs(
											obj.qualified -
												obj.previousQualified
										) *
											100) /
											obj.qualified
									)}%`}
								</span>
							</div>
						</Space>
					))}
				</div>
				<div className="chart-box">
					<Typography.Text
						style={{ fontWeight: "bold", cursor: "pointer" }}
					>
						Recommended ˅
					</Typography.Text>
					<RandomChart />
				</div>
			</Col>
			<Col xs={24} md={8} className="right-dashboard">
				<Space
					direction="vertical"
					style={{
						width: "100%",
						backgroundColor: "white",
						padding: "1rem",
						borderRadius: "15px",
					}}
				>
					<Typography.Text
						style={{ fontWeight: "600", fontSize: "1.2rem" }}
					>
						Total Candidate Flow
					</Typography.Text>
					<Typography.Text
						style={{ fontWeight: "bold", fontSize: "1.8rem" }}
					>
						{overviewCardData
							.reduce((accumulator, currentValue) => {
								if (currentValue.stage == "Applied")
									return (
										accumulator +
										currentValue.qualified +
										currentValue.disqualified
									);

								return accumulator;
							}, 0)
							.toLocaleString()}
					</Typography.Text>
					<div className="progress-bar">
						<div
							className="qualified-bar"
							style={{
								flexBasis: `${qualifiedPercentage}%`,
							}}
						>
							<hr className="green-bar" />
							{`Qualified ${qualifiedPercentage} %`}
						</div>
						<div
							className="disqualified-bar"
							style={{
								flexBasis: `${disqualifiedPercent}%`,
								textAlign: "right",
							}}
						>
							<hr className="red-bar" />
							{`Disqualified ${disqualifiedPercent} %`}
						</div>
					</div>
					<table className="overview-table">
						<tr className="tablerow">
							<th>Stage</th>
							<th>
								<Typography.Text>Qualified</Typography.Text>
							</th>
							<th>
								<Typography.Text>Disqualified</Typography.Text>
							</th>
						</tr>
						{overviewCardData.map((obj) => (
							<tr className="tablerow">
								<td>{obj.stage}</td>
								<td>
									<Typography.Text>
										{obj.qualified.toLocaleString()}
									</Typography.Text>
								</td>
								<td>
									<Typography.Text>
										{obj.disqualified.toLocaleString()}
									</Typography.Text>
								</td>
							</tr>
						))}
					</table>
				</Space>
				<div className="top-cards-container">
					{overviewCardData.slice(3).map((obj) => (
						<Space
							direction="vertical"
							className="top-card"
							style={{ width: "48%" }}
						>
							<Typography.Text
								style={{
									fontWeight: "600",
									fontSize: "0.9rem",
								}}
							>
								{obj.stage}
							</Typography.Text>
							<Typography.Text
								style={{
									fontWeight: "600",
									fontSize: "1.5rem",
								}}
							>
								{obj.qualified.toLocaleString()}
							</Typography.Text>
							<Typography.Text
								style={{
									fontWeight: "500",
									fontSize: "0.8rem",
								}}
							>
								Previous Period
							</Typography.Text>
							<div
								style={{
									display: "flex",
									gap: "1rem",
								}}
							>
								<span>
									{obj.previousQualified.toLocaleString()}
								</span>
								<span
									className={
										obj.qualified > obj.previousQualified
											? "change-tag inc"
											: "change-tag dec"
									}
								>
									{obj.qualified > obj.previousQualified ? (
										<RiseOutlined />
									) : (
										<FallOutlined />
									)}
									{`${Math.round(
										(Math.abs(
											obj.qualified -
												obj.previousQualified
										) *
											100) /
											obj.qualified
									)}%`}
								</span>
							</div>
						</Space>
					))}
				</div>
			</Col>
		</Row>
	);
}

export default OverviewCardsAndTable;
