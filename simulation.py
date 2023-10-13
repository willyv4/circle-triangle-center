import math
import random

def simulate_probability(num_simulations):
    success_count = 0

    for i in range(num_simulations):
        angle_a = random.uniform(0, 2 * 3.14159)
        angle_b = random.uniform(0, 2 * 3.14159)

        angle_c = (angle_a + angle_b + 3.14159) % (2 * 3.14159)

        center_x = 0
        center_y = 0

        point_a = {
            "x": center_x + 90 * math.cos(angle_a),
            "y": center_y + 90 * math.sin(angle_a)
        }

        point_b = {
            "x": center_x + 90 * math.cos(angle_b),
            "y": center_y + 90 * math.sin(angle_b)
        }

        point_c = {
            "x": center_x + 90 * math.cos(angle_c),
            "y": center_y + 90 * math.sin(angle_c)
        }

        if is_point_inside_triangle(center_x, center_y, point_a["x"], point_a["y"], point_b["x"], point_b["y"], point_c["x"], point_c["y"]):
            success_count += 1

    return success_count

def is_point_inside_triangle(x, y, x1, y1, x2, y2, x3, y3):
    denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)

    if denominator != 0:
        a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator
        b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator
        c = 1 - a - b

        return a >= 0 and a <= 1 and b >= 0 and b <= 1 and c >= 0 and c <= 1

    # Handle the case when denominator is zero
    return False

if __name__ == "__main__":
    num_simulations = 1000000
    success_count = simulate_probability(num_simulations)
    probability = (success_count / num_simulations) * 100
    print(f"Probability that triangle ABC contains the center point D: {probability:.2f}%")
