export default class CollisionDetector {
	constructor(hierarchy) {
		this.hierarchy = hierarchy;
	}

	checkCollision() {
		const gameObjectNodes = this.hierarchy.getGameObjectNodes();
		const rigidBodies = gameObjectNodes.filter(
			(node) => node.gameObject.rigidBody
		);

		const colliders = gameObjectNodes.filter(
			(node) => node.gameObject.collider
		);

		rigidBodies.forEach((rb) => {
			if (!rb.gameObject.rigidBody.isFalling) {
				return;
			}

			const toCheck = colliders.filter((col) => !rb.children.includes(col));

			rb.children.forEach((child) => {
				toCheck.forEach((tc) => {
					if (
						this.boxCollidersCollision(
							child.gameObject.collider,
							tc.gameObject.collider
						)
					) {
						rb.gameObject.rigidBody.onCollision();
						rb.gameObject.transform.translate([
							0,
							tc.gameObject.collider.max[1] - child.gameObject.collider.min[1],
							0,
						]);
					}
				});
			});
		});
	}

	boxCollidersCollision(a, b) {
		const aMin = a.min;
		const aMax = a.max;
		const bMin = b.min;
		const bMax = b.max;

		return (
			aMin[0] <= bMax[0] &&
			aMax[0] >= bMin[0] &&
			aMin[1] <= bMax[1] &&
			aMax[1] >= bMin[1] &&
			aMin[2] <= bMax[2] &&
			aMax[2] >= bMin[2]
		);
	}
}
