import Box from 'engine/primitives/box';
import { IBoxJSON } from 'engine/primitives/box/types';
import Plane from 'engine/primitives/plane';
import { IPlaneJSON } from 'engine/primitives/plane/types';
import Sphere from 'engine/primitives/sphere';
import { ISphereJSON } from 'engine/primitives/sphere/types';

export type MeshTypeString = 'Plane' | 'Box' | 'Sphere';

export type MeshType = Plane | Box | Sphere;

export interface IMeshJSON {
	type: MeshTypeString;
}

export type IMeshTypesJSON = IBoxJSON | ISphereJSON | IPlaneJSON;
