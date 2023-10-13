import React, { useState } from "react";

const Circle: React.FC = () => {
	// Initialize state variables for the number of simulations and success count
	const [numSimulations, setNumSimulations] = useState<number>(2000);
	const [successCount, setSuccessCount] = useState<number>(0);

	// Function to simulate the probability
	const simulateProbability = () => {
		// Initialize a variable to count the number of successful simulations
		let successCount: number = 0;

		// Loop through the specified number of simulations
		for (let i: number = 0; i < numSimulations; i++) {
			// Generate random angles A and B in radians
			const angleA: number = Math.random() * 2 * Math.PI;
			const angleB: number = Math.random() * 2 * Math.PI;

			// Calculate angle C as the opposite side of the circle from angles A and B
			const angleC: number = (angleA + angleB + Math.PI) % (2 * Math.PI);

			// Calculate the coordinates of the center point (D)
			const centerX: number = 0;
			const centerY: number = 0;

			// Calculate the coordinates of points A, B, and C on the circle
			const pointA: { x: number; y: number } = {
				x: centerX + 90 * Math.cos(angleA),
				y: centerY + 90 * Math.sin(angleA),
			};
			const pointB: { x: number; y: number } = {
				x: centerX + 90 * Math.cos(angleB),
				y: centerY + 90 * Math.sin(angleB),
			};
			const pointC: { x: number; y: number } = {
				x: centerX + 90 * Math.cos(angleC),
				y: centerY + 90 * Math.sin(angleC),
			};

			// Check if the center point D is inside the triangle ABC
			const isInsideTriangle: boolean = isPointInsideTriangle(
				centerX,
				centerY,
				pointA.x,
				pointA.y,
				pointB.x,
				pointB.y,
				pointC.x,
				pointC.y
			);

			// If D is inside the triangle, increment the success count
			if (isInsideTriangle) {
				successCount++;
			}
		}

		// Update the success count state variable
		setSuccessCount(successCount);
	};

	// Function to check if a point (x, y) is inside a triangle defined by three vertices (x1, y1, x2, y2, x3, y3)
	const isPointInsideTriangle = (
		x: number,
		y: number,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number
	): boolean => {
		// Calculate the denominator for the barycentric coordinates
		const denominator: number = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);

		// Calculate barycentric coordinates (a, b, and c)
		const a: number =
			((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
		const b: number =
			((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
		const c: number = 1 - a - b;

		// Check if the point is inside the triangle
		return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
	};

	return (
		<div>
			<p>
				Probability that triangle ABC contains the center point D:{" "}
				{((successCount / numSimulations) * 100).toFixed(2)}%
			</p>
			<p>
				Number of Simulations:{" "}
				<input
					type="number"
					value={numSimulations}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setNumSimulations(parseInt(event.target.value))
					}
				/>
			</p>
			<button onClick={simulateProbability}>Calculate Probability</button>
		</div>
	);
};

export default Circle;
