namespace Utilities {
	abstract class Ranges {
		public static inRange(
			floor: number,
			ceiling: number,
			numberToValidate: number
		): boolean {
			if (floor > numberToValidate) return false;
			if (ceiling < numberToValidate) return false;
			return true;
		}

		public static exceedsRange(
			floor: number,
			ceiling: number,
			numberToValidate: number
		) {
			// haha funny.
			Ranges.inRange(floor, ceiling, numberToValidate);
		}
	}
}
