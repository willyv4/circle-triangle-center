import React, { useState } from "react";

const CircleVisual = () => {
	const [numSimulations, setNumSimulations] = useState(10);
	const [successCount, setSuccessCount] = useState(0);
	const [visualization, setVisualization] = useState([]) as any;

	const simulateProbability = () => {
		let successCount = 0;
		let visualization = [];

		for (let i = 0; i < numSimulations; i++) {
			const angleA = Math.random() * 2 * Math.PI;
			const angleB = Math.random() * 2 * Math.PI;
			const angleC = (angleA + angleB + Math.PI) % (2 * Math.PI);

			// Calculate the center point (D) coordinates
			const centerX = 100;
			const centerY = 100;

			// Calculate the coordinates of points A, B, and C
			const pointA = {
				x: centerX + 90 * Math.cos(angleA),
				y: centerY + 90 * Math.sin(angleA),
			};
			const pointB = {
				x: centerX + 90 * Math.cos(angleB),
				y: centerY + 90 * Math.sin(angleB),
			};
			const pointC = {
				x: centerX + 90 * Math.cos(angleC),
				y: centerY + 90 * Math.sin(angleC),
			};

			// Check if the center point D is inside the triangle ABC
			const isInsideTriangle = isPointInsideTriangle(
				centerX,
				centerY,
				pointA.x,
				pointA.y,
				pointB.x,
				pointB.y,
				pointC.x,
				pointC.y
			);

			if (isInsideTriangle) {
				successCount++;
			}

			visualization.push({ pointA, pointB, pointC, isInsideTriangle });
		}

		setSuccessCount(successCount);
		setVisualization(visualization);
	};

	const handleNumSimulationsChange = (event: any) => {
		setNumSimulations(event.target.value);
	};

	// Function to check if a point (x, y) is inside a triangle defined by three vertices (x1, y1, x2, y2, x3, y3)
	const isPointInsideTriangle = (
		x: any,
		y: any,
		x1: any,
		y1: any,
		x2: any,
		y2: any,
		x3: any,
		y3: any
	) => {
		const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
		const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
		const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
		const c = 1 - a - b;

		return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
	};

	return (
		<div
			style={{
				margin: "10px",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					border: "2px solid gray",
					maxWidth: "fit-content",
					padding: "10px",
				}}
			>
				<h1>Circle Simulation</h1>
				<p>
					Probability that triangle ABC contains the center point D:{" "}
					{((successCount / numSimulations) * 100).toFixed(2)}%
				</p>
				<p>
					Number of Simulations:{" "}
					<input
						type="number"
						value={numSimulations}
						onChange={handleNumSimulationsChange}
					/>
				</p>
				<button onClick={simulateProbability}>Simulate</button>
				<div>
					<svg width="200" height="200">
						<circle
							cx="100"
							cy="100"
							r="90"
							fill="none"
							stroke="black"
							strokeWidth="2"
						/>
						{visualization.map((item: any, index: any) => (
							<polygon
								key={index}
								points={`${item.pointA.x},${item.pointA.y} ${item.pointB.x},${item.pointB.y} ${item.pointC.x},${item.pointC.y}`}
								fill={
									item.isInsideTriangle ? "rgba(0, 0, 255, 0.2)" : "transparent"
								}
								stroke="blue"
							/>
						))}
						<circle cx="100" cy="100" r="2" fill="red" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default CircleVisual;
